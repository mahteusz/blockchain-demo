import { Dispatch } from "react"

export const inputHandlerNumber = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setFunction: Dispatch<React.SetStateAction<number>>) => {
  const newValue = event.target.value
  if (isNaN(Number(newValue)))
    return

  setFunction(Number(newValue))
}

export const inputHandlerString = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setFunction: Dispatch<React.SetStateAction<string>>) => {
  const newValue = event.target.value
  setFunction(newValue)
}