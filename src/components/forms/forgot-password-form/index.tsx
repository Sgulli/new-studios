'use client'

import { useForm } from '@tanstack/react-form'
import { forgotPasswordFormSchema, validateWithSchema } from '@/lib/validations'
import { FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/forms/FormField'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
        {
          body: JSON.stringify({ email: value.email }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      )
      if (response.ok) {
        setSuccess(true)
        setError('')
      } else {
        setError(
          'There was a problem while attempting to send you a password reset email. Please try again.',
        )
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(forgotPasswordFormSchema, value),
    },
  })

  if (success) {
    return (
      <Fragment>
        <h1 className="text-xl mb-4">Request submitted</h1>
        <div className="prose dark:prose-invert">
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1 className="text-xl mb-4">Forgot Password</h1>
      <div className="prose dark:prose-invert mb-8">
        <p>
          {`Please enter your email below. You will receive an email message with instructions on
          how to reset your password. To manage your all users, `}
          <Link href="/admin/collections/users">login to the admin dashboard</Link>.
        </p>
      </div>
      <form
        className="max-w-lg"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Message className="mb-8" error={error} />
        <FieldGroup className="mb-8">
          <form.Field
            name="email"
            validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Please provide your email.') }}
          >
            {(field) => <FormField field={field} label="Email address" type="email" />}
          </form.Field>
        </FieldGroup>
        <Button type="submit" variant="default">
          Forgot Password
        </Button>
      </form>
    </Fragment>
  )
}
