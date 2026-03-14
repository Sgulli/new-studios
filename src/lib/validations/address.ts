import * as v from 'valibot'

const optionalString = v.optional(v.nullish(v.string()))
const requiredString = (msg: string) =>
  v.pipe(v.nullish(v.string()), v.transform((s) => s ?? ''), v.nonEmpty(msg))

export const addressFormSchema = v.object({
  title: optionalString,
  firstName: requiredString('First name is required.'),
  lastName: requiredString('Last name is required.'),
  company: optionalString,
  addressLine1: requiredString('Address line 1 is required.'),
  addressLine2: optionalString,
  city: requiredString('City is required.'),
  state: optionalString,
  postalCode: requiredString('Postal code is required.'),
  country: requiredString('Country is required.'),
  phone: optionalString,
})

export type AddressFormValues = v.InferOutput<typeof addressFormSchema>
