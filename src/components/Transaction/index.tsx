import './styles.scss'
import { TransactionType } from '../../types'
import { Dispatch } from 'react'
import { inputHandlerNumber, inputHandlerString } from '../../util/onChangeHandlers'

type Props = {
  transactionData: TransactionType,
  outerSetAmount: Dispatch<React.SetStateAction<number>>,
  outerSetFrom: Dispatch<React.SetStateAction<string>>
  outerSetTo:Dispatch<React.SetStateAction<string>>
}

const Transaction = (props: Props) => {
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