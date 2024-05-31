import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { getTop3Highest } from "../../services/FilmServices";
import { getRevenueLast30Days, getStatistics } from "../../services/Dashboard";

export const Home = () => {
  const [top, setTop] = useState([]); // top 3 phim doanh thu cao nhất
  const [state, setState] = useState({
    series: [
      {
        name: "Doanh thu",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 450,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  });
  const [statistics, setStatistics] = useState({}); // thống kê

  const handleGetTop3Highest = async () => {
    try {
      const response = await getTop3Highest();
      setTop(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetTop3Highest();
    handleGetStatistics();
    handleGetRevenueLast30Days();
  }, []);

  const data = useSelector((state) => state.data);

  const handleGetStatistics = async () => {
    try {
      const response = await getStatistics();
      setStatistics(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetRevenueLast30Days = async () => {
    try {
      const response = await getRevenueLast30Days();
      console.log(response);
      setState({
        ...state,
        series: [
          {
            data: response?.map((item) => item.TotalRevenue),
          },
        ],
        options: {
          ...state.options,
          xaxis: {
            ...state.options.xaxis,
            categories: response?.map((item) => item.SaleDate),
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`m-4`}>
      <h1 className="text-2xl font-bold mb-8">Thống Kê</h1>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div class="rounded-sm border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 stroke-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>

          <div class="mt-4 flex items-end justify-between">
            <div>
              <h4 class="text-xl font-bold text-black dark:text-white">
                {statistics?.TotalRevenue?.toLocaleString()}đ
              </h4>
              <span class="text-sm font-medium">Tổng Doanh Thu</span>
            </div>

            <span class="flex items-center gap-1 text-sm font-medium text-green-500">
              0.43%
              <svg
                class="fill-green-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div class="rounded-sm border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 stroke-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
          </div>

          <div class="mt-4 flex items-end justify-between">
            <div>
              <h4 class="text-xl font-bold text-black dark:text-white">
                {statistics?.TicketCount}
              </h4>
              <span class="text-sm font-medium">Số Lượng Vé Đã Bán</span>
            </div>

            <span class="flex items-center gap-1 text-sm font-medium text-green-500">
              4.35%
              <svg
                class="fill-green-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div class="rounded-sm border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 stroke-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
              />
            </svg>
          </div>

          <div class="mt-4 flex items-end justify-between">
            <div>
              <h4 class="text-xl font-bold text-black dark:text-white">
                {statistics?.FilmCount}
              </h4>
              <span class="text-sm font-medium">Số Lượng Phim</span>
            </div>

            <span class="flex items-center gap-1 text-sm font-medium text-green-500">
              2.59%
              <svg
                class="fill-green-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div class="rounded-sm border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/50">
            <svg
              class="fill-primary dark:fill-white"
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                fill=""
              ></path>
              <path
                d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                fill=""
              ></path>
              <path
                d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                fill=""
              ></path>
            </svg>
          </div>

          <div class="mt-4 flex items-end justify-between">
            <div>
              <h4 class="text-xl font-bold text-black dark:text-white">
                {statistics?.EmployeeCount}
              </h4>
              <span class="text-sm font-medium">Số Lượng Nhân Viên</span>
            </div>

            <span class="flex items-center gap-1 text-sm font-medium text-red-500">
              0.95%
              <svg
                class="fill-red-500"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 shadow-lg p-2">
        {/* Top phim doanh thu cao nhất */}
        <h1 className="text-xl font-semibold text-foreground">
          Top 3 phim có doanh thu cao nhất tháng
        </h1>
        <div className="mt-4">
          {top &&
            top?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-4 p-2"
              >
                <div className="flex items-center">
                  <img
                    src={item?.FilmPosterPath}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h1 className="text-md font-semibold">{item?.FilmName}</h1>
                  </div>
                </div>
                <h1 className="text-xl font-semibold text-foreground">
                  {item?.TotalRevenue.toLocaleString()}đ
                </h1>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold text-foreground">
          Doanh Thu 30 Ngày Gần Nhất
        </h1>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};
