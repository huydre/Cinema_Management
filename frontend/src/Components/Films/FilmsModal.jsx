import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  updateFilm,
  createFilm,
  getFilmById,
} from "../../services/FilmServices";
import toast from "react-hot-toast";

export const FilmsModal = ({ isOpen, onOpenChange, state, id }) => {
  const [formState, setFormState] = useState({});

  const handleSubmit = async () => {
    if (
      formState.name === null ||
      formState.overview === null ||
      formState.duration === null ||
      formState.country === null ||
      formState.posterPath === null
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (state === "Insert") {
      try {
        await createFilm(formState);
        setFormState({});
        toast.success("Thêm phim thành công");
      } catch (error) {
        toast.error("Thêm phim thất bại");
        console.error(error);
      }
    } else {
      try {
        await updateFilm(id, formState);
        setFormState({});
        toast.success("Cập nhật phim thành công");
      } catch (error) {
        toast.error("Cập nhật phim thất bại");
        console.error(error);
      }
    }
  };

  const getFilmDetail = async (id) => {
    try {
      const response = await getFilmById(id);
      setFormState(response[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state === "Edit") {
      getFilmDetail(id);
    }
  }, [id, state]);

  useEffect(() => {
    if (isOpen && state == 'Insert') {
      setFormState({});
    }
    if (!isOpen && state == 'Edit') {
      setFormState({});
    }
  }, [isOpen, state]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormState({
        ...formState,
        posterPath: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

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
                    value={formState.name}
                    isRequired
                    onChange={handleChange}
                    name="name"
                    label="Tên Phim"
                  />
                  <Textarea
                    value={formState.overview}
                    isRequired
                    onChange={handleChange}
                    name="overview"
                    label="Tóm tắt"
                  >
                  </Textarea>
                  <Input
                    value={formState.duration}
                    isRequired
                    onChange={handleChange}
                    name="duration"
                    label="Thời lượng"
                  />
                  <Input
                    value={formState.country}
                    isRequired
                    onChange={handleChange}
                    name="country"
                    label="Nước sản xuất"
                  />

                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        {formState.posterPath ? (
                          <img
                            class=" h-56"
                            id="image-preview"
                            src={formState.posterPath}
                            alt="Image Preview"
                          />
                        ) : (
                          <div
                            id="image-upload"
                            class="flex flex-col items-center justify-center pt-5 pb-6"
                          >
                            <svg
                              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span class="font-semibold">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        onChange={handleImageChange}
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                      />
                    </label>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
