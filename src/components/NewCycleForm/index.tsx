import React, { useContext } from 'react'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../contexts/CycleContext'

const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Projeto:</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome ao projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <label htmlFor="minutesAmount">Tempo em minutos:</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        step={5}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
    </FormContainer>
  )
}

export default NewCycleForm
