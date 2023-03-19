import { createContext, ReactNode, useReducer, useState } from "react"
import { ActionTypes, Cycle, cyclesReducer } from "../reduces/cycles"


interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateNewCycleData) => void
  interruptCurrentCycle: () => void
}

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)


export function CycleContextProvider({children}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer, 
    {
      cycles: [],
      activeCycleId: null
    }
  )

  const {activeCycleId, cycles} = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId
      }
    })
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const createNewCycle = (data: CreateNewCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle
      }
    })
    
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId
      }
    })
  }

    return (
        <CyclesContext.Provider
          value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
          }}
        >
            {children}
        </CyclesContext.Provider>
    )
}