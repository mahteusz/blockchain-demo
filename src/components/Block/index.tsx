import './styles.scss'
import { useState, useEffect } from 'react'
import { Transaction } from '..'
import { isHashValid, mine } from '../../util/blocks'
import { BlockType, TransactionType } from '../../types'

type Props = {
  outerSetState(id: string, index: number, nonce: number, previousHash: string, transaction: TransactionType): void,
  handleHashUpdate(id: string, newHash: string, newNonce: number): void
  isPreviousHashValid: boolean
  block: BlockType
}

const Block = (props: Props) => {
  const [invalid, setInvalid] = useState<boolean>(true)

  const [transactionAmount, setTransactionAmount] = useState<number>(0)
  const [transactionFrom, setTransactionFrom] = useState<string>('0x00000000')
  const [transactionTo, setTransactionTo] = useState<string>('0x00000000')

  useEffect(() => {
    (props.isPreviousHashValid && isHashValid(props.block.hash)) ? setInvalid(false) : setInvalid(true)
  }, [props.block.hash, props.isPreviousHashValid])

  useEffect(() => {
    props.outerSetState(props.block.id!, props.block.index, props.block.nonce, props.block.previousHash,
      { amount: transactionAmount, from: transactionFrom, to: transactionTo })
  }, [transactionAmount, transactionFrom, transactionTo])

  const handleMining = () => {
    const { newHash, newNonce } = mine(props.block.hash, props.block.nonce,
      `
      ${props.block.index}
      ${props.block.transaction.amount}
      ${props.block.transaction.from}
      ${props.block.transaction.to}
      ${props.block.previousHash}
    `)

    props.handleHashUpdate(props.block.id!, newHash, newNonce)
  }

  return (
    <div className={`block-container ${invalid ? "invalid" : ''}`}>
      <div className="block-container__form">
        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='index'>
            Index:
          </label>
          <input
            className="block-container__input"
            id="index"
            value={props.block.index}
            onChange={(e) => props.outerSetState(props.block.id!, Number(e.target.value), props.block.nonce, props.block.previousHash,
              { amount: transactionAmount, from: transactionFrom, to: transactionTo })}
          />
        </div>

        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='nonce'>
            Nonce:
          </label>
          <input
            className="block-container__input"
            id="nonce"
            value={props.block.nonce}
            onChange={
              (e) =>
                props.outerSetState(props.block.id!, props.block.index, Number(e.target.value), props.block.previousHash,
                  { amount: transactionAmount, from: transactionFrom, to: transactionTo })}
          />
        </div>

        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='hash'>
            Hash:
          </label>
          <input
            className="block-container__input hash"
            id="hash"
            value={props.block.hash}
            disabled={true}
          />
        </div>

        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='hash'>
            Previous Hash:
          </label>
          <input
            className="block-container__input hash"
            id="hash"
            value={props.block.previousHash}
            disabled={true}
          />
        </div>

        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='hash'>
            Transaction:
          </label>
          {
            <Transaction
              outerSetAmount={setTransactionAmount}
              outerSetFrom={setTransactionFrom}
              outerSetTo={setTransactionTo}
              transactionData={{
                amount: transactionAmount,
                from: transactionFrom,
                to: transactionTo
              }}
            />
          }
        </div>
      </div>
      <button
        className='block-container__form-button'
        onClick={handleMining}
      >
        Mine
      </button>
    </div>
  )
}

export default Block