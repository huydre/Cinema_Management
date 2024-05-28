import React, { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import {
  Button,
  Chip,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from "../../assets/SearchIcon";
import { PlusIcon } from "../../assets/PlusIcon";
import { getFilms } from "../../services/FilmServices";
import { getScheduleByFilmId } from "../../services/ScheduleServives";
import { getSeatsByRoomAndSchedule } from "../../services/SeatServices";
import { purchaseTicket } from "../../services/TicketServices";
import toast, { Toaster } from 'react-hot-toast';

export const Ticket = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState("Chọn khung giờ");
  const [films, setFilms] = useState([]);
  const [seat, setSeat] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 9;

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getFilms();
        setFilms(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilms();
  }, []);

  const getFilmSchedule = async (id) => {
    try {
      const response = await getScheduleByFilmId(id);
      setSchedules(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedFilm) {
      getFilmSchedule(selectedFilm.id);
    }
  }, [selectedFilm]);

  const handleGetSeatByRoomAndSchedule = async (req) => {
    try {
      const response = await getSeatsByRoomAndSchedule(req);
      setSeat(response);
    } catch (error) {
      console.error(error);
    }
  };

  const convertDuration = (duration) => {
    if (!duration) return;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleChooseFilm = (film) => {
    setSelectedFilm(film);
    setState("Chọn khung giờ");
    onOpen();
  };

  const handleChooseSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    handleGetSeatByRoomAndSchedule({
      roomId: schedule.RoomId,
      scheduleId: schedule.ScheduleId,
    });
    setState("Chọn ghế");
  };

  const convertTime = (start, end) => {
    return `${start.slice(11, 16)} - ${end.slice(11, 16)}`;
  };

  const handleCheckSelectedSeat = (number, row) => {
    if (seat.length === 0) return "ok";
    return seat[0].some(item => item.SeatNumber == number.toString() && item.SeatRow == row);
  };

  const handleSelectSeat = (number, row) => {
    setSelectedSeat({ number, row });
    setState("Xác nhận thông tin");
  };

  const handlePurchaseTicket = async () => {
    const ticket = {
      filmId: selectedFilm.id,
      scheduleId: selectedSchedule.ScheduleId,
      seatNumber: selectedSeat.number.toString(),
      seatRow: selectedSeat.row,
      roomId: selectedSchedule.RoomId,
      price: 50000,
      employeeId: "CN1NV01",
    };
    try {
      await purchaseTicket(ticket);
      toast.success('Đặt vé thành công');
      console.log(ticket);
    } catch (error) {
      console.error(error);
      toast.error('Đặt vé thất bại');
    }
    
  };

  return (
    <div className=" min-h-screen md:flex">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div
        className={`w-full min-h-screen mx-0 bg-white transition-all duration-300 ease-in-out`}
      >
        <div className="m-4 space-y-4">
          <h1 className="font-bold text-2xl">Mua Vé</h1>

          <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2>{state}</h2>
                  </ModalHeader>
                  <ModalBody>
                    {state === "Chọn khung giờ" && (
                      <>
                        <div className="flex gap-4">
                          <Image
                            src={selectedFilm.posterPath}
                            alt={selectedFilm.name}
                          />
                          <div className="w-[99%] space-y-4">
                            <h2 className="text-3xl font-semibold mb-2">
                              {selectedFilm.name}
                            </h2>
                            <p>{selectedFilm.overview}</p>
                            <p>
                              Thời lượng:{" "}
                              {convertDuration(selectedFilm.duration)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 mt-4">
                          {schedules.length ? (
                            schedules.map((schedule) => (
                              <div>
                                <Button
                                  onClick={() => handleChooseSchedule(schedule)}
                                  size="sm"
                                  radius="full"
                                  color="primary"
                                  variant="bordered"
                                >
                                  {convertTime(
                                    schedule.StartTime,
                                    schedule.EndTime
                                  )}
                                </Button>
                              </div>
                            ))
                          ) : (
                            <div>
                              <p>Không có lịch chiếu</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {state === "Chọn ghế" && (
                      <div>
                        <p>{selectedSchedule.RoomName}</p>
                        <div className="flex justify-center">
                          <svg
                            width="365"
                            height="87"
                            viewBox="0 0 365 87"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.1"
                              d="M20 67V67C123.735 24.0857 241.164 24.3303 345 67V67"
                              stroke="black"
                            />
                            <g opacity="0.4" filter="url(#filter0_f_80_819)">
                              <path
                                d="M20 67L36.1169 62.0742C130.164 33.3308 230.6 32.9593 324.857 61.0064L345 67"
                                stroke="black"
                              />
                            </g>
                            <path
                              opacity="0.3"
                              d="M168.736 67.899C168.736 68.5883 168.483 69.142 167.977 69.56C167.464 69.9707 166.84 70.176 166.107 70.176C165.454 70.176 164.879 69.9853 164.38 69.604C163.881 69.2227 163.537 68.702 163.346 68.042L164.314 67.646C164.38 67.8807 164.472 68.0933 164.589 68.284C164.706 68.4747 164.842 68.6397 164.996 68.779C165.157 68.911 165.333 69.0173 165.524 69.098C165.715 69.1713 165.916 69.208 166.129 69.208C166.591 69.208 166.969 69.0907 167.262 68.856C167.555 68.614 167.702 68.295 167.702 67.899C167.702 67.569 167.581 67.2867 167.339 67.052C167.112 66.8247 166.686 66.6047 166.063 66.392C165.432 66.1647 165.04 66.0107 164.886 65.93C164.05 65.5047 163.632 64.8777 163.632 64.049C163.632 63.4697 163.863 62.9747 164.325 62.564C164.794 62.1533 165.37 61.948 166.052 61.948C166.653 61.948 167.174 62.102 167.614 62.41C168.054 62.7107 168.347 63.0883 168.494 63.543L167.548 63.939C167.46 63.6457 167.284 63.4037 167.02 63.213C166.763 63.015 166.448 62.916 166.074 62.916C165.678 62.916 165.344 63.026 165.073 63.246C164.802 63.4513 164.666 63.719 164.666 64.049C164.666 64.3203 164.772 64.555 164.985 64.753C165.22 64.951 165.729 65.1857 166.514 65.457C167.313 65.7283 167.882 66.062 168.219 66.458C168.564 66.8467 168.736 67.327 168.736 67.899ZM173.421 70.176C172.255 70.176 171.28 69.7837 170.495 68.999C169.718 68.2143 169.329 67.2353 169.329 66.062C169.329 64.8887 169.718 63.9133 170.495 63.136C171.272 62.344 172.248 61.948 173.421 61.948C174.609 61.948 175.573 62.377 176.314 63.235L175.588 63.939C175.023 63.257 174.301 62.916 173.421 62.916C172.548 62.916 171.819 63.2093 171.232 63.796C170.653 64.3753 170.363 65.1307 170.363 66.062C170.363 66.9933 170.653 67.7487 171.232 68.328C171.819 68.9147 172.548 69.208 173.421 69.208C174.338 69.208 175.133 68.823 175.808 68.053L176.545 68.768C176.171 69.2153 175.713 69.5637 175.17 69.813C174.627 70.055 174.044 70.176 173.421 70.176ZM178.5 63.092V65.864H180.128C180.538 65.864 180.887 65.732 181.173 65.468C181.459 65.1967 181.602 64.863 181.602 64.467C181.602 64.1003 181.466 63.7813 181.195 63.51C180.931 63.2313 180.597 63.092 180.194 63.092H178.5ZM178.5 70H177.488V62.124H180.172C180.854 62.124 181.433 62.3513 181.91 62.806C182.394 63.2533 182.636 63.807 182.636 64.467C182.636 65.0097 182.456 65.4937 182.097 65.919C181.745 66.337 181.297 66.6047 180.755 66.722L180.733 66.755L182.944 69.956V70H181.745L179.622 66.81H178.5V70ZM188.205 62.124V63.092H184.619V65.589H187.853V66.535H184.619V69.032H188.205V70H183.607V62.124H188.205ZM193.927 62.124V63.092H190.341V65.589H193.575V66.535H190.341V69.032H193.927V70H189.329V62.124H193.927ZM196.063 70H195.051V62.124H196.283L200.111 68.251H200.155L200.111 66.733V62.124H201.123V70H200.067L196.063 63.576H196.019L196.063 65.094V70Z"
                              fill="black"
                            />
                            <defs>
                              <filter
                                id="filter0_f_80_819"
                                x="0.853882"
                                y="20.7402"
                                width="363.289"
                                height="65.7388"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="BackgroundImageFix"
                                  result="shape"
                                />
                                <feGaussianBlur
                                  stdDeviation="9.5"
                                  result="effect1_foregroundBlur_80_819"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </div>

                        <div className="flex justify-center mt-10">
                          <div className="">
                            {rows.map((row, rowIndex) => (
                              <div key={rowIndex} className="flex items-center">
                                <div className="w-10">{row}</div>
                                {Array.from(
                                  { length: seatsPerRow },
                                  (_, seatIndex) => (
                                    <div
                                    onClick={() => handleSelectSeat(seatIndex + 1, row)}
                                      className={`m-2 w-10 h-10 p-2 rounded-md text-center text-white  ${
                                        handleCheckSelectedSeat(
                                          seatIndex + 1,
                                          row
                                        )
                                          ? "bg-gray-800 cursor-not-allowed"
                                          : "bg-gray-400 cursor-pointer hover:bg-blue-500"
                                      }`}
                                      key={seatIndex}
                                    >
                                      {row + (seatIndex + 1)}
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-4 justify-center mt-5">
                          <div className="flex space-x-2 items-center">
                            <div className="m-2 w-8 h-8 bg-gray-400 p-2 rounded-md text-center text-white" />
                            <p>Ghế Thường</p>
                          </div>
                          <div className="flex space-x-2 items-center">
                            <div className="m-2 w-8 h-8 bg-gray-800 p-2 rounded-md text-center text-white" />
                            <p>Ghế Đã Đặt</p>
                          </div>
                          <div className="flex space-x-2 items-center">
                            <div className="m-2 w-8 h-8 bg-blue-500 p-2 rounded-md text-center text-white" />
                            <p>Ghế Được Chọn</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {
                      state === "Xác nhận thông tin" && (
                        <div className="flex gap-8">
                          <div>
                            <Image width={300} src={selectedFilm.posterPath} alt={selectedFilm.name} />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="text-xl">{selectedFilm.name}</p>
                              <p className="font-semibold">
                                {selectedSchedule.StartTime.slice(0, 10)}
                                <span className="mx-2">|</span>
                                {convertTime(selectedSchedule.StartTime, selectedSchedule.EndTime)}
                              </p>
                              <p>Phòng Chiếu: {selectedSchedule.RoomName}</p>
                              <p>Ghế: {selectedSeat.row + selectedSeat.number}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Tạm tính: 50.000đ</p>
                                
                            </div>
                          </div>
                          
                        </div>
                      )
                    }
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    {
                      state === "Xác nhận thông tin" && (
                        <Button color="primary" onClick={() => handlePurchaseTicket()} onPress={onClose}>
                          Xác nhận
                        </Button>
                      )
                    }
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <div className="grid grid-cols-4 pt-8">
            {films.map((film) => (
              <div
                onClick={() => handleChooseFilm(film)}
                className="relative p-4 shadow-lg "
              >
                <img src={film.posterPath} alt={film.name} />
                {/* <div className="absolute z-20 left-0 bottom-4 p-2 font-medium ml-4 mr-2 bg-black/20 text-white backdrop-blur-sm rounded-lg w-[calc(100%-32px)]">
                  <h2>{film.name}</h2>
                  <p className="">{convertDuration(film.duration)}</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
