import type { CollectionConfig } from 'payload'

import { adminOrStaff } from '@/access/admin-or-staff'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  access: {
    create: () => true,
    delete: adminOrStaff,
    read: adminOrStaff,
    update: adminOrStaff,
  },
  admin: {
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Gym',
    useAsTitle: 'subject',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        description: 'Short subject or topic',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
  timestamps: true,
}
