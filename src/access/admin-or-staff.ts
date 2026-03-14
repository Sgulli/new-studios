import type { Access } from 'payload'

import { checkRole } from '@/access/utilities'

/**
 * Access for CMS content manageable by both admin and staff (e.g. Members, Plans).
 */
export const adminOrStaff: Access = ({ req: { user } }) => {
  if (user) return checkRole(['admin', 'staff'], user)

  return false
}
