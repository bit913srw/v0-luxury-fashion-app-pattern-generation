"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { StepNav } from "./step-nav"

const SAVED_PROFILES = [
  { id: "p1", name: "HERO", bust: "34", waist: "26", hips: "36" },
  { id: "p2", name: "DEMO 1", bust: "36", waist: "28", hips: "38" },
  { id: "p3", name: "DEMO 2", bust: "32", waist: "24", hips: "34" },
]

const MEASUREMENT_FIELDS = [
  { key: "bust", label: "Bust" },
  { key: "waist", label: "Waist" },
  { key: "hips", label: "Hips" },
  { key: "shoulder", label: "Shoulder Width" },
  { key: "armLength", label: "Arm Length" },
  { key: "inseam", label: "Inseam" },
  { key: "torsoLength", label: "Torso Length" },
]

interface StepMeasurementsProps {
  mode: "saved" | "custom" | null
  selectedProfile: string
  customMeasurements: Record<string, string>
  onModeChange: (mode: "saved" | "custom") => void
  onProfileSelect: (id: string) => void
  onCustomChange: (key: string, value: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepMeasurements({
  mode,
  selectedProfile,
  customMeasurements,
  onModeChange,
  onProfileSelect,
  onCustomChange,
  onBack,
  onNext,
}: StepMeasurementsProps) {
  const isValid =
    mode === "saved"
      ? !!selectedProfile
      : mode === "custom"
        ? !!(customMeasurements.bust && customMeasurements.waist && customMeasurements.hips)
        : false

  return (
    <div className="flex flex-col flex-1 justify-center">
      <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight text-balance">
        Select your measurements
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Saved Profile */}
        <button
          onClick={() => onModeChange("saved")}
          className={`text-left border p-6 transition-all ${
            mode === "saved"
              ? "border-foreground bg-card"
              : "border-input hover:border-muted-foreground"
          }`}
        >
          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">
            Use Saved Profile
          </h3>
          <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">
            Select from your saved measurement profiles
          </p>
        </button>

        {/* Card 2: One-time */}
        <button
          onClick={() => onModeChange("custom")}
          className={`text-left border p-6 transition-all ${
            mode === "custom"
              ? "border-foreground bg-card"
              : "border-input hover:border-muted-foreground"
          }`}
        >
          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">
            One-Time Measurements
          </h3>
          <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">
            Enter measurements for this pattern only
          </p>
        </button>
      </div>

      {/* Saved profiles list */}
      {mode === "saved" && (
        <div className="mt-8 space-y-3">
          {SAVED_PROFILES.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onProfileSelect(profile.id)}
              className={`w-full text-left flex items-center justify-between border p-4 transition-all ${
                selectedProfile === profile.id
                  ? "border-foreground bg-card"
                  : "border-input hover:border-muted-foreground"
              }`}
            >
              <div>
                <span className="font-mono text-sm text-foreground">
                  {profile.name}
                </span>
                <span className="block mt-1 font-mono text-xs text-muted-foreground">
                  {profile.bust}" / {profile.waist}" / {profile.hips}"
                </span>
              </div>
              {selectedProfile === profile.id && (
                <div className="flex items-center justify-center w-5 h-5 border border-foreground bg-foreground text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Custom measurements form */}
      {mode === "custom" && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
          {MEASUREMENT_FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`measure-${field.key}`}
                className="font-mono text-xs tracking-[0.1em] uppercase text-muted-foreground"
              >
                {field.label}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  id={`measure-${field.key}`}
                  type="text"
                  inputMode="decimal"
                  value={customMeasurements[field.key] || ""}
                  onChange={(e) => onCustomChange(field.key, e.target.value)}
                  placeholder="—"
                  className="w-full bg-transparent border-b border-input pb-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
                <span className="font-mono text-xs text-muted-foreground">in</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!isValid}
      />
    </div>
  )
}
