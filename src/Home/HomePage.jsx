import React from 'react'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import Hospital from './Home/Hospital'
import MedNavbar from '../Patients/PatComponents/MedNavbar'
import ServicesGrid from '../Patients/PatComponents/ServicesGrid'
import UIDepartments from '../Patients/PatComponents/UIDepartments'
import Footer from '../Patients/PatComponents/Footer'






const HomePage = () => {
  return (
    <div>
         <MedNavbar/>
        <Home />
       
        <ServicesGrid />
        <UIDepartments />
        <Footer />
        {/* <Hospital/> */}
        
        
    </div>
  )
}

export default HomePage