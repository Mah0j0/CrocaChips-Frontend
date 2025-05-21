import { useMutation } from '@tanstack/react-query'
import { loginEmpleado } from '../api/authApi.ts'
import {useAuth} from "../context/AuthContext.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

export const useLogin = () => {
    const { login } = useAuth()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginEmpleado,
        onSuccess: (res) => {
            login(res)
            navigate("/");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}
