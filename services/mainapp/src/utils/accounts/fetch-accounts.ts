import { readItems } from '@directus/sdk'
import { directusInstance } from '../../services/directus'
import { ACCOUNT_KEY } from '../../contants/schema-key.constant'
import { Account } from '../../types/account'

export const fetchUserAccounts = async (
  email: string,
  filter?: object,
): Promise<Account[]> => {
  return (await directusInstance.request(
    readItems(ACCOUNT_KEY, (filter = { ...filter })),
  )) as any
}
