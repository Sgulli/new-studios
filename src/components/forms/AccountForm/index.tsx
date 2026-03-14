'use client'

import { useForm } from '@tanstack/react-form'
import { accountFormSchema, validateWithSchema } from '@/lib/validations'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'sonner'

type FormData = {
  email: string
  name: User['name']
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async ({ value }) => {
      if (!user) return
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
        body: JSON.stringify(value),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
      })
      if (response.ok) {
        const json = await response.json()
        setUser(json.doc)
        toast.success('Successfully updated account.')
        setChangePassword(false)
      } else {
        toast.error('There was a problem updating your account.')
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(accountFormSchema, value),
    },
  })

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent('You must be logged in to view this page.')}&redirect=${encodeURIComponent('/account')}`,
      )
    }
  }, [user, router])

  return (
    <form
      className="max-w-xl"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      {!changePassword ? (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p className="">
              {'Change your account details below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(true)}
                type="button"
                variant="link"
              >
                click here
              </Button>
              {' to change your password.'}
            </p>
          </div>
          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <form.Field name="email" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Please provide an email.' : undefined) }}>
                {(field) => (
                  <>
                    <Label htmlFor="email" className="mb-2">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && <FormError message={field.state.meta.errors[0]} />}
                  </>
                )}
              </form.Field>
            </FormItem>
            <FormItem>
              <form.Field name="name" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Please provide a name.' : undefined) }}>
                {(field) => (
                  <>
                    <Label htmlFor="name" className="mb-2">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && <FormError message={field.state.meta.errors[0]} />}
                  </>
                )}
              </form.Field>
            </FormItem>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {'Change your password below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(false)}
                type="button"
                variant="link"
              >
                cancel
              </Button>
              .
            </p>
          </div>
          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <form.Field name="password" validators={{ onChange: ({ value }) => (changePassword && !value ? 'Please provide a new password.' : undefined) }}>
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
                validators={{
                  onChange: ({ value }) => {
                    if (!changePassword) return undefined
                    if (!value) return 'Please confirm your new password.'
                    return undefined
                  },
                  onSubmit: ({ value, fieldApi }) => {
                    if (!changePassword) return undefined
                    const password = fieldApi.form.getFieldValue('password')
                    return value !== password ? 'The passwords do not match' : undefined
                  },
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor="passwordConfirm" className="mb-2">Confirm password</Label>
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
        </Fragment>
      )}
      <form.Subscribe selector={(state) => [state.isSubmitting, state.isDirty]}>
        {([isSubmitting, isDirty]) => {
          let buttonText = 'Update Account'
          if (isSubmitting) buttonText = 'Processing'
          else if (changePassword) buttonText = 'Change Password'
          return (
            <Button disabled={isSubmitting || !isDirty} type="submit" variant="default">
              {buttonText}
            </Button>
          )
        }}
      </form.Subscribe>
    </form>
  )
}
