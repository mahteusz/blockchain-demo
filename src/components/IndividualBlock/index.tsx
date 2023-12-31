import './styles.scss'
import { useState, useEffect } from 'react'
import { Transaction } from '..'
import { isHashValid, calculateHash, mine } from '../../util/blocks'
import { inputHandlerNumber, inputHandlerString } from '../../util/onChangeHandlers'
import { IndividualBlockType } from '../../types'

const Block = (props: IndividualBlockType) => {
  const [index, setIndex] = useState<number>(props.index)
  const [nonce, setNonce] = useState<number>(props.nonce)
  const [hash, setHash] = useState<string>(props.hash)
  const [invalid, setInvalid] = useState<boolean>(true)

  const [transactionAmount, setTransactionAmount] = useState<number>(0)
  const [transactionFrom, setTransactionFrom] = useState<string>('0x00000000')
  const [transactionTo, setTransactionTo] = useState<string>('0x00000000')

  useEffect(() => {
    setHash(calculateHash(
      `${index}${transactionAmount}${transactionFrom}${transactionTo}${nonce}`
    ))
  }, [index, nonce, transactionAmount, transactionFrom, transactionTo])

  useEffect(() => {
    isHashValid(hash) ? setInvalid(false) : setInvalid(true)
  }, [hash])

  const handleMine = () => {
    const { newHash, newNonce } = mine(hash, nonce, `${index}${transactionAmount}${transactionFrom}${transactionTo}`)
    setHash(newHash)
    setNonce(newNonce)
    setInvalid(false)
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
            value={index}
            onChange={(e) => inputHandlerNumber(e, setIndex)}
          />
        </div>

        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='nonce'>
            Nonce:
          </label>
          <input
            className="block-container__input"
            id="nonce"
            value={nonce}
            onChange={(e) => inputHandlerNumber(e, setNonce)}
          />
        </div>

        <div className="block-container__form-item">
          <label className="block-container__label" htmlFor='hash'>
            Hash:
          </label>
          <input
            className="block-container__input hash"
            id="hash"
            value={hash}
            onChange={(e) => inputHandlerString(e, setHash)}
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
        onClick={handleMine}
      >
        Mine
      </button>
    </div>
  )
}

export default Block