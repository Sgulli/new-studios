import type { CollectionConfig } from 'payload'

import { adminOrStaff } from '@/access/admin-or-staff'

export const Plans: CollectionConfig = {
  slug: 'plans',
  access: {
    create: adminOrStaff,
    delete: adminOrStaff,
    read: () => true,
    update: adminOrStaff,
  },
  admin: {
    defaultColumns: ['name', 'price', 'duration', 'durationUnit', 'active', 'createdAt'],
    group: 'Gym',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Monthly, Annual, 10 Entries',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description for listino and admin',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in the configured currency',
        step: 0.01,
      },
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      min: 1,
      admin: { description: 'Length of the plan (e.g. 1 month, 12 months)' },
    },
    {
      name: 'durationUnit',
      type: 'select',
      required: true,
      defaultValue: 'month',
      options: [
        { label: 'Day(s)', value: 'day' },
        { label: 'Week(s)', value: 'week' },
        { label: 'Month(s)', value: 'month' },
        { label: 'Year(s)', value: 'year' },
      ],
      admin: { description: 'Unit for duration' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Inactive plans are hidden from public listino' },
    },
  ],
  timestamps: true,
}
