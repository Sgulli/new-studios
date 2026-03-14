import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './ContactForm'

const siteName = process.env.SITE_NAME ?? 'New Studios'

export const metadata: Metadata = {
  title: `Contact | ${siteName}`,
  description: 'Get in touch with us.',
}

export default function ContactPage() {
  return (
    <article className="pt-16 pb-24">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            ← Back
          </Link>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Contact us
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Send a message and we’ll get back to you as soon as we can.
        </p>
        <ContactForm className="mt-8" />
      </div>
    </article>
  )
}
