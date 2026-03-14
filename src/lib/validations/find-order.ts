import * as v from 'valibot'

export const findOrderFormSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty('Email is required.'), v.email('Enter a valid email.')),
  orderID: v.pipe(v.string(), v.nonEmpty('Order ID is required.')),
})

export type FindOrderFormValues = v.InferOutput<typeof findOrderFormSchema>
