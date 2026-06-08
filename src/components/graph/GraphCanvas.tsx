"use client";
import React, { useRef, useEffect, useState, memo } from "react";

export interface GraphNode {
  id: string;
  slug: string;
  name: string;
  nameSanskrit: string;
  type: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight: number;
}

export interface Node extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export type Edge = GraphEdge;

interface GraphCanvasProps {
  data: { nodes: GraphNode[]; edges: GraphEdge[] };
  onSelectNode: (node: Node) => void;
}

const TYPE_COLORS: Record<string, { fill: string; stroke: string; glow: string }> = {
  DEITY: { fill: "#EF4444", stroke: "#F87171", glow: "rgba(239, 68, 68, 0.4)" }, // Red
  RISHI: { fill: "#8B5CF6", stroke: "#A78BFA", glow: "rgba(139, 92, 246, 0.4)" }, // Purple
  PLACE: { fill: "#10B981", stroke: "#34D399", glow: "rgba(16, 185, 129, 0.4)" }, // Green
  EVENT: { fill: "#3B82F6", stroke: "#60A5FA", glow: "rgba(59, 130, 246, 0.4)" }, // Blue
  BOOK: { fill: "#F59E0B", stroke: "#FBBF24", glow: "rgba(245, 158, 11, 0.4)" },  // Gold
  CONCEPT: { fill: "#EC4899", stroke: "#F472B6", glow: "rgba(236, 72, 153, 0.4)" } // Pink
};

const GraphCanvas = memo(({ data, onSelectNode }: GraphCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prevData, setPrevData] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] } | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const draggedNodeRef = useRef<Node | null>(null);

  // Synchronously initialize state when data changes (avoids react-hooks/set-state-in-effect)
  if (data !== prevData) {
    setPrevData(data);
    const width = 800;
    const height = 600;
    const initializedNodes: Node[] = (data.nodes || []).map((n) => {
      let radius = 24;
      if (n.type === "BOOK") radius = 32;
      else if (n.type === "DEITY") radius = 28;
      else if (n.type === "CONCEPT") radius = 20;

      return {
        ...n,
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 200,
        vx: 0,
        vy: 0,
        radius
      };
    });
    setNodes(initializedNodes);
    setEdges(data.edges || []);
  }

  useEffect(() => {
    if (nodes.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const runSimulation = () => {
      // 1. Force parameters
      const repulsionStrength = 300;
      const attractionStrength = 0.05;
      const centerGravity = 0.02;
      const damping = 0.85;
      const restLength = 130;

      // Repulsion force (Coulomb's Law)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          if (dist < 320) {
            const force = repulsionStrength / (dist * dist);
            const fx = force * (dx / dist);
            const fy = force * (dy / dist);

            nodeA.vx -= fx;
            nodeA.vy -= fy;
            nodeB.vx += fx;
            nodeB.vy += fy;
          }
        }
      }

      // Attraction force along edges (Hooke's Law)
      for (const edge of edges) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (sourceNode && targetNode) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - restLength) * attractionStrength;
          const fx = force * (dx / dist);
          const fy = force * (dy / dist);

          sourceNode.vx += fx;
          sourceNode.vy += fy;
          targetNode.vx -= fx;
          targetNode.vy -= fy;
        }
      }

      // Gravity towards center & Position updates
      for (const node of nodes) {
        if (node === draggedNodeRef.current) continue;

        // Apply center gravity
        const dx = cx - node.x;
        const dy = cy - node.y;
        node.vx += dx * centerGravity;
        node.vy += dy * centerGravity;

        // Apply friction/damping
        node.vx *= damping;
        node.vy *= damping;

        // Update positions
        node.x += node.vx;
        node.y += node.vy;

        // Boundaries containment
        const padding = node.radius + 15;
        node.x = Math.max(padding, Math.min(width - padding, node.x));
        node.y = Math.max(padding, Math.min(height - padding, node.y));
      }

      // 2. Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 3. Draw Edges
      for (const edge of edges) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (sourceNode && targetNode) {
          const isHighlighted = hoveredNode && (hoveredNode.id === sourceNode.id || hoveredNode.id === targetNode.id);
          
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = isHighlighted ? "rgba(255, 215, 0, 0.6)" : "rgba(184, 134, 11, 0.15)";
          ctx.lineWidth = isHighlighted ? 2.5 : 1.5;
          ctx.stroke();

          // Render edge type labels if hovered
          if (isHighlighted) {
            const mx = (sourceNode.x + targetNode.x) / 2;
            const my = (sourceNode.y + targetNode.y) / 2;
            ctx.fillStyle = "#FFD700";
            ctx.font = "bold 9px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(edge.type, mx, my);
          }
        }
      }

      // 4. Draw Nodes
      for (const node of nodes) {
        const colors = TYPE_COLORS[node.type] || TYPE_COLORS.CONCEPT;
        const isHovered = hoveredNode && hoveredNode.id === node.id;

        // Shadow / Outer Glow
        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = isHovered ? 25 : 12;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0F0F14";
        ctx.fill();
        ctx.strokeStyle = isHovered ? "#FFD700" : colors.stroke;
        ctx.lineWidth = isHovered ? 3.5 : 2;
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;

        // Center Sanskrit / core text symbol inside node
        ctx.fillStyle = colors.stroke;
        ctx.font = "14px Devnagari, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.nameSanskrit.substring(0, 1), node.x, node.y - 1);

        // Under-node labels (English name)
        ctx.fillStyle = isHovered ? "#FFD700" : "#F5F0E8";
        ctx.font = isHovered ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(node.name, node.x, node.y + node.radius + 6);
      }

      animationId = requestAnimationFrame(runSimulation);
    };

    animationId = requestAnimationFrame(runSimulation);
    return () => cancelAnimationFrame(animationId);
  }, [nodes, edges, hoveredNode]);

  // Mouse Interactivity
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Check if clicked a node
    const clickedNode = nodes.find((n) => {
      const dist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
      return dist <= n.radius;
    });

    if (clickedNode) {
      draggedNodeRef.current = clickedNode;
      onSelectNode(clickedNode);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Dragging
    if (draggedNodeRef.current) {
      draggedNodeRef.current.x = mx;
      draggedNodeRef.current.y = my;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
      return;
    }

    // Hover detection
    const hoverNode = nodes.find((n) => {
      const dist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
      return dist <= n.radius;
    });

    if (hoverNode) {
      canvas.style.cursor = "pointer";
      setHoveredNode(hoverNode);
    } else {
      canvas.style.cursor = "default";
      setHoveredNode(null);
    }
  };

  const handleMouseUpOrLeave = () => {
    draggedNodeRef.current = null;
  };

  return (
    <div className="relative border border-[#B8860B30] bg-[#050508]/80 backdrop-blur-md rounded-2xl overflow-hidden w-full h-[600px] flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="w-full h-full max-w-[800px] max-h-[600px]"
      />
    </div>
  );
});

GraphCanvas.displayName = "GraphCanvas";
export default GraphCanvas;
