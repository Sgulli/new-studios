'use client'

import { useForm } from '@tanstack/react-form'
import React from 'react'
import { addressFormSchema, validateWithSchema } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddresses, defaultCountries as supportedCountries } from '@payloadcms/plugin-ecommerce/client/react'
import type { Address, Config } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { titles } from './constants'
import { Button } from '@/components/ui/button'
import { deepMergeSimple } from 'payload'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'

type AddressFormValues = {
  title?: string | null
  firstName?: string | null
  lastName?: string | null
  company?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
  phone?: string | null
}

type Props = {
  addressID?: Config['db']['defaultIDType']
  initialData?: Omit<Address, 'country' | 'id' | 'updatedAt' | 'createdAt'> & { country?: string }
  callback?: (data: Partial<Address>) => void
  skipSubmission?: boolean
}

export const AddressForm: React.FC<Props> = ({
  addressID,
  initialData,
  callback,
  skipSubmission,
}) => {
  const { createAddress, updateAddress } = useAddresses()

  const form = useForm({
    defaultValues: {
      title: initialData?.title ?? null,
      firstName: initialData?.firstName ?? null,
      lastName: initialData?.lastName ?? null,
      company: initialData?.company ?? null,
      addressLine1: initialData?.addressLine1 ?? null,
      addressLine2: initialData?.addressLine2 ?? null,
      city: initialData?.city ?? null,
      state: initialData?.state ?? null,
      postalCode: initialData?.postalCode ?? null,
      country: initialData?.country ?? null,
      phone: initialData?.phone ?? null,
    },
    onSubmit: async ({ value }) => {
      const newData: Partial<Address> = deepMergeSimple(initialData ?? {}, value)
      if (!skipSubmission) {
        if (addressID) {
          await updateAddress(addressID, newData)
        } else {
          await createAddress(newData)
        }
      }
      if (callback) callback(newData)
    },
    validators: {
      onSubmit: ({ value }) => validateWithSchema(addressFormSchema, value),
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
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <FormItem className="shrink">
            <form.Field name="title">
              {(field) => (
                <>
                  <Label htmlFor="title">Title</Label>
                  <Select
                    value={field.state.value ?? ''}
                    onValueChange={(v) => field.handleChange(v)}
                  >
                    <SelectTrigger id="title">
                      <SelectValue placeholder="Title" />
                    </SelectTrigger>
                    <SelectContent>
                      {titles.map((title) => (
                        <SelectItem key={title} value={title}>{title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </form.Field>
          </FormItem>

          <FormItem>
            <form.Field name="firstName" validators={{ onChange: ({ value }) => (!value?.trim() ? 'First name is required.' : undefined) }}>
              {(field) => (
                <>
                  <Label htmlFor="firstName">First name*</Label>
                  <Input
                    id="firstName"
                    autoComplete="given-name"
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
            <form.Field name="lastName" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Last name is required.' : undefined) }}>
              {(field) => (
                <>
                  <Label htmlFor="lastName">Last name*</Label>
                  <Input
                    id="lastName"
                    autoComplete="family-name"
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

        <FormItem>
          <form.Field name="phone">
            {(field) => (
              <><Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                autoComplete="mobile tel"
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              /></>
            )}
          </form.Field>
        </FormItem>

        <FormItem>
          <form.Field name="company">
            {(field) => (
              <><Label htmlFor="company">Company</Label>
              <Input
                id="company"
                autoComplete="organization"
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              /></>
            )}
          </form.Field>
        </FormItem>

        <FormItem>
          <form.Field name="addressLine1" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Address line 1 is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="addressLine1">Address line 1*</Label>
                <Input
                  id="addressLine1"
                  autoComplete="address-line1"
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
          <form.Field name="addressLine2">
            {(field) => (
              <><Label htmlFor="addressLine2">Address line 2</Label>
              <Input
                id="addressLine2"
                autoComplete="address-line2"
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              /></>
            )}
          </form.Field>
        </FormItem>

        <FormItem>
          <form.Field name="city" validators={{ onChange: ({ value }) => (!value?.trim() ? 'City is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  autoComplete="address-level2"
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
          <form.Field name="state">
            {(field) => (
              <><Label htmlFor="state">State</Label>
              <Input
                id="state"
                autoComplete="address-level1"
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              /></>
            )}
          </form.Field>
        </FormItem>

        <FormItem>
          <form.Field name="postalCode" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Postal code is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="postalCode">Zip Code*</Label>
                <Input
                  id="postalCode"
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
          <form.Field name="country" validators={{ onChange: ({ value }) => (!value?.trim() ? 'Country is required.' : undefined) }}>
            {(field) => (
              <>
                <Label htmlFor="country">Country*</Label>
                <Select
                  value={field.state.value ?? ''}
                  onValueChange={(v) => field.handleChange(v)}
                >
                  <SelectTrigger id="country" className="w-full">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedCountries.map((country) => {
                      const value = typeof country === 'string' ? country : country.value
                      let label: string
                      if (typeof country === 'string') label = country
                      else if (typeof country.label === 'string') label = country.label
                      else label = value
                      return (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                {field.state.meta.errors?.[0] && <FormError message={field.state.meta.errors[0]} />}
              </>
            )}
          </form.Field>
        </FormItem>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
