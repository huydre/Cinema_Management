import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { PlusIcon } from "../../assets/PlusIcon";
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
  Avatar,
  Tooltip,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { SearchIcon } from "../../assets/SearchIcon";
import { getFilms, deleteFilm } from "../../services/FilmServices";
import { EditIcon } from "../../assets/EditIcon";
import { DeleteIcon } from "../../assets/DeleteIcon";
import toast from "react-hot-toast";
import { FilmsModal } from "../../Components/Films/FilmsModal";

export const Films = () => {
  const [films, setFilms] = useState([]);
  const [modalState, setModalState] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filmId, setFilmId] = useState("");

  const fetchFilms = async () => {
    const response = await getFilms();
    setFilms(response);
  };

  useEffect(() => {
    fetchFilms();
  }, [isOpen]);

  const convertDuration = (duration) => {
    if (!duration) return;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleDeleteFilm = async (id) => {
    try {
      await deleteFilm(id);
      fetchFilms();
      toast.success("Xóa phim thành công");
    } catch (error) {
      console.error(error);
      toast.error("Xóa phim thất bại");
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
          <h1 className="font-bold text-2xl">Quản Lý Phim</h1>
          <div className="flex items-center justify-between">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
            />
            <Button
              onPress={onOpen}
              onClick={() => setModalState("Insert")}
              color="primary"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
          <p className="text-default-400 text-small">
            Total <span>{films.length}</span> phim
          </p>
          <FilmsModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            state={modalState}
            id={filmId}
          />
          <Table>
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Tên</TableColumn>
              <TableColumn>Hình Ảnh</TableColumn>
              <TableColumn>Nước Sản Xuất</TableColumn>
              <TableColumn>Mô Tả</TableColumn>
              <TableColumn>Thời Lượng</TableColumn>
              <TableColumn>Thao Tác</TableColumn>
            </TableHeader>
            <TableBody
              items={films}
              emptyContent={"Chưa có phim nào, vui lòng thêm phim"}
            >
              {films?.map((films) => (
                <TableRow key={films.id}>
                  <TableCell>{films.id}</TableCell>
                  <TableCell>{films.name}</TableCell>
                  <TableCell>
                    <Avatar size="lg" radius="sm" src={films.posterPath} />
                  </TableCell>
                  <TableCell>{films.country}</TableCell>
                  <TableCell>
                    <p className="line-clamp-2 max-w-md">{films.overview}</p>
                  </TableCell>
                  <TableCell>{convertDuration(films.duration)}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Chỉnh sửa phim">
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={onOpen}
                          onClick={() => {
                            setModalState("Edit");
                            setFilmId(films.id);
                          }}
                        >
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon className="cursor-pointer" />
                          </span>
                        </Button>
                      </Tooltip>
                      <Tooltip content="Xóa phim">
                        <span
                          onClick={() => handleDeleteFilm(films.id)}
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                          <DeleteIcon className="cursor-pointer" />
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
