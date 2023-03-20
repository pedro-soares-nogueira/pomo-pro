import {
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
  formatISO,
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import SearchForm from '../../components/SearchForm'
import { CyclesContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import PomoManagemant from '../../components/PomoManagemant'

const History = () => {
  const { cycles } = useContext(CyclesContext)

  const cyclesOrderByDate = cycles.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  return (
    <HistoryContainer>
      <PomoManagemant />

      <h1>Meu histórico</h1>

      <SearchForm />

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
