import { isAxiosError } from "axios";
import api from "../config/axios";
import {LoginForm } from  "../types/empleados.ts";

export async function loginUser(formData: LoginForm) {
    try {
        console.log(formData);
        const { data } = await api.post("/api/login/", formData);
        console.log(data);
        localStorage.setItem("AUTH_TOKEN", data);
        return;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
