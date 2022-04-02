import { useReducer } from 'react'

type RouteState = {
  route: string
}

type RouteAction = {
  type: 'current-route'
  payload?: string
}

const initialState = { route: window.location.href }

function reducer(state: RouteState, action: RouteAction) {
  switch (action.type) {
    case 'current-route':
      const currebtRoute = window.location.href
      return { route: currebtRoute }

    default:
      throw new Error()
  }
}

const RouteService = () => {
  const [val, set] = useReducer(reducer, initialState)
  return { val, set }
}

export default RouteService
