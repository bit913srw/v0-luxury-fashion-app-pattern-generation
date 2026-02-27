"use client"

import { useState, useRef } from "react"
import { Plus, X, ImageIcon, Upload, FileText } from "lucide-react"
import { StepNav } from "./step-nav"

const ACCEPTED_FILE_TYPES = ".pdf,.png,.jpg,.jpeg,.ai,.indd"
const IMAGE_PREVIEW_TYPES = ["image/png", "image/jpeg", "image/jpg"]

const SAMPLE_INSPIRATIONS = [
  { id: "1", name: "Autumn Palette", color: "#C4956A" },
  { id: "2", name: "Midnight Blue", color: "#1B2A4A" },
  { id: "3", name: "Ivory Silk", color: "#F5F0E8" },
  { id: "4", name: "Forest Green", color: "#2D5A3D" },
  { id: "5", name: "Dusty Rose", color: "#C7A0A0" },
  { id: "6", name: "Charcoal Wool", color: "#3A3A3A" },
]

interface StepDesignDescriptionProps {
  value: string
  onChange: (value: string) => void
  selectedInspirations: string[]
  onInspirationToggle: (id: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepDesignDescription({
  value,
  onChange,
  selectedInspirations,
  onInspirationToggle,
  onBack,
  onNext,
}: StepDesignDescriptionProps) {
  const [showLibrary, setShowLibrary] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      if (IMAGE_PREVIEW_TYPES.includes(file.type)) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center">
      <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight text-balance">
        Describe your design
      </h2>

      <div className="mt-10 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell AI.TELIER your vision — fabric, fit, silhouette, color, details & more"
          rows={5}
          className="w-full bg-transparent border border-input p-4 font-mono text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none leading-relaxed"
        />

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          {/* Upload Sketch Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            onChange={handleFileSelect}
            className="hidden"
            id="sketch-upload"
          />
          
          {!uploadedFile ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-foreground bg-background font-mono text-xs tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
              aria-label="Upload your sketch"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload Your Sketch</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 border border-foreground bg-secondary">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Sketch preview"
                  className="h-10 w-10 object-cover border border-input"
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center bg-muted border border-input">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-foreground truncate">
                  {uploadedFile.name}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-1 hover:bg-muted transition-colors"
                aria-label="Remove uploaded file"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>
          )}

          {/* Inspiration Library Button */}
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Pull from Inspiration Library"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Pull from Inspiration Library</span>
          </button>
        </div>
      </div>

      {showLibrary && (
        <div className="mt-6 border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">
              Inspiration Library
            </h3>
            <button
              onClick={() => setShowLibrary(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close inspiration library"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {SAMPLE_INSPIRATIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => onInspirationToggle(item.id)}
                className={`group relative aspect-square flex flex-col items-center justify-center border transition-all ${
                  selectedInspirations.includes(item.id)
                    ? "border-foreground ring-1 ring-foreground"
                    : "border-input hover:border-muted-foreground"
                }`}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <ImageIcon className="h-5 w-5 text-primary-foreground/50" />
                </div>
                <span className="absolute bottom-0 left-0 right-0 bg-background/90 px-1 py-1 font-mono text-[10px] text-foreground text-center truncate">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedInspirations.length > 0 && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-muted-foreground">Selected:</span>
          {selectedInspirations.map((id) => {
            const item = SAMPLE_INSPIRATIONS.find((i) => i.id === id)
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 border border-foreground font-mono text-xs text-foreground"
              >
                {item?.name}
                <button
                  onClick={() => onInspirationToggle(id)}
                  className="hover:opacity-70"
                  aria-label={`Remove ${item?.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )
          })}
        </div>
      )}

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!value.trim()}
      />
    </div>
  )
}
