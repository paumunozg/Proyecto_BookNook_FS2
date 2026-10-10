import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/Header'
import Catalogo from './components/Catalogo'

function App() {
  return(
    
    <div>
      <h1>Catalogo de productos</h1>
      <Catalogo/>
    </div>
  )

}

export default App
