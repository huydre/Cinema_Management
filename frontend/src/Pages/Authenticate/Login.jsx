import React, { useState, useEffect } from "react";
import { getDSPM } from "../../services/Authentication";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

import { EyeFilledIcon } from "../../assets/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon ";
import { useDispatch } from 'react-redux';
import { updateData } from '../../redux/action/action';
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../services/Authentication";
import toast, { Toaster } from 'react-hot-toast';




const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [dspm, setDSPM] = useState([]);
  const [selectedChiNhanh, setSelectedChiNhanh] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getDanhSachPhanManh = async () => {
    try {
      const response = await getDSPM();
      setDSPM(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDanhSachPhanManh();
  }, []);

  const handleSignIn = async() => {
    try {
      const data = {
        USERNAME: username,
        PASSWORD: password,
        SERVERNAME: selectedChiNhanh,
      };
      const res = await checkLogin(data);
      console.log(res)
      if (res) {
        toast.success('Đăng nhập thành công');
        dispatch(updateData(data));
        navigate("/");
      }
      else {
        toast.error('Đăng nhập thất bại, hãy kiểm tra lại thông tin');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="flex items-center justify-center"
    >
      <div className="flex h-screen w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <h2 className="text-2xl font-semibold">Đăng nhập👋</h2>
          <form className="flex flex-col gap-3">
            <Select onChange={(e) => setSelectedChiNhanh(e.target.value)} label="Chọn chi nhánh" className="max-w-xs">
              {dspm.map((item, index) => (
                <SelectItem key={item.TENSERVER}>{item.TENCN}</SelectItem>
              ))}
              <SelectItem key="DESKTOP-ENIOI3O\CINEMA_N19">Trụ sở Hà Nội</SelectItem>
            </Select>
            <Input
                value={username}
                onValueChange={setUsername}
              type="text"
              variant="bordered"
              label="Tên Đăng Nhập"
            />
            <Input
                value={password}
                onValueChange={setPassword}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              variant="bordered"
              label="Mật khẩu"
            />
            <div className="flex justify-between items-center">
              <Checkbox size="sm" defaultSelected>
                Nhớ mật khẩu
              </Checkbox>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Quên mật khẩu?
              </a>
            </div>

            <Button
              onClick={handleSignIn}
              color="primary"
              variant="solid"
              fullWidth
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
