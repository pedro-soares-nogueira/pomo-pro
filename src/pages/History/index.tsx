import {
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
  formatISO,
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
  
  //ALL TIME TASK
  const totalAtWorkMap = cycles.map((cycle) => {
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
  
  const yesterday = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };
  
  const yesterdayCycles = cycles.filter(cycle => new Date(cycle.startDate).toISOString().split("T")[0] === yesterday())
  
  const yesterdayTotalWorked = yesterdayCycles.map((cycle) => {
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
  const yesterdayTotalAtWorkAmount = yesterdayTotalWorked.reduce((total, cycle) => {
    return total! + cycle!
  }, 0)

  console.log(yesterdayTotalAtWorkAmount)

  //FORMATTED YESTERDAY TIME
  const yesterdayHour = Math.floor(yesterdayTotalAtWorkAmount! / 60)
  const yesterdayMinutes = yesterdayTotalAtWorkAmount! % 60
  const yesterdayHorasFormatted = String(yesterdayHour).padStart(2, '0')
  const yesterdayHinutesFormatted = String(yesterdayMinutes).padStart(2, '0')
      

  //ALL TIME TASK WITHOUT UNDEFINED(ACTIVE CYCLE)
  const totalAtWork = totalAtWorkMap.filter(total => total !== undefined)

  //TOTAL WORKED AMOUNT
  const totalAtWorkAmount = totalAtWork.reduce((total, cycle) => {
    return total! + cycle!
  }, 0)

  //FORMATTED TIME
  const hour = Math.floor(totalAtWorkAmount! / 60)
  const minutes = totalAtWorkAmount! % 60
  const horasFormatted = String(hour).padStart(2, '0')
  const minutesFormatted = String(minutes).padStart(2, '0')

  const cyclesOrderByDate = cycles.sort((a, b) => new Date(a.startDate).getTime()  - new Date(b.startDate).getTime())

  return (
    <HistoryContainer>

      <AmountDetails>
        <DetailsCard>
          <span>{`${yesterdayHorasFormatted}h${yesterdayHinutesFormatted}m`}</span>
          <p>Ontem</p>
        </DetailsCard>
        <DetailsCard>
          <span>{`${horasFormatted}h${minutesFormatted}m`}</span>
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
