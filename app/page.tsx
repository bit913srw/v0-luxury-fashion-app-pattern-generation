"use client"

import { useState, useCallback } from "react"
import { StepHeader } from "@/components/generate-pattern/step-header"
import { StepProjectTitle } from "@/components/generate-pattern/step-project-title"
import { StepGarmentType } from "@/components/generate-pattern/step-garment-type"
import { StepDesignDescription } from "@/components/generate-pattern/step-design-description"
import { StepMeasurements } from "@/components/generate-pattern/step-measurements"
import { StepReview } from "@/components/generate-pattern/step-review"
import { GenerationResult } from "@/components/generate-pattern/generation-result"

type FlowState = "steps" | "generating"

export default function GeneratePatternPage() {
  const [flowState, setFlowState] = useState<FlowState>("steps")
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1
  const [projectTitle, setProjectTitle] = useState("")

  // Step 2
  const [garmentType, setGarmentType] = useState("")
  const [customGarment, setCustomGarment] = useState("")

  // Step 3
  const [description, setDescription] = useState("")
  const [selectedInspirations, setSelectedInspirations] = useState<string[]>([])

  // Step 4
  const [measurementMode, setMeasurementMode] = useState<"saved" | "custom" | null>(null)
  const [selectedProfile, setSelectedProfile] = useState("")
  const [customMeasurements, setCustomMeasurements] = useState<Record<string, string>>({})

  const totalSteps = 5

  const goNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep])

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep])

  const handleInspirationToggle = useCallback((id: string) => {
    setSelectedInspirations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }, [])

  const handleCustomMeasurementChange = useCallback((key: string, value: string) => {
    setCustomMeasurements((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleGenerate = useCallback(() => {
    setFlowState("generating")
  }, [])

  const handleEditPrompt = useCallback(() => {
    setFlowState("steps")
    setCurrentStep(3)
  }, [])

  const garmentDisplay = garmentType === "Other" ? customGarment : garmentType

  // Generation result screen (no step header)
  if (flowState === "generating") {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-24 py-8 max-w-4xl mx-auto w-full">
          <GenerationResult
            garmentType={garmentDisplay}
            description={description}
            onRegenerate={() => {}}
            onEditPrompt={handleEditPrompt}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-24 py-8 max-w-4xl mx-auto w-full relative">
        <StepHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={() => {
            if (currentStep === 1) {
              // Navigate to Studio (no-op in demo)
            } else {
              goBack()
            }
          }}
        />

        <div className="flex-1 flex flex-col mt-8 md:mt-16">
          {currentStep === 1 && (
            <StepProjectTitle
              value={projectTitle}
              onChange={setProjectTitle}
              onNext={goNext}
            />
          )}

          {currentStep === 2 && (
            <StepGarmentType
              value={garmentType}
              customValue={customGarment}
              onChange={setGarmentType}
              onCustomChange={setCustomGarment}
              onBack={goBack}
              onNext={goNext}
            />
          )}

          {currentStep === 3 && (
            <StepDesignDescription
              value={description}
              onChange={setDescription}
              selectedInspirations={selectedInspirations}
              onInspirationToggle={handleInspirationToggle}
              onBack={goBack}
              onNext={goNext}
            />
          )}

          {currentStep === 4 && (
            <StepMeasurements
              mode={measurementMode}
              selectedProfile={selectedProfile}
              customMeasurements={customMeasurements}
              onModeChange={setMeasurementMode}
              onProfileSelect={setSelectedProfile}
              onCustomChange={handleCustomMeasurementChange}
              onBack={goBack}
              onNext={goNext}
            />
          )}

          {currentStep === 5 && (
            <StepReview
              data={{
                projectTitle,
                garmentType,
                customGarment,
                description,
                measurementMode,
                selectedProfile,
              }}
              onBack={goBack}
              onGenerate={handleGenerate}
            />
          )}
        </div>
      </div>
    </main>
  )
}
