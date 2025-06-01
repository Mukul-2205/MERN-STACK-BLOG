import { Outlet } from "react-router-dom"
import GradientBackground from "./components/ui/Background/GradientBackground"


function App() {
  return <>
    <>
      <GradientBackground/>
      <div style={{position:'relative',zIndex: 1}}>
        <Outlet/>
      </div>
      
    </>
  </>
}

export default App
