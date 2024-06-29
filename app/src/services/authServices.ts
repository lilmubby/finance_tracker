import { AxiosResponse } from "axios";
import {signin, signup} from "../constants/endpoints"
import { ApiResponse, RegisterUserData, UserData, SignUpApiResponse } from "../types/auth";
import { axiosInstance } from "../util/axios"

export const loginUserFn = async<T> (userData: UserData): Promise<ApiResponse<T>> => {
  try {
    const {data, status}: AxiosResponse<T> = await axiosInstance.post(signin(), userData);
    return {data, status}
  } catch (error) {
    throw error
  }
}

export const registerUserFn = async<T> (userData: RegisterUserData): Promise<T> => {
  try {
    const {data} = await axiosInstance.post(signup(), userData)
    return data
  } catch (error) {
    throw error
  }
}
