import { readItems } from '@directus/sdk'
import { TRANSACTION_KEY } from '../../contants/schema-key.constant'
import { directusInstance } from '../../services/directus'
import { Transaction } from '../../types/transaction'

export const fetchUserTransactions = async (
  email: string,
  limit?: number,
): Promise<Transaction[]> => {
  return (await directusInstance.request(
    readItems(TRANSACTION_KEY, {
      sort: ['-trading_date'],
      limit: limit ? limit : Number.MAX_SAFE_INTEGER,
      filter: {
        account_id: {
          user_id: {
            email: {
              _eq: email,
            },
          },
        },
      },
    }),
  )) as any
}
