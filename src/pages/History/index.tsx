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
import { HistoryContainer, HistoryList, Status } from './styles'
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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchProjects = (data: SearchFormInputs) => {
    setFilteredCycles(cycles.filter((cycle) => cycle.task === data.query))
    console.log(filteredCycles)
  }

  const cyclesOrderByDate = filteredCycles.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  return (
    <HistoryContainer>
      <PomoManagemant />

      <h1>Meu histórico</h1>

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
