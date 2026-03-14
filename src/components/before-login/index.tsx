import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const customerLoginUrl = serverUrl === undefined ? '/login' : `${serverUrl}/login`

export const BeforeLogin: React.FC = () => {
  return (
    <Card className="w-full max-w-lg border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">New Studios admin</CardTitle>
        <CardDescription>Sign in to manage your site</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p className="leading-relaxed">
          This is the back office for staff. Customers sign in on the{' '}
          <a
            href={customerLoginUrl}
            className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            customer login page
          </a>{' '}
          to access their account, orders, and more.
        </p>
      </CardContent>
    </Card>
  )
}
