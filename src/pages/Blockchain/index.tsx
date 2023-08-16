
import './styles.scss'
import { useState } from 'react'
import { Block } from "../../components";
import { BlockType } from "../../types";

const Blockchain = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([
    {
      index: 0,
      nonce: 0,
      previousHash: "000",
      hash: "no-hash",
      transaction: { amount: 0, from: 'sender', to: 'receiver' }
    },
  ])

  const handleAddBlock = () => {
    const newBlock = {
      index: blocks.length,
      nonce: 0,
      previousHash: blocks[blocks.length-1].hash,
      hash: "no-hash",
      transaction: { amount: 0, from: 'sender', to: 'receiver' }
    }

    setBlocks([...blocks, newBlock])
  }

  return (
    <div className="blockchain-container">
      {
        blocks.map(block => {
          return (
            <div className="blockchain-container__block">
              <h1 className="blockchain-container__block-name">Block {block.index}</h1>
              <Block
                index={block.index}
                nonce={block.nonce}
                hash={block.hash}
                previousHash={block.previousHash}
                transaction={block.transaction}
              />
            </div>
          )
        })
      }
      <button onClick={handleAddBlock}>add block</button>
    </div>
  )
}

export default Blockchain