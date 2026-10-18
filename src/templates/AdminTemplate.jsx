import React from 'react'
import Sidebar from '../component/ui/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminTemplate = () => {
  return (
    <div>
      <div className='container'>
      <div className='row'>
        <div className='col-4'>
        <Sidebar/>
        </div>
        <div className='col-8'>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet/>
        </main>
        </div>
      </div>
        
      </div>
    </div>
  )
}

export default AdminTemplate
