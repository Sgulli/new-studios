import type { Metadata } from 'next'

import { ECOMMERCE_ENABLED } from '@/lib/constants'
import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import { redirect } from 'next/navigation'
import React from 'react'
import { ConfirmOrder } from '@/components/checkout/confirm-order'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ConfirmOrderPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: SearchParams
}) {
  if (!ECOMMERCE_ENABLED) redirect('/')
  const searchParams = await searchParamsPromise

  const paymentIntent = searchParams.paymentId

  return (
    <div className="container min-h-[90vh] flex py-12">
      <ConfirmOrder />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Confirm order.',
  openGraph: mergeOpenGraph({
    title: 'Confirming order',
    url: '/checkout/confirm-order',
  }),
  title: 'Confirming order',
}
