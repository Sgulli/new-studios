import * as v from 'valibot'

export const loginFormSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty('Email is required.')),
  password: v.pipe(v.string(), v.nonEmpty('Please provide a password.')),
})

export type LoginFormValues = v.InferOutput<typeof loginFormSchema>
