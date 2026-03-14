import type { Metadata } from 'next'
import Link from 'next/link'

import { ECOMMERCE_ENABLED } from '@/lib/constants'

const siteName = process.env.SITE_NAME ?? 'New Studios'

export const metadata: Metadata = {
  title: siteName,
  description: 'Welcome. Gym and fitness services.',
}

const services = [
  {
    title: 'Training',
    description: 'Personal and group training with qualified trainers.',
    icon: (
      <svg aria-hidden className="size-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h15m-7.5 4v-8m-3 4h6" />
      </svg>
    ),
  },
  {
    title: 'Classes',
    description: 'Group classes and courses for all levels.',
    icon: (
      <svg aria-hidden className="size-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.09 9.09 0 0 0 3.74-.72 3 3 0 0 0-4-3 2.8 2.8 0 0 0-.5.08 9.09 9.09 0 0 1-7.48 0 2.8 2.8 0 0 0-.5-.08 3 3 0 0 0-4 3 9.09 9.09 0 0 0 3.74.72" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a9.09 9.09 0 0 1 3.74.72 3 3 0 0 1-4 3 2.8 2.8 0 0 1-.5-.08 9.09 9.09 0 0 0-7.48 0 2.8 2.8 0 0 1-.5.08 3 3 0 0 1-4-3 9.09 9.09 0 0 1 3.74-.72" />
      </svg>
    ),
  },
  {
    title: 'Membership',
    description: 'Flexible plans to match your goals and schedule.',
    icon: (
      <svg aria-hidden className="size-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
] as const

export default function HomePage() {
  return (
    <article className="overflow-x-hidden">
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-neutral-100 py-24 dark:bg-neutral-900 sm:py-28 md:py-32 lg:py-36"
        aria-label="Welcome"
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '3rem 3rem',
          }}
        />
        <div className="container mx-auto px-4 text-center">
          <p className="animate-fadeIn [animation-fill-mode:both] text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
            Gym &amp; fitness
          </p>
          <h1 className="mt-4 animate-fadeIn animation-delay-75 [animation-fill-mode:both] text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl md:text-6xl lg:text-7xl">
            {siteName}
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-fadeIn animation-delay-150 [animation-fill-mode:both] text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-xl">
            Train with us. Flexible plans, qualified staff, and a space built for your goals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fadeIn animation-delay-200 [animation-fill-mode:both] sm:gap-5">
            {ECOMMERCE_ENABLED && (
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:outline-neutral-100"
              >
                View plans
              </Link>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-neutral-300 bg-transparent px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-200/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:bg-neutral-800/50 dark:focus-visible:outline-neutral-400"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="py-20 md:py-24 lg:py-28"
        aria-labelledby="services-heading"
      >
        <div className="container mx-auto px-4">
          <header className="mx-auto max-w-2xl text-center">
            <h2
              id="services-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl md:text-4xl"
            >
              What we offer
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
              Services and facilities designed for your progress.
            </p>
          </header>
          <ul className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <li key={service.title}>
                <Link
                  href={ECOMMERCE_ENABLED ? '/pricing' : '/contact'}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 text-left shadow-sm transition hover:border-neutral-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700 dark:hover:shadow-neutral-950/50 dark:focus-visible:outline-neutral-400"
                >
                  <span className="text-neutral-400 transition group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300">
                    {service.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Learn more
                    <svg className="ml-1 size-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50 sm:py-20"
        aria-label="Get in touch"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
            Questions?{' '}
            <Link
              href="/contact"
              className="font-semibold text-neutral-900 underline decoration-2 underline-offset-4 transition hover:decoration-neutral-500 dark:text-neutral-100 dark:hover:decoration-neutral-400"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </section>
    </article>
  )
}
