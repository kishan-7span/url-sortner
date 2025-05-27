import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UrlShortenerHome from './components/url-shortner-home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UrlShortenerHome/>
       
    </>
  )
}

export default App
