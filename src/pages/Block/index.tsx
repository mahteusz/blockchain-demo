import { IndividualBlock } from "../../components"
import './styles.scss'

const BlockPage = () => {
  return (
    <div className="block-page-container">
      <div className="block-page-container__item">
        <h1>Block 1</h1>
        <IndividualBlock
          index={0}
          nonce={1}
          hash="no-hash"
          transaction={{ 'amount': 0, from: 'sender', to: 'receiver' }}
        />
      </div>
    </div>
  )
}

export default BlockPage