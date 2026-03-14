'use client'

import { useForm } from '@tanstack/react-form'
import { loginFormSchema, validateWithSchema } from '@/lib/validations'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef, useState } from 'react'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirectRef = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<null | string>(null)

  const form = useForm<FormData>({
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
      <div className="flex flex-col gap-8">
        <FormItem>
          <form.Field name="email" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Email is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="email">Email</Label>
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
          <form.Field name="password" validators={{ onChange: ({ value }) => (!value ? 'Please provide a password.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.[0] && <FormError message={field.state.meta.errors[0]} />}
              </>
            )}
          </form.Field>
        </FormItem>

        <div className="text-primary/70 mb-6 prose prose-a:hover:text-primary dark:prose-invert">
          <p>
            Forgot your password?{' '}
            <Link href={`/recover-password${allParams}`}>Click here to reset it</Link>
          </p>
        </div>
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
