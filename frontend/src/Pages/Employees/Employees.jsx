import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { deleteEmployee, getEmployees } from "../../services/EmployeeServices";
import axios from "axios";
import {
  Button,
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { EditIcon } from "../../assets/EditIcon";
import { DeleteIcon } from "../../assets/DeleteIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import { PlusIcon } from "../../assets/PlusIcon";
import { useSelector } from 'react-redux';
import { EmployeeModal } from "../../Components/Employee/EmployeeModal";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalState, setModalState] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const data = useSelector(state => state.data);
  const user = useSelector(state => state.user);

  const rowsPerPage = 10;

  const pages = Math.ceil(employees.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return employees.slice(start, end);
  }, [page, employees]);

  const fetchEmployees = async () => {
    const response = await getEmployees(data);
    setEmployees(response);
  };

  useEffect(() => {
    fetchEmployees();
  }, [isOpen]);

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" min-h-screen md:flex">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div
        className={`w-full min-h-screen mx-0  transition-all duration-300 ease-in-out`}
      >
        <div className="m-4 space-y-4">
          <h1 className="font-bold text-2xl">Quản Lý Nhân Viên</h1>
          <div className="flex items-center justify-between">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon/>}
            />
            <Button onPress={onOpen} onClick={() => setModalState("Insert")} isDisabled={user?.TENNHOM === "NHANVIEN"} color="primary" endContent={<PlusIcon/>}>
              Add New
            </Button>
          </div>
          <p className="text-default-400 text-small">
            Total <span>{employees.length}</span> Nhân Viên
          </p>
          <EmployeeModal isOpen={isOpen} onOpenChange={onOpenChange} state={modalState} id={employeeId}/>
          <Table
            selectionMode="single"
            data={employees}
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn>ID Nhân Viên</TableColumn>
              <TableColumn>Họ Tên</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>SDT</TableColumn>
              <TableColumn>Chức Vụ</TableColumn>
              <TableColumn>Chi Nhánh</TableColumn>
              <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"No rows to display."}>
              {items.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.uid}</TableCell>
                  <TableCell>{employee.fullname}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={employee.role == "Staff" ? "primary" : "danger"}
                    >
                      {employee.role == "Staff" ? "Nhân viên" : "Quản Lý"}
                    </Chip>
                  </TableCell>
                  <TableCell>{employee.cinemaId}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip isDisabled={user?.TENNHOM === "NHANVIEN"} content="Chỉnh sửa nhân viên">
                        <Button isIconOnly
                          variant="light"
                          onPress={onOpen}
                          onClick={() => {
                            setModalState("Edit");
                            setEmployeeId(employee.uid);
                          }}>
                          <span className={`text-lg text-default-400  active:opacity-50 ${user?.TENNHOM === "NHANVIEN" ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}>
                            <EditIcon />
                          </span>
                        </Button>
                        
                      </Tooltip>
                      <Tooltip isDisabled={user?.TENNHOM === "NHANVIEN"} content="Xóa nhân viên">
                        <span onClick={() => handleDeleteEmployee(employee.uid)} className={`text-lg text-danger  active:opacity-50 ${user?.TENNHOM === "NHANVIEN" ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}>
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
