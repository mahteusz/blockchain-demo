import { TransactionType } from "."

type Block = {
  index: number,
  nonce: number,
  hash: string,
  previousHash: string,
  transaction: TransactionType
}

export { type Block as default }