import React, {useEffect, useState} from 'react'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { getEmployees } from '../../services/EmployeeServices'
import axios from 'axios'

export const Employees = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await getEmployees()
            setEmployees(response)
        }
        fetchEmployees()
    }, [])

    console.log(employees)
    
  return (
    <div className=" min-h-screen md:flex">
      <div className='w-3/12'>
        <Sidebar/>
      </div>
      <div className={`w-full min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out`}>
          
      </div>
    </div>
  )
}
