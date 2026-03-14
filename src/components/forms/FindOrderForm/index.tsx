'use client'

import { useForm } from '@tanstack/react-form'
import { findOrderFormSchema, validateWithSchema } from '@/lib/validations'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import React, { Fragment, useState } from 'react'
import { sendOrderAccessEmail } from './sendOrderAccessEmail'

type FormData = { email: string; orderID: string }

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
        <FormItem>
          <form.Field name="email" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Email is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="email" className="mb-2">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.[0] && <FormError message={field.state.meta.errors[0]} />}
              </>
            )}
          </form.Field>
        </FormItem>
        <FormItem>
          <form.Field name="orderID" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Order ID is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="orderID" className="mb-2">Order ID</Label>
                <Input
                  id="orderID"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.[0] && <FormError message={field.state.meta.errors[0]} />}
              </>
            )}
          </form.Field>
        </FormItem>
        {submitError && <FormError message={submitError} />}
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
