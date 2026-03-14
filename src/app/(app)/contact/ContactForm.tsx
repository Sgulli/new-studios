'use client'

import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { contactFormSchema, validateWithSchema } from '@/lib/validations'
import { submitInquiryFromValues } from './actions'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Props = Readonly<{ className?: string }>

const inputClass =
  'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'

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
      <div className="space-y-4">
        <form.Field name="name" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Required' : undefined) }}>
          {(field) => (
            <div>
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                Name *
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
              />
              {field.state.meta.errors?.[0] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="email" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Required' : undefined) }}>
          {(field) => (
            <div>
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                Email *
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
              />
              {field.state.meta.errors?.[0] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <div>
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                Phone
              </label>
              <input
                id={field.name}
                name={field.name}
                type="tel"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="subject" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Required' : undefined) }}>
          {(field) => (
            <div>
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                Subject *
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
              />
              {field.state.meta.errors?.[0] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="message" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Required' : undefined) }}>
          {(field) => (
            <div>
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                Message *
              </label>
              <textarea
                id={field.name}
                name={field.name}
                rows={4}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
              />
              {field.state.meta.errors?.[0] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {errorMessage && <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}

        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <button
              type="submit"
              disabled={isSubmitting || status === 'loading'}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {isSubmitting || status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
