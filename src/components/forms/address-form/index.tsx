'use client'

import { useForm } from '@tanstack/react-form'
import React from 'react'
import { addressFormSchema, validateWithSchema } from '@/lib/validations'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { FormField } from '@/components/forms/form-field'
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
      <FieldGroup className="mb-8 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Field className="shrink">
            <form.Field name="title">
              {(field) => (
                <>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
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
          </Field>

          <form.Field
            name="firstName"
            validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'First name is required.') }}
          >
            {(field) => <FormField field={field} label="First name*" autoComplete="given-name" />}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Last name is required.') }}
          >
            {(field) => <FormField field={field} label="Last name*" autoComplete="family-name" />}
          </form.Field>
        </div>

        <form.Field name="phone">
          {(field) => <FormField field={field} label="Phone" type="tel" autoComplete="mobile tel" />}
        </form.Field>

        <form.Field name="company">
          {(field) => <FormField field={field} label="Company" autoComplete="organization" />}
        </form.Field>

        <form.Field
          name="addressLine1"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Address line 1 is required.') }}
        >
          {(field) => <FormField field={field} label="Address line 1*" autoComplete="address-line1" />}
        </form.Field>

        <form.Field name="addressLine2">
          {(field) => <FormField field={field} label="Address line 2" autoComplete="address-line2" />}
        </form.Field>

        <form.Field
          name="city"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'City is required.') }}
        >
          {(field) => <FormField field={field} label="City*" autoComplete="address-level2" />}
        </form.Field>

        <form.Field name="state">
          {(field) => <FormField field={field} label="State" autoComplete="address-level1" />}
        </form.Field>

        <form.Field
          name="postalCode"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Postal code is required.') }}
        >
          {(field) => <FormField field={field} label="Zip Code*" />}
        </form.Field>

        <form.Field
          name="country"
          validators={{ onChange: ({ value }) => (value?.trim() ? undefined : 'Country is required.') }}
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="country">Country*</FieldLabel>
                <Select
                  value={field.state.value ?? ''}
                  onValueChange={(v) => field.handleChange(v)}
                >
                  <SelectTrigger id="country" className="w-full" aria-invalid={isInvalid}>
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
      <Button type="submit">Submit</Button>
    </form>
  )
}
