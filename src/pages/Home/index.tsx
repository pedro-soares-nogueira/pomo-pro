import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createContext, useContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import NewCycleForm from '../../components/NewCycleForm'
import CountDown from '../../components/CountDown'
import { CyclesContext } from '../../contexts/CycleContext'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.'),
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

const Home = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisable = !task

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }
  const handleInterruptCycle = () => {
    interruptCurrentCycle()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

export default Home
