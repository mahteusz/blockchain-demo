import { TransactionType } from "."

type Block = {
  id?: string,
  index: number,
  nonce: number,
  hash: string,
  previousHash: string,
  transaction: TransactionType
}

export { type Block as default }