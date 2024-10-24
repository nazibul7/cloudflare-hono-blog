import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="*" element={"404 Not Found"}/>
    </Routes>
  )
}

export default App
