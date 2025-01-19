import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import NavBar from './components/NavBar'
// import QuestionnaireList from './components/QuestionnaireList'
import Footer from './components/FooterPage'
import Router from './routes/Router'
import { AuthProvider } from './context/AuthContext';


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <AuthProvider>
      <Router />
    </AuthProvider>
    {/* <QuestionnaireList/>
    <Footer/> */}
    </>
  )
}

export default App
