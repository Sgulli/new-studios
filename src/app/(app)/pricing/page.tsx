import type { Metadata } from 'next'
import Link from 'next/link'
import { ECOMMERCE_ENABLED } from '@/lib/constants'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

const siteName = process.env.SITE_NAME ?? 'New Studios'

export const metadata: Metadata = {
  title: `Pricing | ${siteName}`,
  description: 'Plans and pricing.',
}

const DURATION_LABELS: Record<string, string> = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
}

function formatDuration(duration: number, unit: string): string {
  const label = DURATION_LABELS[unit] ?? unit
  const plural = duration === 1 ? '' : 's'
  return `${duration} ${label}${plural}`
}

export default async function PricingPage() {
  if (!ECOMMERCE_ENABLED) redirect('/')
  const payload = await getPayload({ config: configPromise })
  const { docs: plans } = await payload.find({
    collection: 'plans',
    where: { active: { equals: true } },
    sort: 'price',
    limit: 50,
  })

  return (
    <article className="pt-16 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            ← Back
          </Link>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Pricing
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Choose the plan that fits you. All prices are indicative.
        </p>
        {plans.length === 0 ? (
          <p className="mt-8 text-neutral-500 dark:text-neutral-400">
            No plans available at the moment. Check back later or contact us.
          </p>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="flex flex-col rounded-lg border border-neutral-200 p-6 dark:border-neutral-800"
              >
                <h2 className="text-lg font-semibold">{plan.name}</h2>
                {plan.description && (
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {plan.description}
                  </p>
                )}
                <p className="mt-4 text-2xl font-semibold">
                  €{typeof plan.price === 'number' ? plan.price.toFixed(2) : plan.price}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  per {formatDuration(plan.duration, plan.durationUnit)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
