
import './styles.scss'
import { useState } from 'react'
import { Block } from "../../components";
import { BlockType, TransactionType } from "../../types";
import { v1 as uuid } from 'uuid'
import { calculateHash, isHashValid } from '../../util/blocks';

const Blockchain = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([
    {
      id: uuid(),
      index: 0,
      nonce: 0,
      previousHash: "000",
      hash: calculateHash(`
        ${0}
        ${0}
        ${'sender'}
        ${'receiver'}
        ${'000'}
        ${0}
      `),
      transaction: { amount: 0, from: '0x00000000', to: '0x00000000' }
    },
  ])

  const handleBlockUpdate = (id: string, index: number, nonce: number, previousHash: string, transaction: TransactionType) => {
    const foundIndex = blocks.findIndex(block => block.id === id)
    if (foundIndex === -1) return

    const newBlocks = [...blocks]
    const foundBlock = newBlocks[foundIndex]
    foundBlock.index = index
    foundBlock.nonce = nonce
    foundBlock.previousHash = previousHash
    foundBlock.transaction.amount = transaction.amount
    foundBlock.transaction.from = transaction.from
    foundBlock.transaction.to = transaction.to
    foundBlock.hash = calculateHash(`
      ${foundBlock.index}
      ${foundBlock.transaction.amount}
      ${foundBlock.transaction.from}
      ${foundBlock.transaction.to}
      ${foundBlock.previousHash}
      ${foundBlock.nonce}
    `)

    setBlocks(newBlocks)
    handlePreviousHashUpdate(foundIndex)
  }

  const handleHashUpdate = (id: string, newHash: string, newNonce: number) => {
    const foundIndex = blocks.findIndex(block => block.id === id)
    if (foundIndex === -1) return

    const newBlocks = [...blocks]
    const foundBlock = newBlocks[foundIndex]
    foundBlock.hash = newHash
    foundBlock.nonce = newNonce

    setBlocks(newBlocks)
    handlePreviousHashUpdate(foundIndex)
  }

  const handlePreviousHashUpdate = (initialIndex: number) => {
    const newBlocks = [...blocks]
    for (let i = initialIndex; i < blocks.length; i++) {
      if (i == 0) continue
      newBlocks[i].previousHash = newBlocks[i - 1].hash
      newBlocks[i].hash = calculateHash(`
        ${newBlocks[i].index}
        ${newBlocks[i].transaction.amount}
        ${newBlocks[i].transaction.from}
        ${newBlocks[i].transaction.to}
        ${newBlocks[i].previousHash}
        ${newBlocks[i].nonce}
      `)
    }

    setBlocks(newBlocks)
  }

  const handleAddBlock = () => {
    const newBlock = {
      id: uuid(),
      index: blocks.length,
      nonce: 0,
      previousHash: blocks[blocks.length - 1].hash,
      hash: calculateHash(`
        ${0}
        ${0}
        ${'sender'}
        ${'receiver'}
        ${blocks[blocks.length - 1].hash}
        ${0}
      `),
      transaction: { amount: 0, from: '0x00000000', to: '0x00000000' }
    }

    setBlocks([...blocks, newBlock])
  }

  const checkPreviousHash = (index: number) => {
    if (index === 0) {
      return blocks[index].previousHash === "000"
    } else {
      return blocks[index].previousHash === blocks[index - 1].hash
    }
  }

  const isBlockchainValid = () => {
    let valid = true
    for(let i=0; i<blocks.length;i++){
      if(!(checkPreviousHash(i) && isHashValid(blocks[i].hash))){
        valid = false
      }
    }

    return valid
  }

  return (
    <>
      <h1 className={`blockchain-status ${isBlockchainValid() ? 'valid' : 'invalid'}`}>
      {isBlockchainValid() ? 'Valid' : 'Invalid'} Blockchain
      </h1>
      <main className="blockchain-container">
        {
          blocks.map((_, index) => {
            return (
              <section className="blockchain-container__block" key={index}>
                <h2 className="blockchain-container__block-name">Block {index}</h2>
                <Block
                  block={{
                    id: blocks[index].id,
                    index: blocks[index].index,
                    nonce: blocks[index].nonce,
                    hash: blocks[index].hash,
                    previousHash: blocks[index].previousHash,
                    transaction: blocks[index].transaction
                  }}
                  outerSetState={handleBlockUpdate}
                  handleHashUpdate={handleHashUpdate}
                  isPreviousHashValid={checkPreviousHash(index)}
                />
              </section>
            )
          })
        }
        <div className="blockchain-container__button-container">
          <button className="blockchain-container__button" onClick={handleAddBlock}>
            Add new block
          </button>
        </div>
      </main>
    </>
  )
}

export default Blockchain