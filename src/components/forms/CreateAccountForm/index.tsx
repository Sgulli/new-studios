'use client'

import { useForm } from '@tanstack/react-form'
import { createAccountFormSchema, validateWithSchema } from '@/lib/validations'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const form = useForm({
    defaultValues: { email: '', password: '', passwordConfirm: '' },
    onSubmit: async ({ value }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(value),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      if (!response.ok) {
        setError(response.statusText || 'There was an error creating the account.')
        return
      }
      const redirect = searchParams.get('redirect')
      const timer = setTimeout(() => setLoading(true), 1000)
      try {
        await login(value)
        clearTimeout(timer)
        if (redirect) router.push(redirect)
        else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
      } catch {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(createAccountFormSchema, value),
    },
  })

  return (
    <form
      className="max-w-lg py-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="prose dark:prose-invert mb-6">
        <p>
          {`This is where new customers can signup and create a new account. To manage all users, `}
          <Link href="/admin/collections/users">login to the admin dashboard</Link>.
        </p>
      </div>
      <Message error={error} />
      <div className="flex flex-col gap-8 mb-8">
        <FormItem>
          <form.Field name="email" validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Email is required.') }}>
            {(field) => (
              <>
                <Label htmlFor="email" className="mb-2">Email Address</Label>
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
          <form.Field name="password" validators={{ onChange: ({ value }) => (value ? undefined : 'Password is required.') }}>
            {(field) => (
              <>
                <Label htmlFor="password" className="mb-2">New password</Label>
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
        <FormItem>
          <form.Field
            name="passwordConfirm"
            validators={{ onChange: ({ value }) => (value ? undefined : 'Please confirm your password.') }}
          >
            {(field) => (
              <>
                <Label htmlFor="passwordConfirm" className="mb-2">Confirm Password</Label>
                <Input
                  id="passwordConfirm"
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
      </div>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button disabled={loading || isSubmitting} type="submit" variant="default">
            {loading || isSubmitting ? 'Processing' : 'Create Account'}
          </Button>
        )}
      </form.Subscribe>
      <div className="prose dark:prose-invert mt-8">
        <p>
          {'Already have an account? '}
          <Link href={`/login${allParams}`}>Login</Link>
        </p>
      </div>
    </form>
  )
}
