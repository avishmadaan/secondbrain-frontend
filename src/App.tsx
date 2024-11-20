
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/mainComponents/Layout'
import { Homepage } from './components/mainComponents/Homepage'
import { Signup } from './components/mainComponents/Signup'

function App() {


  return (
    <>
    <BrowserRouter>
    
    <Routes>

      <Route path='/' element={<Layout />}>

      <Route index element={<Homepage />} />
      
      </Route>

      <Route path='/signup' element={<Signup />} />

    </Routes>
    
    </BrowserRouter>

     
    </>
  )
}

export default App
