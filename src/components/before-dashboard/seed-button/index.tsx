'use client'

import React, { useCallback, useState, type MouseEvent } from 'react'
import { toast } from '@payloadcms/ui'

import { Button } from '@/components/ui/button'

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{' '}
    <a target="_blank" href="/" className="underline underline-offset-4" rel="noreferrer">
      visit your website
    </a>
    .
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Database already seeded.')
        return
      }
      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }
      if (error) {
        toast.error('An error occurred, please refresh and try again.')
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise<void>((resolve, reject) => {
            fetch('/next/seed', { method: 'POST', credentials: 'include' })
              .then((res) => {
                if (res.ok) {
                  setSeeded(true)
                  resolve()
                } else {
                  reject(new Error('Seeding failed.'))
                }
              })
              .catch(reject)
              .finally(() => setLoading(false))
          }),
          {
            loading: 'Seeding with sample data…',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.',
          },
        )
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    },
    [loading, seeded, error],
  )

  let label: string
  if (loading) label = 'Seeding…'
  else if (seeded) label = 'Done'
  else label = 'Seed your database'

  return (
    <Button
      type="button"
      size="sm"
      variant="default"
      disabled={loading || Boolean(seeded)}
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}
