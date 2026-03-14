import type { CollectionConfig } from 'payload'

import { adminOrStaff } from '@/access/adminOrStaff'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    create: adminOrStaff,
    delete: adminOrStaff,
    read: adminOrStaff,
    update: adminOrStaff,
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'createdAt'],
    group: 'Gym',
    useAsTitle: 'firstName',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Primary contact number',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        description: 'Optional, for age-based pricing or eligibility',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the member',
      },
    },
  ],
  timestamps: true,
}
