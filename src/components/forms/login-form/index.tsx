'use client'

import { useForm } from '@tanstack/react-form'
import { loginFormSchema, validateWithSchema } from '@/lib/validations'
import { FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/forms/form-field'
import { Message } from '@/components/message'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef, useState } from 'react'

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirectRef = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<null | string>(null)

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      try {
        await login(value)
        if (redirectRef.current) router.push(redirectRef.current)
        else router.push('/account')
      } catch {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(loginFormSchema, value),
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Message className="classes.message" error={error} />
      <FieldGroup className="gap-8">
        <form.Field
          name="email"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Email is required.') }}
        >
          {(field) => <FormField field={field} label="Email" type="email" />}
        </form.Field>
        <form.Field
          name="password"
          validators={{ onChange: ({ value }) => (value ? undefined : 'Please provide a password.') }}
        >
          {(field) => <FormField field={field} label="Password" type="password" />}
        </form.Field>
      </FieldGroup>

      <div className="text-primary/70 mb-6 prose prose-a:hover:text-primary dark:prose-invert">
        <p>
          Forgot your password?{' '}
          <Link href={`/recover-password${allParams}`}>Click here to reset it</Link>
        </p>
      </div>

      <div className="flex gap-4 justify-between">
        <Button asChild variant="outline" size="lg">
          <Link href={`/create-account${allParams}`} className="grow max-w-[50%]">
            Create an account
          </Link>
        </Button>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button className="grow" disabled={isSubmitting} size="lg" type="submit" variant="default">
              {isSubmitting ? 'Processing' : 'Continue'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
