'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type SubmitResult = { success: true } | { success: false; error?: string }

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitInquiry(formData: FormData): Promise<SubmitResult> {
  const name = getString(formData, 'name')
  const email = getString(formData, 'email')
  const phone = getString(formData, 'phone')
  const subject = getString(formData, 'subject')
  const message = getString(formData, 'message')

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'inquiries',
      data: { name, email, phone, subject, message },
    })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send message.'
    return { success: false, error: message }
  }
}

export type InquiryValues = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function submitInquiryFromValues(values: InquiryValues): Promise<SubmitResult> {
  const name = values.name?.trim()
  const email = values.email?.trim()
  const subject = values.subject?.trim()
  const message = values.message?.trim()
  const phone = values.phone?.trim() || undefined

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'inquiries',
      data: { name, email, phone, subject, message },
    })
    return { success: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to send message.'
    return { success: false, error: msg }
  }
}
