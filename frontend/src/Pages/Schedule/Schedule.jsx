import React, {useState,  useEffect} from 'react'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { PlusIcon } from '../../assets/PlusIcon'
import { SearchIcon } from '../../assets/SearchIcon'
import { getSchedules } from '../../services/ScheduleServives'

const Schedule = () => {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await getSchedules()
        setSchedule(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSchedule()
  }, [])

  const convertSchedule = (start, end) => {
    //EndTime "2024-05-15T13:00:00.000Z"
    return `${start.slice(11, 16)} - ${end.slice(11, 16)}`
  }

  const getDate = (date) => {
    //EndTime "2024-05-15T13:00:00.000Z"
    return date.slice(0, 10)
  }

  console.log(schedule)

  return (
    <div className=" min-h-screen md:flex">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div
        className={`w-full min-h-screen mx-0 bg-white transition-all duration-300 ease-in-out`}
      >
        <div className="m-4 space-y-4">
          <h1 className="font-bold text-2xl">Quản Lý Lịch Phát</h1>
          <div className="flex items-center justify-between">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
            />
            <Button
              color="primary"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableColumn>Phòng</TableColumn>
              <TableColumn>Phim</TableColumn>
              <TableColumn>Lịch</TableColumn>
              <TableColumn>Ngày</TableColumn>
            </TableHeader>
            <TableBody items={schedule}>
              {
                schedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.RoomName}</TableCell>
                    <TableCell>{item.FilmName}</TableCell>
                    <TableCell>{convertSchedule(item.StartTime, item.EndTime)}</TableCell>
                    <TableCell>{getDate(item.StartTime)}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>

        </div>
      </div>
    </div>
  )
}

export default Schedule