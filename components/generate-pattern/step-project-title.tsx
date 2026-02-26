"use client"

import { StepNav } from "./step-nav"

interface StepProjectTitleProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function StepProjectTitle({ value, onChange, onNext }: StepProjectTitleProps) {
  return (
    <div className="flex flex-col flex-1 justify-center">
      <label htmlFor="project-title" className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight text-balance">
        What are we creating today?
      </label>

      <input
        id="project-title"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Name your project..."
        className="mt-10 w-full bg-transparent border-b border-input pb-3 font-mono text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
        autoFocus
      />

      <StepNav
        onNext={onNext}
        nextDisabled={!value.trim()}
        showBack={false}
      />
    </div>
  )
}
