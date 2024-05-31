import React, { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Select,
  DatePicker,
  CheckboxGroup,
  SelectItem
} from "@nextui-org/react";
import { PlusIcon } from "../../assets/PlusIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import { getSchedules } from "../../services/ScheduleServives";
import { CustomCheckbox } from "../../Components/CustomCheckBox";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import { getRooms } from "../../services/RoomServices";
import { getFilms } from "../../services/FilmServices";
import { createSchedule } from "../../services/ScheduleServives";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(parseDate("2024-06-01"));
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedFilm, setSelectedFilm] = useState();
  const [rooms, setRooms] = useState([]);
  const [films, setFilms] = useState([]);
  const user = useSelector(state => state.user);


  const fetchSchedule = async () => {
    try {
      const response = await getSchedules();
      const room = await getRooms();
      const film = await getFilms();
      setRooms(room);
      setSchedule(response);
      setFilms(film);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const convertSchedule = (start, end) => {
    return `${start.slice(11, 16)} - ${end.slice(11, 16)}`;
  };

  const getDate = (date) => {
    return date.slice(0, 10);
  };

  const formatDate = (date) => {
    const year = date.year;
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const checkTimeSchedule = (startTime, endTime, date) => {
    if (!selectedRoom) return false;
    return schedule.some((item) => {
      const start = item.StartTime.slice(11, 16);
      const end = item.EndTime.slice(11, 16);
      const scheduleDate = item.StartTime.slice(0, 10);
      const scheduleRoom = item.RoomId;
      // console.log(start == startTime, end == endTime, scheduleDate == formatDate(date), scheduleRoom, selectedRoom);
      if (start == startTime && end == endTime && scheduleDate == formatDate(date) && scheduleRoom == selectedRoom) {
        return true;
      }
    });
  }

  const handleInsert = async() => {
    try {
      const data = {
        StartTime: selectedDate + "T" + selectedTime[0].slice(0, 5).trim() + ":00.000Z",
        EndTime: selectedDate + "T" + selectedTime[0].slice(7, 13).trim() + ":00.000Z",
        FilmID: selectedFilm,
        RoomID: selectedRoom,
      };
      await createSchedule(data);
      console.log(data);
      toast.success("Thêm lịch thành công");
      setSelectedDate(parseDate("2024-06-01"));
      setSelectedRoom();
      setSelectedFilm();
      setSelectedTime([]);
      fetchSchedule();
    } catch (error) {
      toast.error("Thêm lịch thất bại");
    }
    
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
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>

          <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Thêm Lịch Mới
                  </ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Select label="Chọn Phòng" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                        {
                          rooms.map((item, index) => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                          ))
                        }
                      </Select>
                      <Select label="Chọn Phim" value={selectedFilm} onChange={(e) => setSelectedFilm(e.target.value)}>
                        {
                          films.map((item, index) => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                          ))
                        }
                      </Select>

                      <CheckboxGroup
                        className="gap-1"
                        label="Chọn khung giờ"
                        orientation="horizontal"
                        value={selectedTime}
                        onChange={setSelectedTime}
                      >
                        <CustomCheckbox isDisabled={checkTimeSchedule("09:00", "12:00",selectedDate)} value="09:00 - 12:00">09:00 - 12:00</CustomCheckbox>
                        <CustomCheckbox isDisabled={checkTimeSchedule("12:00", "15:00",selectedDate)} value="12:00 - 15:00">12:00 - 15:00</CustomCheckbox>
                        <CustomCheckbox isDisabled={checkTimeSchedule("15:00", "18:00",selectedDate)} value='15:00 - 18:00'>15:00 - 18:00</CustomCheckbox>
                        <CustomCheckbox isDisabled={checkTimeSchedule("18:00", "21:00",selectedDate)} value='18:00 - 21:00'>18:00 - 21:00</CustomCheckbox>
                        <CustomCheckbox isDisabled={checkTimeSchedule("21:00", "24:00",selectedDate)} value='21:00 - 24:00'>21:00 - 24:00</CustomCheckbox>
                      </CheckboxGroup>

                      <DatePicker value={selectedDate} onChange={setSelectedDate} label="Chọn ngày" />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button onClick={() => handleInsert()} color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Table>
            <TableHeader>
              <TableColumn>Phòng</TableColumn>
              <TableColumn>Phim</TableColumn>
              <TableColumn>Lịch</TableColumn>
              <TableColumn>Ngày</TableColumn>
              {
                
              }
            </TableHeader>
            <TableBody items={schedule}>
              {schedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.RoomName}</TableCell>
                  <TableCell>{item.FilmName}</TableCell>
                  <TableCell>
                    {convertSchedule(item.StartTime, item.EndTime)}
                  </TableCell>
                  <TableCell>{getDate(item.StartTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
