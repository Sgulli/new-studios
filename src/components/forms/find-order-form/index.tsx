'use client'

import { useForm } from '@tanstack/react-form'
import { findOrderFormSchema, validateWithSchema } from '@/lib/validations'
import { FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/forms/form-field'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth'
import React, { Fragment, useState } from 'react'
import { sendOrderAccessEmail } from './send-order-access-email'

type Props = Readonly<{ initialEmail?: string }>

export const FindOrderForm: React.FC<Props> = ({ initialEmail }) => {
  const { user } = useAuth()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm({
    defaultValues: {
      email: initialEmail ?? user?.email ?? '',
      orderID: '',
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        const result = await sendOrderAccessEmail({
          email: value.email,
          orderID: value.orderID,
        })
        if (result.success) setSuccess(true)
        else setSubmitError(result.error ?? 'Something went wrong. Please try again.')
      } catch {
        setSubmitError('Something went wrong. Please try again.')
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(findOrderFormSchema, value),
    },
  })

  if (success) {
    return (
      <Fragment>
        <h1 className="text-xl mb-4">Check your email</h1>
        <div className="prose dark:prose-invert">
          <p>
            {`If an order exists with the provided email and order ID, we've sent you an email with a link to view your order details.`}
          </p>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1 className="text-xl mb-4">Find my order</h1>
      <div className="prose dark:prose-invert mb-8">
        <p>{`Please enter your email and order ID below. We'll send you a link to view your order.`}</p>
      </div>
      <form
        className="max-w-lg flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Email is required.') }}
          >
            {(field) => <FormField field={field} label="Email address" type="email" />}
          </form.Field>
          <form.Field
            name="orderID"
            validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Order ID is required.') }}
          >
            {(field) => <FormField field={field} label="Order ID" />}
          </form.Field>
        </FieldGroup>
        {submitError && (
          <p className="text-destructive text-sm" role="alert">
            {submitError}
          </p>
        )}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" className="self-start" variant="default" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Find order'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Fragment>
  )
}
