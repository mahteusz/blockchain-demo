import { IndividualBlock, Header } from "../../components"
import './styles.scss'

const BlockPage = () => {
  return (
    <>
      <Header />
      <div className="block-page-container">
        <div className="block-page-container__item">
          <span className="block-page-container__block-name">
            Block 0
          </span>
          <IndividualBlock
            index={0}
            nonce={1}
            hash="no-hash"
            transaction={{ 'amount': 0, from: 'sender', to: 'receiver' }}
          />
        </div>
      </div>
    </>
  )
}

export default BlockPage