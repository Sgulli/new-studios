import * as v from 'valibot'

export const contactFormSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Name is required.')),
  email: v.pipe(v.string(), v.nonEmpty('Email is required.'), v.email('Enter a valid email.')),
  phone: v.optional(v.pipe(v.string(), v.trim())),
  subject: v.pipe(v.string(), v.nonEmpty('Subject is required.')),
  message: v.pipe(v.string(), v.nonEmpty('Message is required.')),
})

export type ContactFormValues = v.InferOutput<typeof contactFormSchema>
