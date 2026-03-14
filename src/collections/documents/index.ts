import type { CollectionConfig } from 'payload'

import { adminOrStaff } from '@/access/admin-or-staff'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    create: adminOrStaff,
    delete: adminOrStaff,
    read: adminOrStaff,
    update: adminOrStaff,
  },
  admin: {
    group: 'Gym',
    description: 'PDF uploads (e.g. medical certificates).',
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Short description (e.g. "Medical certificate - Mario Rossi")',
      },
    },
  ],
}
