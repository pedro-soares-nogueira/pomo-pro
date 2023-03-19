import { Route, Routes } from 'react-router-dom'
import History from '../pages/History'
import Home from '../pages/Home'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

export default Router
