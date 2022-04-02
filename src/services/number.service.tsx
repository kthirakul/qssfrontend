import { useReducer } from 'react'

type NumberState = {
  count: number
}

type NumberAction = {
  type: 'increment' | 'decrement'
  payload?: number
}

const initialState = { count: 0 }

function reducer(state: NumberState, action: NumberAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const NumberService = () => {
  const [val, set] = useReducer(reducer, initialState)
  return { val, set }
}

export default NumberService
