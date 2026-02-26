"use client"

import { ArrowLeft } from "lucide-react"

interface StepHeaderProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
}

export function StepHeader({ currentStep, totalSteps, onBack }: StepHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase text-foreground hover:opacity-70 transition-opacity"
        aria-label="Back to Studio"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Studio</span>
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <h1 className="font-sans text-2xl md:text-3xl tracking-wide text-foreground">
          Generate Pattern
        </h1>
        <div className="mt-2 mx-auto w-16 h-px bg-foreground" />
      </div>

      <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </span>
    </header>
  )
}
