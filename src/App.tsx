import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Collection from "./pages/Collection"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Product from "./pages/Product"
import Footer from "./pages/Footer"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import React from "react"
import { Search } from "./pages/Search"
import PlaceOrder from "./pages/PlaceOrder"
function App() {
 

  return (
  <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Navbar/>
    <Search/>
    <Routes>
      
      <Route path="/" element={<Home/>}></Route>
      <Route path="/collections" element={<Collection/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/product/:id" element={<Product/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/placeorder" element={<PlaceOrder/>}></Route>
    </Routes>
    <Footer/>
  </div>
  )
}

export default App
