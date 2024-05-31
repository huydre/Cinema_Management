import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createEmployee, getEmployeeById, updateEmployee } from "../../services/EmployeeServices";

export const EmployeeModal = ({ isOpen, onOpenChange, state, id }) => {
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async () => {
    if (
        formState.uid === null ||
      formState.fullname === null ||
      formState.email === null ||
      formState.phone === null ||
      formState.address === null  ||
        formState.role === null
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (state === "Insert") {
      try {
        const data = {
            uid: formState.uid,
            fullname: formState.fullname,
            email: formState.email,
            phone: formState.phone,
            role: formState.role,
            password: "123456",
            cinemaId: formState.uid.slice(0, 3)
        }
        const res = await createEmployee(data);
        console.log(res);
        if (res.status === "success") {
            toast.success("Thêm nhân viên thành công");
            setFormState({});
        }
        else {
            toast.error("Thêm nhân viên thất bại");
        }
      } catch (error) {
        toast.error("Thêm nhân viên thất bại");
        console.error(error);
      }
    } else {
      try {
        const data = {
            uid: formState.uid,
            fullname: formState.fullname,
            email: formState.email,
            phone: formState.phone,
            role: formState.role,
            cinemaId: formState.uid.slice(0, 3)
        }
        const res = await updateEmployee(id, data);
        if (res.status === "success") {
            toast.success("Cập nhật nhân viên thành công");
            setFormState({});
        }
        else {
            toast.error("Cập nhật nhân viên thất bại");
        }
      } catch (error) {
        toast.error("Cập nhật nhân viên thất bại");
        console.error(error);
      }
    }
  };

  const getEmployeeDetail = async (id) => {
    try {
      const response = await getEmployeeById(id);
      console.log(response);
      setFormState(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state === "Edit") {
      getEmployeeDetail(id);
    }
  }, [id, state]);

  useEffect(() => {
    if (isOpen && state == "Insert") {
      setFormState({});
    }
    if (!isOpen && state == "Edit") {
      setFormState({});
    }
  }, [isOpen, state]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{state}</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                    <Input
                        isDisabled={state === "Edit"}
                        value={formState.uid}
                        isRequired
                        onChange={handleChange}
                        name="uid"
                        label="Mã nhân viên"
                    />
                  <Input
                    value={formState.fullname}
                    isRequired
                    onChange={handleChange}
                    name="fullname"
                    label="Họ tên"
                  />
                  <Input
                    value={formState.email}
                    isRequired
                    onChange={handleChange}
                    name="email"
                    label="Email"
                  />
                  <Input
                    value={formState.phone}
                    isRequired
                    onChange={handleChange}
                    name="phone"
                    label="Số điện thoại"
                  />
                  <Select selectedKeys={[formState.role]} onChange={handleChange} name="role" label="Chức vụ">
                    <SelectItem key="Staff">Nhân Viên</SelectItem>
                    <SelectItem key="Manager">Quản Lý</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button auto onClick={onClose}>
                  Close
                </Button>
                <Button onPress={onClose} auto color="primary" onClick={handleSubmit}>
                  {state === "Insert" ? "Thêm" : "Cập nhật"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
