import styled from 'styled-components'

export const AmountDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 2rem;
`

export const DetailsCard = styled.div`
  background-color: ${(props) => props.theme['gray-600']};
  padding: 1rem;
  width: 12rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    display: block;
  }
`

export const ManageCard = styled(DetailsCard)`
  span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`

export const TodayCard = styled(DetailsCard)`
  p {
    font-weight: 700;
  }

  span {
    font-size: 2rem;
    font-weight: 700;
  }
`
