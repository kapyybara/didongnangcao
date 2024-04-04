export type Transaction = {
  id: string
  name: string
  type: 'income' | 'expenses'
  total: number
  trading_date: string
  account_id: string
  category: string
  date_created: string
  date_updated: string
  deleted_at: string
  description: string
}
