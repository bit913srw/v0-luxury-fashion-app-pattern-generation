"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Pencil, ArrowRight, FileText } from "lucide-react"

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
  const [activeView, setActiveView] = useState<"front" | "back" | "left" | "right">("front")

  return (
    <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto px-4">
      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* LEFT SIDE - Garment Image */}
        <div className="flex-1 lg:max-w-md">
          {/* Project Title */}
          <h2 className="font-sans text-xl md:text-2xl text-foreground mb-4">
            {projectTitle ? `${projectTitle} Pattern` : "Pattern"}
          </h2>

          {/* Garment Image with Paper Strip */}
          <div className="relative aspect-[3/4] bg-[#F5F3EF] border border-border overflow-hidden">
            <img
              src="/images/garment-mannequin.jpg"
              alt={`AI generated ${garmentType} design on cloth mannequin - ${activeView} view`}
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

          {/* View Buttons */}
          <div className="mt-4 flex gap-2">
            {(["front", "back", "left", "right"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`flex-1 py-2 font-mono text-[10px] tracking-[0.15em] uppercase border transition-colors ${
                  activeView === view
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : "bg-background text-foreground border-foreground hover:bg-foreground hover:text-primary-foreground"
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          {/* Download Button */}
          <button className="mt-4 w-full flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase py-3 hover:opacity-90 transition-opacity">
            <FileText className="h-4 w-4" />
            <span>Download Pattern PDF</span>
          </button>
        </div>

        {/* RIGHT SIDE - Fabrics & Notions */}
        <div className="flex-1">
          {/* Recommended Fabrics Section */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">
              Recommended Fabrics
            </h4>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground italic">
              Sourced from MOOD Fabrics
            </p>
            
            <div className="mt-4 flex flex-col gap-2">
              {[
                { name: "Italian Silk Charmeuse", type: "Silk", color: "#8B1A1A", yardage: "2.5 yards" },
                { name: "Japanese Crepe de Chine", type: "Silk Blend", color: "#6B1515", yardage: "2.75 yards" },
                { name: "French Wool Gabardine", type: "Wool", color: "#4A1010", yardage: "3 yards" },
                { name: "Belgian Linen Twill", type: "Linen", color: "#A52A2A", yardage: "2.5 yards" },
              ].map((fabric, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 border border-border">
                  <div 
                    className="w-6 h-6 border border-foreground/20 flex-shrink-0" 
                    style={{ backgroundColor: fabric.color }}
                    aria-label={`${fabric.name} color swatch`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-foreground truncate">
                      {fabric.name}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {fabric.type}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-foreground flex-shrink-0">
                    {fabric.yardage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Notions & Thread Section */}
          <div className="mt-6">
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">
              Notions & Thread
            </h4>
            
            <div className="mt-4 flex flex-col gap-2">
              {[
                { name: "Matching Polyester Thread", detail: "Deep Red #812", quantity: "2 spools" },
                { name: "Invisible Zipper", detail: "22 inch, Deep Red", quantity: "1 pc" },
                { name: "Silk Covered Buttons", detail: "15mm, Self-Cover", quantity: "6 pcs" },
                { name: "Lightweight Fusible Interfacing", detail: "Woven, White", quantity: "0.5 yards" },
              ].map((notion, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-foreground truncate">
                      {notion.name}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {notion.detail}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-foreground flex-shrink-0">
                    {notion.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add to MOOD Cart Button */}
          <a
            href="https://www.moodfabrics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase py-3 hover:opacity-90 transition-opacity"
          >
            Add All to MOOD Fabrics Cart
          </a>
          <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground italic">
            Redirecting to moodfabrics.com
          </p>
        </div>
      </div>

      {/* BOTTOM - Full Width Pattern Saved Confirmation */}
      <div className="mt-10 border-t border-foreground/20 pt-8 pb-8">
        <p className="text-center font-mono text-sm tracking-[0.2em] uppercase text-foreground">
          Your Pattern Has Been Saved
        </p>
        
        <div className="mt-6 flex justify-center gap-3 max-w-lg mx-auto">
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
