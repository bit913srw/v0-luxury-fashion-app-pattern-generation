"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"

interface ReviewData {
  projectTitle: string
  garmentType: string
  customGarment: string
  description: string
  measurementMode: "saved" | "custom" | null
  selectedProfile: string
}

const SAVED_PROFILES: Record<string, string> = {
  p1: "Primary Fit",
  p2: "Relaxed Fit",
  p3: "Client — Emma R.",
}

interface StepReviewProps {
  data: ReviewData
  onBack: () => void
  onGenerate: () => void
}

export function StepReview({ data, onBack, onGenerate }: StepReviewProps) {
  const garmentDisplay = data.garmentType === "Other" ? data.customGarment : data.garmentType
  const measurementDisplay =
    data.measurementMode === "saved"
      ? SAVED_PROFILES[data.selectedProfile] || "—"
      : "One-time measurements"

  const items = [
    { label: "Project Title", value: data.projectTitle },
    { label: "Garment Type", value: garmentDisplay },
    { label: "Design Description", value: data.description, multiline: true },
    { label: "Measurements", value: measurementDisplay },
  ]

  return (
    <div className="flex flex-col flex-1 justify-center">
      <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight text-balance">
        Review your pattern brief
      </h2>

      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <div key={item.label} className="border-b border-input pb-4">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {item.label}
            </span>
            <p
              className={`mt-2 font-mono text-sm text-foreground leading-relaxed ${
                item.multiline ? "line-clamp-3" : ""
              }`}
            >
              {item.value || "—"}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-12 flex flex-col gap-4">
        <button
          onClick={onGenerate}
          className="w-full flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-mono text-sm tracking-[0.2em] uppercase py-4 hover:opacity-90 transition-opacity"
        >
          <span>Generate Pattern</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      </div>
    </div>
  )
}
