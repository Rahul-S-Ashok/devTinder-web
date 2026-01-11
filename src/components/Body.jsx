import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
