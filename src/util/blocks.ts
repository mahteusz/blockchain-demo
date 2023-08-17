import Crypto from 'crypto-js'

const DIFFICULTY = 4

export const isHashValid = (hash: string) => {
  return hash.substring(0, DIFFICULTY) == Array(DIFFICULTY + 1).join("0")
}

export const calculateHash = (data: string) => {
  data = data.replace(/\s/g, '')
  const dataToSha256 = Crypto.SHA256(data).toString()
  return dataToSha256
}

export const mine = (initialHash: string, initialNonce: number, dataWithoutNonce: string) => {
  let newHash = initialHash
  let newNonce = initialNonce
  while (!isHashValid(newHash)) {
    newNonce++
    newHash = calculateHash(dataWithoutNonce+newNonce)
  }

  return {
    newHash,
    newNonce
  }
}