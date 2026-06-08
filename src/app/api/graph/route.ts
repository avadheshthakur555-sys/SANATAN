import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nodeSlug = searchParams.get("node") || "";
  const depthStr = searchParams.get("depth") || "2";
  const depth = parseInt(depthStr) || 2;

  try {
    if (!nodeSlug) {
      // Return the entire graph for overview
      const nodes = await prisma.graphNode.findMany();
      const edges = await prisma.graphEdge.findMany();
      
      const formattedNodes = nodes.map(n => ({
        id: n.id,
        slug: n.slug,
        name: n.name,
        nameSanskrit: n.nameSanskrit,
        type: n.type,
        description: n.description,
        metadata: JSON.parse(n.metadata || "{}")
      }));

      const formattedEdges = edges.map(e => ({
        id: e.id,
        source: e.sourceId,
        target: e.targetId,
        type: e.relationType,
        weight: e.weight
      }));

      return NextResponse.json({ nodes: formattedNodes, edges: formattedEdges });
    }

    // Traversal starting from a specific node
    const startNode = await prisma.graphNode.findUnique({
      where: { slug: nodeSlug }
    });

    if (!startNode) {
      return NextResponse.json({ error: "Start node not found" }, { status: 404 });
    }

    // Graph BFS/DFS collection up to 'depth'
    const visitedNodeIds = new Set<string>([startNode.id]);
    const edgesToReturn = new Set<string>();

    let currentLayer = [startNode.id];

    for (let d = 0; d < depth; d++) {
      if (currentLayer.length === 0) break;
      
      // Find all edges connected to nodes in currentLayer
      const connections = await prisma.graphEdge.findMany({
        where: {
          OR: [
            { sourceId: { in: currentLayer } },
            { targetId: { in: currentLayer } }
          ]
        }
      });

      const nextLayer: string[] = [];

      for (const edge of connections) {
        edgesToReturn.add(JSON.stringify(edge));
        
        if (!visitedNodeIds.has(edge.sourceId)) {
          visitedNodeIds.add(edge.sourceId);
          nextLayer.push(edge.sourceId);
        }
        if (!visitedNodeIds.has(edge.targetId)) {
          visitedNodeIds.add(edge.targetId);
          nextLayer.push(edge.targetId);
        }
      }

      currentLayer = nextLayer;
    }

    // Resolve node objects
    const resolvedNodes = await prisma.graphNode.findMany({
      where: { id: { in: Array.from(visitedNodeIds) } }
    });

    const formattedNodes = resolvedNodes.map(n => ({
      id: n.id,
      slug: n.slug,
      name: n.name,
      nameSanskrit: n.nameSanskrit,
      type: n.type,
      description: n.description,
      metadata: JSON.parse(n.metadata || "{}")
    }));

    const formattedEdges = Array.from(edgesToReturn).map(eStr => {
      const edge = JSON.parse(eStr);
      return {
        id: edge.id,
        source: edge.sourceId,
        target: edge.targetId,
        type: edge.relationType,
        weight: edge.weight
      };
    });

    return NextResponse.json({
      nodes: formattedNodes,
      edges: formattedEdges
    });
  } catch (e) {
    console.error("Failed to query Knowledge Graph API:", e);
    return NextResponse.json({ error: "Failed to query graph database" }, { status: 500 });
  }
}
