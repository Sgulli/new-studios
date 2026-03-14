import type { Metadata } from 'next'

import { RenderParams } from '@/components/render-params'
import Link from 'next/link'
import React from 'react'

import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { LoginForm } from '@/components/forms/login-form'
import { redirect } from 'next/navigation'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <div className="min-h-[60vh] bg-neutral-950" data-theme="dark">
      <div className="container">
        <div className="max-w-xl mx-auto py-16">
          <RenderParams />

          <h1 className="mb-4 text-[1.8rem] font-semibold text-neutral-100">Log in</h1>
          <p className="mb-8 text-neutral-400">
            {`This is where your customers will login to manage their account, review their order history, and more. To manage all users, `}
            <Link
              href="/admin/collections/users"
              className="text-neutral-200 underline underline-offset-4 hover:text-white"
            >
              login to the admin dashboard
            </Link>
            .
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Login or create an account to get started.',
  openGraph: {
    title: 'Login',
    url: '/login',
  },
  title: 'Login',
}
