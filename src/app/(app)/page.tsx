import type { Metadata } from 'next'
import Link from 'next/link'

const siteName = process.env.SITE_NAME ?? 'New Studios'

export const metadata: Metadata = {
  title: siteName,
  description: 'Welcome. Gym and fitness services.',
}

const services = [
  {
    title: 'Training',
    description: 'Personal and group training with qualified trainers.',
  },
  {
    title: 'Classes',
    description: 'Group classes and courses for all levels.',
  },
  {
    title: 'Membership',
    description: 'Flexible plans to match your goals and schedule.',
  },
]

export default function HomePage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-100 py-20 dark:bg-neutral-900 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {siteName}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Train with us. Flexible plans, qualified staff, and a space built for
            your goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              View plans
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            What we offer
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-neutral-600 dark:text-neutral-400">
            Services and facilities designed for your progress.
          </p>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.title}
                className="rounded-lg border border-neutral-200 p-6 text-center dark:border-neutral-800"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Questions?{' '}
            <Link
              href="/contact"
              className="font-medium text-neutral-900 underline hover:no-underline dark:text-neutral-100"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </section>
    </article>
  )
}
