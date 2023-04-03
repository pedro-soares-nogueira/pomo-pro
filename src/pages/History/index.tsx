import {
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
  formatISO,
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext, useState } from 'react'
import { z } from 'zod'
import { CyclesContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryHeader, HistoryList, Status } from './styles'
import PomoManagemant from '../../components/PomoManagemant'
import { SearchFormContainer } from '../../components/SearchForm/styled'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { Cycle } from '../../reduces/cycles/reducer'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

const History = () => {
  const { cycles } = useContext(CyclesContext)
  const [filteredCycles, setFilteredCycles] = useState<Cycle[]>(cycles)
  const [showSearchMetrics, setShowSearchMetrics] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchProjects = (data: SearchFormInputs) => {
    setShowSearchMetrics(true)
    setFilteredCycles(cycles.filter((cycle) => cycle.task === data.query))
  }

  const cyclesOrderByDate = filteredCycles.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  /* Project Management */

  //ALL TIME TASK
  const totalAtWorkMap = filteredCycles.map((cycle) => {
    if (cycle.interruptedDate) {
      return differenceInMinutes(
        new Date(cycle.interruptedDate),
        new Date(cycle.startDate)
      )
    }
    if (cycle.finishedDate) {
      return differenceInMinutes(
        new Date(cycle.finishedDate),
        new Date(cycle.startDate)
      )
    }
  })

  //ALL TIME TASK WITHOUT UNDEFINED(ACTIVE CYCLE)
  const totalAtWork = totalAtWorkMap.filter((total) => total !== undefined)

  //TOTAL WORKED AMOUNT
  const totalAtWorkAmount = totalAtWork.reduce((total, cycle) => {
    return total! + cycle!
  }, 0)

  //FORMATTED TIME
  const hour = Math.floor(totalAtWorkAmount! / 60)
  const minutes = totalAtWorkAmount! % 60
  const horasFormatted = String(hour).padStart(2, '0')
  const minutesFormatted = String(minutes).padStart(2, '0')

  return (
    <HistoryContainer>
      <PomoManagemant />

      <HistoryHeader>
        <h1>Meu histórico</h1>
        {showSearchMetrics &&
          <span>* Total de horas projeto: {`${horasFormatted}h ${minutesFormatted}m`}</span>
        }
      </HistoryHeader>

      <SearchFormContainer onSubmit={handleSubmit(handleSearchProjects)}>
        <input
          type="text"
          placeholder="Buscque por transações"
          {...register('query')}
        />
        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      </SearchFormContainer>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Quando</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cyclesOrderByDate.reverse().map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export default History

/* 




*/
