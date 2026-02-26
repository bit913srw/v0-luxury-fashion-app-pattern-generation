"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"

interface StepNavProps {
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  showBack?: boolean
  variant?: "outline" | "filled"
}

export function StepNav({
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
  showBack = true,
  variant = "outline",
}: StepNavProps) {
  return (
    <div className="flex items-center justify-between pt-12">
      {showBack && onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      ) : (
        <div />
      )}

      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            variant === "filled"
              ? "bg-foreground text-primary-foreground hover:opacity-90"
              : "border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground"
          }`}
        >
          <span>{nextLabel}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
