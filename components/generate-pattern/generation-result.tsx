"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Pencil, ArrowRight, FileText } from "lucide-react"
import { GarmentViewer3D } from "./garment-viewer-3d"

type Phase = "generating-design" | "design-ready" | "generating-pattern" | "pattern-ready"

interface GenerationResultProps {
  garmentType: string
  description: string
  onRegenerate: () => void
  onEditPrompt: () => void
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border border-foreground/20 rounded-full" />
        <div className="absolute inset-0 border-t border-foreground rounded-full animate-spin" />
      </div>
    </div>
  )
}

export function GenerationResult({
  garmentType,
  description,
  onRegenerate,
  onEditPrompt,
}: GenerationResultProps) {
  const [phase, setPhase] = useState<Phase>("generating-design")

  useEffect(() => {
    if (phase === "generating-design") {
      const timer = setTimeout(() => setPhase("design-ready"), 3000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const handleThisIsIt = () => {
    setPhase("generating-pattern")
    setTimeout(() => setPhase("pattern-ready"), 3500)
  }

  const handleRegenerate = () => {
    setPhase("generating-design")
    onRegenerate()
  }

  if (phase === "generating-design") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        <LoadingSpinner />
        <p className="mt-8 font-sans text-2xl md:text-3xl italic text-foreground">
          AI.TELIER is crafting your design
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground tracking-[0.1em]">
          Analyzing your brief and generating garment visualization
        </p>
      </div>
    )
  }

  if (phase === "design-ready") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="w-full max-w-lg">
          {/* AI Generated 3D Garment */}
          <GarmentViewer3D garmentType={garmentType} />
          
          {/* Rotation hint */}
          <p className="mt-2 text-center font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            drag to rotate
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleRegenerate}
                className="flex-1 flex items-center justify-center gap-2 border border-foreground px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Regenerate</span>
              </button>
              <button
                onClick={onEditPrompt}
                className="flex-1 flex items-center justify-center gap-2 border border-foreground px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit Prompt</span>
              </button>
            </div>

            <button
              onClick={handleThisIsIt}
              className="w-full flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-mono text-sm tracking-[0.2em] uppercase py-4 hover:opacity-90 transition-opacity"
            >
              <span>This is it</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "generating-pattern") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        <LoadingSpinner />
        <p className="mt-8 font-sans text-2xl md:text-3xl italic text-foreground">
          Generating your professional pattern...
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground tracking-[0.1em]">
          Converting design into technical specifications
        </p>
      </div>
    )
  }

  // pattern-ready
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Pattern PDF Preview */}
        <div className="relative aspect-[3/4] bg-card border border-border overflow-hidden">
          <div className="absolute inset-0 p-8 flex flex-col">
            {/* Header */}
            <div className="border-b border-foreground/20 pb-4 mb-6">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                AI.TELIER Pattern Sheet
              </p>
              <h3 className="mt-2 font-sans text-lg text-foreground">
                Professional Pattern
              </h3>
            </div>

            {/* Pattern lines */}
            <div className="flex-1 relative">
              <svg viewBox="0 0 300 300" className="w-full h-full" aria-label="Pattern preview">
                {/* Grid */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 25}
                    x2="300"
                    y2={i * 25}
                    stroke="#8B1A1A"
                    strokeWidth="0.2"
                    opacity="0.2"
                  />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 25}
                    y1="0"
                    x2={i * 25}
                    y2="300"
                    stroke="#8B1A1A"
                    strokeWidth="0.2"
                    opacity="0.2"
                  />
                ))}
                {/* Pattern pieces */}
                <path
                  d="M 30 40 L 120 30 Q 140 35 145 80 L 150 200 Q 148 220 130 230 L 40 240 Q 25 235 25 220 L 20 60 Q 22 42 30 40 Z"
                  fill="none"
                  stroke="#8B1A1A"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <path
                  d="M 160 60 L 260 50 Q 275 55 278 90 L 280 180 Q 278 200 265 210 L 170 220 Q 155 215 155 200 L 155 80 Q 157 62 160 60 Z"
                  fill="none"
                  stroke="#8B1A1A"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                {/* Measurement indicators */}
                <line x1="30" y1="260" x2="145" y2="260" stroke="#8B1A1A" strokeWidth="0.5" opacity="0.5" markerEnd="url(#arrowhead)" />
                <line x1="160" y1="260" x2="278" y2="260" stroke="#8B1A1A" strokeWidth="0.5" opacity="0.5" />
                {/* Notch marks */}
                <circle cx="80" cy="35" r="2" fill="#8B1A1A" opacity="0.5" />
                <circle cx="210" cy="55" r="2" fill="#8B1A1A" opacity="0.5" />
                {/* Grain line */}
                <line x1="85" y1="60" x2="85" y2="220" stroke="#8B1A1A" strokeWidth="0.5" opacity="0.4" strokeDasharray="6 3" />
                <line x1="220" y1="75" x2="220" y2="200" stroke="#8B1A1A" strokeWidth="0.5" opacity="0.4" strokeDasharray="6 3" />
              </svg>
            </div>

            {/* Footer */}
            <div className="border-t border-foreground/20 pt-3 mt-4 flex justify-between">
              <p className="font-mono text-[9px] text-muted-foreground">
                Scale: 1:8
              </p>
              <p className="font-mono text-[9px] text-muted-foreground">
                All seam allowances included
              </p>
            </div>
          </div>
        </div>

        {/* Download */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-mono text-sm tracking-[0.2em] uppercase py-4 hover:opacity-90 transition-opacity">
            <FileText className="h-4 w-4" />
            <span>Download Pattern PDF</span>
          </button>
          <p className="text-center font-mono text-xs text-muted-foreground">
            Your pattern has been saved to your Studio
          </p>
        </div>
      </div>
    </div>
  )
}
