import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Collection from "./pages/Collection"
import Navbar from "./components/Navbar"
import About from "./pages/About"
function App() {
 

  return (
  <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Navbar/>
    <Routes>
      
      <Route path="/" element={<Home/>}></Route>
      <Route path="/collections" element={<Collection/>}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>
  </div>
  )
}

export default App
