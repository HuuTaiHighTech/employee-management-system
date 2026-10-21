import React from 'react'
import Sidebar from '../component/ui/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminTemplate = () => {
  return (
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <Sidebar />
          </div>
          <div className='col-9'>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
    </div>
  )
}

export default AdminTemplate
