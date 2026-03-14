'use client'

import { useForm } from '@tanstack/react-form'
import { accountFormSchema, validateWithSchema } from '@/lib/validations'
import { FieldGroup } from '@/components/ui/field'
import { FormField } from '@/components/forms/form-field'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'sonner'

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
          <FieldGroup className="mb-8 gap-8">
            <form.Field
              name="email"
              validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Please provide an email.') }}
            >
              {(field) => <FormField field={field} label="Email Address" type="email" />}
            </form.Field>
            <form.Field
              name="name"
              validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Please provide a name.') }}
            >
              {(field) => <FormField field={field} label="Name" />}
            </form.Field>
          </FieldGroup>
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
          <FieldGroup className="mb-8 gap-8">
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  changePassword && !value ? 'Please provide a new password.' : undefined,
              }}
            >
              {(field) => <FormField field={field} label="New password" type="password" />}
            </form.Field>
            <form.Field
              name="passwordConfirm"
              validators={{
                onChange: ({ value }) =>
                  changePassword && !value ? 'Please confirm your new password.' : undefined,
                onSubmit: ({ value, fieldApi }) => {
                  if (!changePassword) return undefined
                  const password = fieldApi.form.getFieldValue('password')
                  return value !== password ? 'The passwords do not match' : undefined
                },
              }}
            >
              {(field) => <FormField field={field} label="Confirm password" type="password" />}
            </form.Field>
          </FieldGroup>
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
