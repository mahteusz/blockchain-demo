import { IndividualBlock, Header } from "../../components"
import './styles.scss'

const BlockPage = () => {
  return (
    <>
      <Header />
      <main className="block-page-container">
        <section className="block-page-container__item">
          <h2 className="block-page-container__block-name">
            Block 0
          </h2>
          <IndividualBlock
            index={0}
            nonce={1}
            hash="no-hash"
            transaction={{ 'amount': 0, from: 'sender', to: 'receiver' }}
          />
        </section>
      </main>
    </>
  )
}

export default BlockPage