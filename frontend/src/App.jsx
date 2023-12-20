import { useState } from 'react'
import styled from 'styled-components'


import { BrowserRouter , Route , Routes} from 'react-router-dom'

import Login from './pages/Login'
import { Home } from './pages/Home'
import Register from './pages/Register'

const Container = styled.div``


function App() {
 

  return (
    
     <Container>
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      </BrowserRouter>
     </Container>
    
  )
}

export default App
