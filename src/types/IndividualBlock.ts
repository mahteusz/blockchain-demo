import { BlockType } from "."

type IndividualBlock = Omit<BlockType, "previousHash">

export { type IndividualBlock as default }