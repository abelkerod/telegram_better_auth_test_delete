import type { HTMLInputTypeAttribute } from "react"
import { useStore } from "@tanstack/react-form"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { useFieldContext } from "@/hooks/demo.form-context"
import { cn } from "@/lib/utils"

/* ---------- helpers ---------- */

/** 1234 → 1,234 */
function formatNumber(n: string) {
  return new Intl.NumberFormat("en-US").format(Number(n))
}

/** Accepts empty, minus, decimals, digits (comma-free) */
const NUMERIC_REGEX = /^-?\d*(?:\.\d*)?$/

/* ---------- props ---------- */
interface FormFieldProps {
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  description?: string
  format?: "number"
  unit?: string
  disabled?: boolean
}

/* ---------- component ---------- */
export function FormInput({
  label,
  type = "text",
  placeholder,
  className,
  description,
  format,
  unit,
  disabled = false,
}: FormFieldProps) {
  const field = useFieldContext<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  /* ---- store state ---- */
  const errors = useStore(field.store, s => s.meta.errors)
  const rawValue = field.state.value

  /* ---- derived flags ---- */
  const decorate = format === "number" && Boolean(unit)

  /* ---- change handler ---- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip commas once; keep everything else for easy processing
    let value = e.target.value.replace(/,/g, "")

    // Reject non-numeric chars only when we expect a number
    if (format === "number" && !NUMERIC_REGEX.test(value))
      return

    // Additional cleanup for decorated inputs (unit removal)
    if (decorate) {
      value = value.replace(new RegExp(`\\s*${unit}\\s*`, "i"), "").trim()
    }

    // Update form state
    field.handleChange(value)
  }

  /* ---- render ---- */
  return (
    <label className="space-y-2 my-3 block">
      {label && <span className="block mb-1 font-medium">{label}</span>}

      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          inputMode={decorate || type === "number" ? "decimal" : "text"}
          placeholder={placeholder}
          value={decorate ? formatNumber(rawValue) : rawValue}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            decorate && "pr-12",
            errors.length && "border-destructive focus-visible:ring-destructive",
            className,
          )}
        />

        {decorate && (
          <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground pointer-events-none">
            {unit}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {errors.map(({ message }) => (
        <p key={message} className="text-sm text-destructive">
          {message}
        </p>
      ))}
    </label>
  )
}
