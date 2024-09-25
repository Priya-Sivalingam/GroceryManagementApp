import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'

function App () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Dashboard/>}></Route>
      <Route path = "/Signup" element={<Signup/>}></Route>
      <Route path = "/Signin" element ={<Signin/>}></Route>
      <Route path = "/forgetPassword" element ={<ForgetPassword/>}></Route>
      <Route path = "/reset-password/:token" element ={<ResetPassword/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App