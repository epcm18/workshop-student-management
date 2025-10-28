import './App.css'
import NavBar from './components/NavBar'
import { AllRoutes } from './routes/Allroutes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
     <>
     <BrowserRouter>
      <NavBar/>
      <AllRoutes/>
     </BrowserRouter>
     </>
  )
}

export default App
