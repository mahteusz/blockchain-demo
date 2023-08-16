import './styles.scss'
import { TransactionType } from '../../types'
import { Dispatch } from 'react'

type Props = {
  transactionData: TransactionType,
  outerSetAmount: Dispatch<React.SetStateAction<number>>,
  outerSetFrom: Dispatch<React.SetStateAction<string>>
  outerSetTo:Dispatch<React.SetStateAction<string>>
}

const Transaction = (props: Props) => {

  const inputHandlerNumber = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setFunction: Dispatch<React.SetStateAction<number>>) => {
    const newValue = event.target.value
    if (isNaN(Number(newValue)))
      return

    setFunction(Number(newValue))
  }

  const inputHandlerString = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setFunction: Dispatch<React.SetStateAction<string>>) => {
    const newValue = event.target.value
    setFunction(newValue)
  }

  return (
    <div className='transaction-container'>
      <div className='transaction-container__cell'>
        <div className='transaction-container__key'>
          Amount
        </div>
        <input
          className='transaction-container__input'
          value={props.transactionData.amount}
          onChange={(e) => inputHandlerNumber(e, props.outerSetAmount)}
        />
      </div>

      <div className='transaction-container__cell'>
        <div className='transaction-container__key'>
          From
        </div>
        <input
          className='transaction-container__input'
          value={props.transactionData.from}
          onChange={(e) => inputHandlerString(e, props.outerSetFrom)}
        />
      </div>

      <div className='transaction-container__cell'>
        <div className='transaction-container__key'>
          To
        </div>
        <input
          className='transaction-container__input'
          value={props.transactionData.to}
          onChange={(e) => inputHandlerString(e, props.outerSetTo)}
        />
      </div>
    </div>
  )
}

export default Transaction