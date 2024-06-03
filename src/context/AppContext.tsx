"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { TStudent } from "@/app/types/student.type";
import { sliceArray } from "@/utils/sliceArray.util";
import { toast } from "react-toastify";
type AppContextType = {
  studentsList: TStudent[];
  getStudents: () => void;
  findStudentById: (id: string) => void;
  addStudent: (student: TStudent) => void;
  updateStudent: (student: TStudent) => void;
  deleteStudent: (id: string) => Promise<Boolean>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  segmentedStudentsList: TStudent[][];
};

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [studentsList, setStudentsList] = useState<TStudent[]>([]);
  const [segmentedStudentsList, setSegmentedStudentsList] = useState<
    TStudent[][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getStudents();
  }, [update]);

  function forceUpdate() {
    setUpdate((prev) => prev + 1);
  }
  async function getStudents() {
    setIsLoading(true);
    axios
      .request({
        method: "GET",
        url: "http://localhost:3000/students",
      })
      .then((response) => {
        const res = response.data;
        console.log(res);
        const list = res.data.students;
        const parts = sliceArray<TStudent>(list, 15);
        setStudentsList(res.data.students);
        console.log(parts);
        setSegmentedStudentsList(parts);
      })
      .catch((error) => {
        toast.error("Falha ao carregar dados.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        console.error(error);
      });
    setIsLoading(false);
  }

  function findStudentById(id: string) {}

  function addStudent(student: TStudent) {
    setIsLoading(true);
    axios
      .request({
        method: "POST",
        url: "http://localhost:3000/students",
        data: {
          cpf: student.cpf,
          name: student.name,
          email: student.email,
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        forceUpdate();
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 409) {
          toast.error("Falha ao criar aluno: CPF já cadastrado", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
        } else {
          console.error(error);
          toast.error("Falha ao criar aluno", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
        }

        setIsLoading(false);
        forceUpdate();
      });
  }

  function updateStudent(data: TStudent) {
    setIsLoading(true);
    axios
      .request({
        method: "PUT",
        url: `http://localhost:3000/students/`,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        forceUpdate();
      })
      .catch((error) => {
        toast.error("Falha ao atualizar o aluno", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        console.error(error);
        setIsLoading(false);
        forceUpdate();
      });
  }

  async function deleteStudent(id: string): Promise<Boolean> {
    setIsLoading(true);
    return axios
      .request({
        method: "DELETE",
        url: `http://localhost:3000/students/${id}`,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        forceUpdate();
        return true;
      })
      .catch((error) => {
        console.error(error);
        toast.error("Falha ao deletar o aluno", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        setIsLoading(false);
        forceUpdate();
        return false;
      });
  }

  return (
    <AppContext.Provider
      value={{
        studentsList,
        getStudents,
        findStudentById,
        deleteStudent,
        addStudent,
        updateStudent,
        isLoading,
        setIsLoading,
        segmentedStudentsList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
