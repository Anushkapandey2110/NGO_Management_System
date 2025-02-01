// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// // import './App.css'
// import NavBar from './components/NavBar'
// // import QuestionnaireList from './components/QuestionnaireList'
// import Footer from './components/FooterPage'
// import Router from './routes/Router'
// import { AuthProvider } from './context/AuthContext';
// import { RoleAuthProvider } from './context/RoleAuthContext'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
    
//     <>
//     <AuthProvider>
//       <RoleAuthProvider>
//         <Router />
//       </RoleAuthProvider>
//     </AuthProvider>
//     {/* <QuestionnaireList/>
//     <Footer/> */}
//     </>
//   )
// }

// export default App


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './test'
import MainView from './MainView'
import Login from './component/login'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'
import { AuthProvider } from './context/AuthContext'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
