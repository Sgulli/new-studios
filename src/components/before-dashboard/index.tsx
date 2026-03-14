import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { SeedButton } from './seed-button'

export const BeforeDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        Welcome to <strong className="text-foreground">New Studios</strong>. Here’s what to do next.
      </p>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">1. Get sample data</CardTitle>
            <CardDescription>Load products and pages to try the site.</CardDescription>
          </CardHeader>
          <CardContent>
            <SeedButton />
          </CardContent>
          <CardFooter className="text-muted-foreground text-xs">
            Then <a href="/" className="underline underline-offset-4 hover:no-underline">visit your website</a> to see the results.
          </CardFooter>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">2. Payments (Stripe)</CardTitle>
            <CardDescription>Add your API keys to enable checkout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Button asChild size="sm" variant="outline">
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open Stripe dashboard
              </a>
            </Button>
            <p className="text-muted-foreground text-xs">
              Copy the keys into your <code className="rounded bg-muted px-1 py-0.5">.env</code> and restart the server.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">3. Customize</CardTitle>
            <CardDescription>Edit collections and fields to match your needs.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Use the sidebar to manage Pages, Products, Users, and more. You can add or hide fields in{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">payload.config</code>.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
