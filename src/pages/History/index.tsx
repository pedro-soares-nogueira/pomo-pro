import {
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import {
  AmountDetails,
  DetailsCard,
  HistoryContainer,
  HistoryList,
  Status,
} from './styles'

const History = () => {
  const { cycles } = useContext(CyclesContext)

  const totalAtWork = cycles.map((cycle) => {
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

  const totalAtWorkAmount = totalAtWork.reduce((total, cycle) => {
    return total! + cycle!
  }, 0)

  const hour = Math.floor(totalAtWorkAmount! / 60)
  const minutes = totalAtWorkAmount! % 60
  const horasFormatted = String(hour).padStart(2, '0')
  const minutesFormatted = String(minutes).padStart(2, '0')

  console.log(horasFormatted + ':' + minutesFormatted)

  return (
    <HistoryContainer>
      <AmountDetails>
        <DetailsCard>
          <span>2h 21m</span>
          <p>Ontem</p>
        </DetailsCard>
        <DetailsCard>
          <span>{horasFormatted + ':' + minutesFormatted}</span>
          <p>Hoje</p>
        </DetailsCard>
      </AmountDetails>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Duração</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
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
