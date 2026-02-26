"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { StepNav } from "./step-nav"

const GARMENT_TYPES = [
  "T-Shirt",
  "Tank",
  "Jean",
  "Trouser",
  "Dress",
  "Jacket",
  "Shawl",
  "Other",
]

interface StepGarmentTypeProps {
  value: string
  customValue: string
  onChange: (value: string) => void
  onCustomChange: (value: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepGarmentType({
  value,
  customValue,
  onChange,
  onCustomChange,
  onBack,
  onNext,
}: StepGarmentTypeProps) {
  const [open, setOpen] = useState(false)

  const isValid = value && (value !== "Other" || customValue.trim())

  return (
    <div className="flex flex-col flex-1 justify-center">
      <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight text-balance">
        What type of garment?
      </h2>

      <div className="mt-10 relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between border-b border-input pb-3 font-mono text-base text-foreground focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value || "Select garment type..."}
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-10 top-full left-0 right-0 mt-1 bg-card border border-border py-1 max-h-64 overflow-auto"
          >
            {GARMENT_TYPES.map((type) => (
              <li key={type}>
                <button
                  role="option"
                  aria-selected={value === type}
                  onClick={() => {
                    onChange(type)
                    setOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 font-mono text-sm transition-colors ${
                    value === type
                      ? "bg-foreground text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {value === "Other" && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Describe your garment type..."
          className="mt-6 w-full bg-transparent border-b border-input pb-3 font-mono text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
          autoFocus
        />
      )}

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!isValid}
      />
    </div>
  )
}
