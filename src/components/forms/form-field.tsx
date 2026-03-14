'use client'

import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FieldLike = {
  name: string
  state: {
    value: string | null
    meta: {
      isTouched: boolean
      isValid: boolean
      errors?: (string | undefined)[]
    }
  }
  handleBlur: () => void
  handleChange: (value: string) => void
}

type FormFieldProps = Readonly<{
  field: FieldLike
  label: string
  type?: 'text' | 'email' | 'tel' | 'password'
  as?: 'input' | 'textarea'
  rows?: number
  autoComplete?: string
}>

export function FormField({ field, label, type = 'text', as = 'input', rows, autoComplete }: FormFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {as === 'textarea' ? (
        <Textarea
          id={field.name}
          name={field.name}
          rows={rows ?? 4}
          value={field.state.value ?? ''}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          autoComplete={autoComplete}
        />
      ) : (
        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value ?? ''}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          autoComplete={autoComplete}
        />
      )}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
