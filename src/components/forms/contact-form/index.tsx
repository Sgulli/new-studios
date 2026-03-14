'use client'

import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { contactFormSchema, validateWithSchema } from '@/lib/validations'
import { submitInquiryFromValues } from '@/app/(app)/contact/actions'
import { FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/forms/form-field'
import { Button } from '@/components/ui/button'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Props = Readonly<{ className?: string }>

export function ContactForm({ className }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      setStatus('loading')
      setErrorMessage(null)
      const result = await submitInquiryFromValues(value)
      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(result.error ?? 'Something went wrong.')
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(contactFormSchema, value),
    },
  })

  if (status === 'success') {
    return (
      <div
        className={`rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200 ${className ?? ''}`}
      >
        <p className="font-medium">Message sent.</p>
        <p className="mt-1 text-sm">We’ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form
      className={className ?? ''}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="space-y-4">
        <form.Field
          name="name"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Required') }}
        >
          {(field) => <FormField field={field} label="Name *" />}
        </form.Field>

        <form.Field
          name="email"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Required') }}
        >
          {(field) => <FormField field={field} label="Email *" type="email" />}
        </form.Field>

        <form.Field name="phone">
          {(field) => <FormField field={field} label="Phone" type="tel" />}
        </form.Field>

        <form.Field
          name="subject"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Required') }}
        >
          {(field) => <FormField field={field} label="Subject *" />}
        </form.Field>

        <form.Field
          name="message"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Required') }}
        >
          {(field) => <FormField field={field} label="Message *" as="textarea" rows={4} />}
        </form.Field>
      </FieldGroup>

      {errorMessage && (
        <p className="text-destructive text-sm mt-2" role="alert">
          {errorMessage}
        </p>
      )}

      <form.Subscribe selector={(state) => [state.isSubmitting]}>
        {([isSubmitting]) => (
          <Button
            type="submit"
            disabled={isSubmitting || status === 'loading'}
            variant="default"
            className="mt-4"
          >
            {isSubmitting || status === 'loading' ? 'Sending…' : 'Send message'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
