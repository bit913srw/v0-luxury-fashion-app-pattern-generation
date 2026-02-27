"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Pencil, ArrowRight, FileText, ChevronLeft, ChevronRight } from "lucide-react"

const GARMENT_VIEWS = [
  { id: "front", label: "FRONT VIEW" },
  { id: "back", label: "BACK VIEW" },
  { id: "left", label: "LEFT SIDE" },
  { id: "right", label: "RIGHT SIDE" },
] as const

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

function GarmentCarousel({
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
  const [viewIndex, setViewIndex] = useState(0)

  const goToPrev = () => {
    setViewIndex((prev) => (prev === 0 ? GARMENT_VIEWS.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setViewIndex((prev) => (prev === GARMENT_VIEWS.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const currentView = GARMENT_VIEWS[viewIndex]

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Garment Image Carousel */}
        <div className="relative aspect-[3/4] bg-[#F5F3EF] border border-border overflow-hidden">
          {/* Garment Mockup */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg 
              viewBox="0 0 200 280" 
              className="w-full h-full max-w-[200px]" 
              aria-label={`${garmentType} ${currentView.label}`}
            >
              {/* Mannequin/Dress Form */}
              <defs>
                <linearGradient id="mannequinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4CFC7" />
                  <stop offset="50%" stopColor="#E8E4DD" />
                  <stop offset="100%" stopColor="#D4CFC7" />
                </linearGradient>
                <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B1A1A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6B1515" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              
              {/* Mannequin Stand */}
              <ellipse cx="100" cy="270" rx="30" ry="6" fill="#D4CFC7" />
              <rect x="96" y="240" width="8" height="30" fill="url(#mannequinGrad)" />
              
              {/* Mannequin Body */}
              <ellipse cx="100" cy="30" rx="15" ry="12" fill="url(#mannequinGrad)" />
              <path
                d="M 70 45 Q 65 80 68 120 L 72 180 Q 75 200 85 210 L 100 215 L 115 210 Q 125 200 128 180 L 132 120 Q 135 80 130 45 Q 115 38 100 38 Q 85 38 70 45 Z"
                fill="url(#mannequinGrad)"
              />
              
              {/* Dress/Garment - changes based on view */}
              {currentView.id === "front" && (
                <>
                  <path
                    d="M 65 50 Q 55 60 50 85 L 48 100 Q 52 105 65 108 L 68 120 L 70 180 Q 72 220 80 240 L 100 245 L 120 240 Q 128 220 130 180 L 132 120 L 135 108 Q 148 105 152 100 L 150 85 Q 145 60 135 50 Q 118 42 100 42 Q 82 42 65 50 Z"
                    fill="url(#fabricGrad)"
                  />
                  {/* Neckline */}
                  <path
                    d="M 80 50 Q 100 58 120 50"
                    fill="none"
                    stroke="#6B1515"
                    strokeWidth="1"
                  />
                  {/* Center seam */}
                  <line x1="100" y1="58" x2="100" y2="240" stroke="#6B1515" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
                  {/* Waist seam */}
                  <path d="M 70 130 Q 100 140 130 130" fill="none" stroke="#6B1515" strokeWidth="0.8" opacity="0.6" />
                </>
              )}
              
              {currentView.id === "back" && (
                <>
                  <path
                    d="M 65 50 Q 55 60 50 85 L 48 100 Q 52 105 65 108 L 68 120 L 70 180 Q 72 220 80 240 L 100 245 L 120 240 Q 128 220 130 180 L 132 120 L 135 108 Q 148 105 152 100 L 150 85 Q 145 60 135 50 Q 118 42 100 42 Q 82 42 65 50 Z"
                    fill="url(#fabricGrad)"
                  />
                  {/* Back opening/zipper */}
                  <line x1="100" y1="50" x2="100" y2="180" stroke="#6B1515" strokeWidth="1.5" />
                  {/* Zipper teeth */}
                  {Array.from({ length: 13 }).map((_, i) => (
                    <line key={i} x1="97" y1={55 + i * 10} x2="103" y2={55 + i * 10} stroke="#6B1515" strokeWidth="0.5" />
                  ))}
                  {/* Back darts */}
                  <line x1="85" y1="80" x2="88" y2="130" stroke="#6B1515" strokeWidth="0.5" opacity="0.6" />
                  <line x1="115" y1="80" x2="112" y2="130" stroke="#6B1515" strokeWidth="0.5" opacity="0.6" />
                </>
              )}
              
              {currentView.id === "left" && (
                <>
                  <path
                    d="M 85 50 Q 70 60 65 85 L 62 100 Q 65 105 72 108 L 75 120 L 78 180 Q 82 220 90 240 L 110 245 L 115 240 Q 118 220 120 180 L 122 120 L 125 108 Q 130 105 132 100 L 130 85 Q 125 60 115 50 Q 100 42 85 50 Z"
                    fill="url(#fabricGrad)"
                  />
                  {/* Side seam */}
                  <path d="M 115 50 Q 120 130 115 240" fill="none" stroke="#6B1515" strokeWidth="0.8" opacity="0.7" />
                  {/* Sleeve indication */}
                  <ellipse cx="68" cy="80" rx="12" ry="20" fill="url(#fabricGrad)" opacity="0.9" />
                </>
              )}
              
              {currentView.id === "right" && (
                <>
                  <path
                    d="M 85 50 Q 75 60 68 85 L 65 100 Q 68 105 75 108 L 78 120 L 80 180 Q 82 220 90 240 L 110 245 Q 118 220 122 180 L 125 120 L 128 108 Q 135 105 138 100 L 135 85 Q 130 60 115 50 Q 100 42 85 50 Z"
                    fill="url(#fabricGrad)"
                  />
                  {/* Side seam */}
                  <path d="M 85 50 Q 80 130 85 240" fill="none" stroke="#6B1515" strokeWidth="0.8" opacity="0.7" />
                  {/* Sleeve indication */}
                  <ellipse cx="132" cy="80" rx="12" ry="20" fill="url(#fabricGrad)" opacity="0.9" />
                </>
              )}
            </svg>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
            aria-label="Previous view"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
            aria-label="Next view"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* View Label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground bg-background/90 px-3 py-1 border border-foreground">
              {currentView.label}
            </p>
          </div>
        </div>
        
        {/* Navigation hint */}
        <p className="mt-2 text-center font-mono text-[10px] tracking-[0.1em] text-muted-foreground italic">
          {"<"} {">"} to change view
        </p>

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
      <GarmentCarousel
        garmentType={garmentType}
        onRegenerate={handleRegenerate}
        onEditPrompt={onEditPrompt}
        onThisIsIt={handleThisIsIt}
      />
    )
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
