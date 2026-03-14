import { SeedButton } from '@/components/before-dashboard/seed-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ECOMMERCE_ENABLED } from '@/lib/constants';

const allCollectionLinks: { href: string; label: string; description: string }[] = [
  { href: '/admin/collections/pages', label: 'Pages', description: 'Site pages and content' },
  { href: '/admin/collections/users', label: 'Users', description: 'Staff and customer accounts' },
  { href: '/admin/collections/categories', label: 'Categories', description: 'Product categories' },
  { href: '/admin/collections/media', label: 'Media', description: 'Images and files' },
  { href: '/admin/collections/plans', label: 'Plans', description: 'Membership and pricing plans' },
  {
    href: '/admin/collections/inquiries',
    label: 'Inquiries',
    description: 'Contact form submissions',
  },
]

const collectionLinks = ECOMMERCE_ENABLED
  ? allCollectionLinks
  : allCollectionLinks.filter((l) => l.href !== '/admin/collections/plans')

const globalLinks: { href: string; label: string }[] = [
  { href: '/admin/globals/header', label: 'Header' },
  { href: '/admin/globals/footer', label: 'Footer' },
]

export function Dashboard() {
  return (
    <div className="space-y-10 p-2">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">New Studios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your site content and settings.</p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Quick links
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionLinks.map((item) => (
            <a key={item.href} href={item.href}>
              <Card className="h-full border-border bg-card transition-colors hover:bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.label}</CardTitle>
                  <CardDescription className="text-xs">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {globalLinks.map((item) => (
            <Button key={item.href} asChild size="sm" variant="outline">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Get started
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">1. Sample data</CardTitle>
              <CardDescription>Load products and pages to try the site.</CardDescription>
            </CardHeader>
            <CardContent>
              <SeedButton />
            </CardContent>
            <CardFooter className="text-muted-foreground text-xs">
              <a
                href="/"
                className="underline underline-offset-4 hover:no-underline"
                target="_blank"
                rel="noreferrer"
              >
                Visit your website
              </a>
              <span className="text-muted-foreground text-xs"> to see the results.</span>
            </CardFooter>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">2. Stripe</CardTitle>
              <CardDescription>Add API keys to enable payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="sm" variant="outline">
                <a
                  href="https://dashboard.stripe.com/test/apikeys"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Stripe dashboard
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">3. Customize</CardTitle>
              <CardDescription>Edit collections and fields in payload.config.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}
