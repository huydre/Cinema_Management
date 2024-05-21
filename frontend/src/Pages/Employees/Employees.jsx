import React, {useEffect, useState} from 'react'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { getEmployees, fetchData } from '../../services/EmployeeServices'
import axios from 'axios'

export const Employees = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const getData = () => {
            axios.get('http://localhost:5293/WeatherForecast')
            .then(response => {
                console.log(response.data)
                setEmployees(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        }
        getData()
    }, [])

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
