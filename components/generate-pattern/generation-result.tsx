"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Pencil, ArrowRight, FileText, Printer, Check } from "lucide-react"

const FABRICS = [
  { id: "f1", name: "Italian Silk Charmeuse", type: "Silk", color: "#8B1A1A", yardage: "2.5 yds" },
  { id: "f2", name: "Japanese Crepe de Chine", type: "Silk Blend", color: "#6B1515", yardage: "2.75 yds" },
  { id: "f3", name: "French Wool Gabardine", type: "Wool", color: "#4A1010", yardage: "3 yds" },
  { id: "f4", name: "Belgian Linen Twill", type: "Linen", color: "#A52A2A", yardage: "2.5 yds" },
]

const NOTIONS = [
  { id: "n1", name: "Matching Polyester Thread", detail: "Deep Red #812", quantity: "2 spools" },
  { id: "n2", name: "Invisible Zipper", detail: "22 inch, Deep Red", quantity: "1 pc" },
  { id: "n3", name: "Silk Covered Buttons", detail: "15mm, Self-Cover", quantity: "6 pcs" },
  { id: "n4", name: "Fusible Interfacing", detail: "Woven, White", quantity: "0.5 yds" },
]

type Phase = "generating-design" | "design-ready" | "generating-pattern" | "pattern-ready"

interface GenerationResultProps {
  projectTitle: string
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

function GarmentViewer({
  garmentType,
  onRegenerate,
  onEditPrompt,
  onThisIsIt,
}: {
  garmentType: string
  onRegenerate: () => void
  onEditPrompt: () => void
  onThisIsIt: () => void
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Garment Image */}
        <div className="relative aspect-[3/4] bg-[#F5F3EF] border border-border overflow-hidden">
          <img
            src="/images/garment-mannequin.jpg"
            alt={`AI generated ${garmentType} design on cloth mannequin`}
            className="w-full h-full object-cover"
          />
          
          {/* Paper Strip Overlay */}
          <div 
            className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ transform: 'translateY(-50%) rotate(-2deg)' }}
          >
            <div 
              className="px-6 py-3 bg-[#F5F2EB]/90 max-w-[90%]"
              style={{ 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground text-center leading-relaxed">
                Will Be 3D Rendered Design. User Will Be Able To Drag Toggle To Explore All Angles
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              onClick={onRegenerate}
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
            onClick={onThisIsIt}
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

export function GenerationResult({
  projectTitle,
  garmentType,
  description,
  onRegenerate,
  onEditPrompt,
}: GenerationResultProps) {
  const [phase, setPhase] = useState<Phase>("generating-design")
  const [selectedFabrics, setSelectedFabrics] = useState<Set<string>>(new Set(FABRICS.map(f => f.id)))
  const [selectedNotions, setSelectedNotions] = useState<Set<string>>(new Set(NOTIONS.map(n => n.id)))

  useEffect(() => {
    if (phase === "generating-design") {
      const timer = setTimeout(() => setPhase("design-ready"), 3000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const toggleFabric = (id: string) => {
    setSelectedFabrics(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleNotion = (id: string) => {
    setSelectedNotions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectAll = () => {
    setSelectedFabrics(new Set(FABRICS.map(f => f.id)))
    setSelectedNotions(new Set(NOTIONS.map(n => n.id)))
  }

  const deselectAll = () => {
    setSelectedFabrics(new Set())
    setSelectedNotions(new Set())
  }

  const totalSelected = selectedFabrics.size + selectedNotions.size

  const handlePrint = () => {
    window.print()
  }

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
      <GarmentViewer
        garmentType={garmentType}
        onRegenerate={handleRegenerate}
        onEditPrompt={onEditPrompt}
        onThisIsIt={handleThisIsIt}
      />
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
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto px-4">
      {/* Two Column Layout - Side by Side */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        {/* LEFT COLUMN - Pattern Preview (50%) */}
        <div className="w-full md:w-1/2">
          {/* Pattern PDF Preview */}
          <div className="relative aspect-[3/4] bg-card border border-border overflow-hidden">
            <div className="absolute inset-0 p-8 flex flex-col">
              {/* Header */}
              <div className="border-b border-foreground/20 pb-4 mb-6">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  AI.TELIER Pattern Sheet
                </p>
                <h3 className="mt-2 font-sans text-lg text-foreground">
                  {projectTitle ? `${projectTitle} Pattern` : "Pattern"}
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

          {/* Download & Print Buttons */}
          <div className="mt-4 flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-foreground text-primary-foreground font-mono text-xs tracking-[0.15em] uppercase py-3 hover:opacity-90 transition-opacity">
              <FileText className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 border border-foreground px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - Fabrics & Notions (50%, smaller font) */}
        <div className="w-full md:w-1/2">
          {/* Select All / Deselect All */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={selectAll}
              className="font-mono text-[9px] tracking-[0.1em] uppercase text-foreground hover:underline"
            >
              Select All
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={deselectAll}
              className="font-mono text-[9px] tracking-[0.1em] uppercase text-foreground hover:underline"
            >
              Deselect All
            </button>
          </div>

          {/* Recommended Fabrics Section */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground">
              Recommended Fabrics
            </h4>
            <p className="mt-1 font-mono text-[9px] text-muted-foreground italic">
              Sourced from MOOD Fabrics
            </p>
            
            <div className="mt-3 flex flex-col gap-2">
              {FABRICS.map((fabric) => {
                const isSelected = selectedFabrics.has(fabric.id)
                return (
                  <button
                    key={fabric.id}
                    onClick={() => toggleFabric(fabric.id)}
                    className={`flex items-center gap-2 p-2 border transition-colors text-left ${
                      isSelected 
                        ? "bg-foreground/5 border-foreground" 
                        : "bg-secondary/50 border-border hover:border-foreground/50"
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center ${
                        isSelected ? "border-foreground bg-foreground" : "border-foreground/30"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div 
                      className="w-6 h-6 border border-foreground/20 flex-shrink-0" 
                      style={{ backgroundColor: fabric.color }}
                      aria-label={`${fabric.name} color swatch`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] text-foreground truncate">
                        {fabric.name}
                      </p>
                      <p className="font-mono text-[9px] text-muted-foreground">
                        {fabric.type}
                      </p>
                    </div>
                    <p className="font-mono text-[9px] text-foreground flex-shrink-0">
                      {fabric.yardage}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Notions & Thread Section */}
          <div className="mt-6">
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground">
              Notions & Thread
            </h4>
            
            <div className="mt-3 flex flex-col gap-2">
              {NOTIONS.map((notion) => {
                const isSelected = selectedNotions.has(notion.id)
                return (
                  <button
                    key={notion.id}
                    onClick={() => toggleNotion(notion.id)}
                    className={`flex items-center gap-2 p-2 border transition-colors text-left ${
                      isSelected 
                        ? "bg-foreground/5 border-foreground" 
                        : "bg-secondary/50 border-border hover:border-foreground/50"
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center ${
                        isSelected ? "border-foreground bg-foreground" : "border-foreground/30"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] text-foreground truncate">
                        {notion.name}
                      </p>
                      <p className="font-mono text-[9px] text-muted-foreground">
                        {notion.detail}
                      </p>
                    </div>
                    <p className="font-mono text-[9px] text-foreground flex-shrink-0">
                      {notion.quantity}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Add to MOOD Cart Button */}
          <a
            href="https://www.moodfabrics.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 w-full flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase py-3 transition-opacity ${
              totalSelected > 0 
                ? "bg-foreground text-primary-foreground hover:opacity-90" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            onClick={(e) => totalSelected === 0 && e.preventDefault()}
          >
            {totalSelected > 0 
              ? `Add ${totalSelected} Item${totalSelected !== 1 ? 's' : ''} to MOOD Fabrics Cart`
              : "Select Items to Add to Cart"
            }
          </a>
          <p className="mt-1 text-center font-mono text-[9px] text-muted-foreground italic">
            Redirecting to moodfabrics.com
          </p>
        </div>
      </div>

      {/* BOTTOM - Pattern Saved Confirmation (full width) */}
      <div className="mt-10 border-t border-foreground/20 pt-8 pb-8">
        <p className="text-center font-mono text-sm tracking-[0.2em] uppercase text-foreground">
          Your Pattern Has Been Saved
        </p>
        
        <div className="mt-6 flex justify-center gap-3 max-w-md mx-auto">
          <button className="flex-1 flex items-center justify-center border border-foreground px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase text-foreground bg-background hover:bg-foreground hover:text-primary-foreground transition-colors">
            View in My Patterns
          </button>
          <button className="flex-1 flex items-center justify-center border border-foreground px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase text-foreground bg-background hover:bg-foreground hover:text-primary-foreground transition-colors">
            List on Marketplace
          </button>
        </div>
      </div>
    </div>
  )
}
