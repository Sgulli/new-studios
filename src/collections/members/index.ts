import type { CollectionConfig } from 'payload'

import { adminOrStaff } from '@/access/admin-or-staff'

export type SubscriptionStatus = 'active' | 'expired' | 'none'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    create: adminOrStaff,
    delete: adminOrStaff,
    read: adminOrStaff,
    update: adminOrStaff,
  },
  admin: {
    defaultColumns: [
      'firstName',
      'lastName',
      'email',
      'subscriptionStatus',
      'medicalCertificateExpiry',
      'createdAt',
    ],
    group: 'Gym',
    useAsTitle: 'firstName',
    listSearchableFields: ['firstName', 'lastName', 'email', 'phone'],
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
      type: 'row',
      fields: [
        {
          name: 'plan',
          type: 'relationship',
          relationTo: 'plans',
          admin: {
            description: 'Current subscription plan',
          },
        },
        {
          name: 'subscriptionStart',
          type: 'date',
          admin: { description: 'Start of current subscription period' },
        },
        {
          name: 'subscriptionEnd',
          type: 'date',
          admin: { description: 'End of current subscription period' },
        },
      ],
    },
    {
      name: 'subscriptionStatus',
      type: 'text',
      virtual: true,
      admin: {
        description: 'Computed: Active / Expired / None',
        readOnly: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'medicalCertificate',
          type: 'upload',
          relationTo: 'documents',
          admin: {
            description: 'Medical certificate PDF',
          },
        },
        {
          name: 'medicalCertificateExpiry',
          type: 'date',
          admin: {
            description: 'Expiry date of the medical certificate',
          },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the member',
      },
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        const end = doc.subscriptionEnd
        const now = new Date()
        let status: 'active' | 'expired' | 'none' = 'none'
        if (end) {
          const endDate = new Date(end)
          const comp = endDate.getTime() >= now.getTime()
          status = comp ? 'active' : 'expired'
        }
        doc.subscriptionStatus = status
        return doc
      },
    ],
  },
  timestamps: true,
}
