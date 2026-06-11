"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import GraphCanvas, { GraphNode, GraphEdge, Node } from "@/components/graph/GraphCanvas";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function GraphPage() {
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);
  const [focusedSlug, setFocusedSlug] = useState("");
  const { playClick } = useSacredSound();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  const currentLang = mounted ? language : "EN";

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true);
      try {
        const url = focusedSlug ? `/api/graph?node=${focusedSlug}` : "/api/graph";
        const res = await fetch(url);
        const data = await res.json();
        if (data.nodes) {
          setGraphData(data);
          // Auto-select starting node if focused
          if (focusedSlug) {
            const match = data.nodes.find((n: GraphNode) => n.slug === focusedSlug);
            if (match) {
              // Convert GraphNode to Node (with x, y, vx, vy, radius defaults or placeholders)
              const nodeWithPhysics: Node = {
                ...match,
                x: 400,
                y: 300,
                vx: 0,
                vy: 0,
                radius: match.type === "BOOK" ? 32 : match.type === "DEITY" ? 28 : match.type === "CONCEPT" ? 20 : 24
              };
              setSelectedNode(nodeWithPhysics);
            }
          } else if (data.nodes.length > 0) {
            // Select first node as default
            const first = data.nodes[0];
            const nodeWithPhysics: Node = {
              ...first,
              x: 400,
              y: 300,
              vx: 0,
              vy: 0,
              radius: first.type === "BOOK" ? 32 : first.type === "DEITY" ? 28 : first.type === "CONCEPT" ? 20 : 24
            };
            setSelectedNode(nodeWithPhysics);
          }
        }
      } catch (err) {
        console.error("Failed to load knowledge graph:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGraph();
  }, [focusedSlug]);

  const handleSelectNode = (node: Node) => {
    setSelectedNode(node);
    playClick();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030205] text-[#F5F0E8] overflow-x-hidden">
      
      {/* Header Panel */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#B8860B20] z-10">
        <Link
          href="/"
          onClick={() => playClick()}
          className="flex items-center gap-2 text-phi-sm text-[#9CA3AF] hover:text-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLang === "HI" ? "मुख्य पृष्ठ" : currentLang === "SA" ? "गृहम्" : "Back to Home"}</span>
        </Link>
        <div className="flex items-center gap-2 text-[#FFD700] text-phi-xs uppercase tracking-widest font-semibold bg-[#B8860B15] px-phi-md py-phi-xs rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Knowledge Graph</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 z-10">
        
        {/* Intro */}
        <div className="text-left max-w-2xl flex flex-col gap-2">
          <h1 className="text-phi-xl md:text-phi-2xl font-serif font-bold text-white leading-tight">
            {currentLang === "HI" ? "सनातन ज्ञान चक्र" : currentLang === "SA" ? "सनातनज्ञानचक्रम्" : "Cosmic Knowledge Graph"}
          </h1>
          <p className="text-phi-sm text-[#9CA3AF] leading-relaxed">
            {currentLang === "HI" 
              ? "ऋषियों, शास्त्रों, देवताओं, पवित्र स्थलों और मूलभूत अवधारणाओं के बीच शाश्वत अंतर्संबंधों का अन्वेषण करें।"
              : "Traverse the interconnected dimensions of seers, sacred places, concepts, scriptures, and deities of Sanatan Dharma."}
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-col lg:flex-row gap-8 w-full min-h-[600px]">
          
          {/* Left Canvas */}
          <div className="flex-grow lg:w-2/3 w-full flex flex-col gap-4">
            {loading ? (
              <div className="border border-[#B8860B20] bg-[#0F0F14]/40 backdrop-blur-md rounded-2xl w-full h-[600px] flex items-center justify-center">
                <span className="text-[#FFD700] font-sanskrit text-phi-xl animate-pulse">ॐ</span>
              </div>
            ) : (
              <GraphCanvas data={graphData} onSelectNode={handleSelectNode} />
            )}
            <div className="text-phi-xs text-[#9CA3AF] italic text-center md:text-left">
              * Click and drag nodes to interact. Select a node to inspect relationships and detail telemetry.
            </div>
          </div>

          {/* Right Inspector Sidebar */}
          <div className="lg:w-1/3 w-full flex flex-col gap-6">
            {selectedNode ? (
              <div className="bg-[#0F0F14]/80 border border-[#B8860B25] rounded-2xl p-phi-lg flex flex-col gap-6 shadow-xl backdrop-blur-md hover:border-[#B8860B45] transition-all duration-500">
                
                {/* Node Title & Type Badge */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-phi-lg font-serif font-bold text-white">
                      {selectedNode.name}
                    </h2>
                    <span className="text-phi-sm text-[#FFD700] font-serif">
                      {selectedNode.nameSanskrit}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-[#B8860B20] text-[#FFD700] border border-[#B8860B30] px-2.5 py-0.5 rounded-full">
                    {selectedNode.type}
                  </span>
                </div>

                <div className="h-px bg-[#B8860B15]" />

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-mono font-medium">
                    About / Description
                  </span>
                  <p className="text-phi-sm text-[#F5F0E8] leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Relational Metadata */}
                {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-mono font-medium">
                      Divine Attributes
                    </span>
                    <div className="grid grid-cols-1 gap-2 bg-white/5 border border-white/5 rounded-xl p-3">
                      {Object.entries(selectedNode.metadata).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-start text-phi-xs gap-2">
                          <span className="text-[#9CA3AF] capitalize font-medium">{key}:</span>
                          <span className="text-white text-right font-mono">
                            {Array.isArray(val) ? val.join(", ") : String(val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-2">
                  <button 
                    onClick={() => {
                      setFocusedSlug(selectedNode.slug);
                      playClick();
                    }}
                    className="w-full py-phi-md rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4A017] text-black font-semibold text-phi-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(184,134,11,0.2)] hover:shadow-[0_4px_25px_rgba(184,134,11,0.4)] transition-all duration-300"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Focus on Connection</span>
                  </button>
                  {focusedSlug && (
                    <button 
                      onClick={() => {
                        setFocusedSlug("");
                        playClick();
                      }}
                      className="w-full py-phi-md rounded-xl border border-white/10 hover:bg-white/5 text-[#F5F0E8] font-semibold text-phi-xs uppercase tracking-wider transition-colors duration-300"
                    >
                      Reset Overview
                    </button>
                  )}
                </div>

              </div>
            ) : (
              <div className="border border-dashed border-[#B8860B20] bg-transparent rounded-2xl p-phi-lg flex items-center justify-center text-center h-[300px]">
                <p className="text-phi-sm text-[#9CA3AF]">
                  Select a node from the canvas to view detailed attributes and cosmic mapping.
                </p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
