import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={"404 Not Found"}/>
    </Routes>
  )
}

export default App
