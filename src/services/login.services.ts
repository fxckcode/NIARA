import axiosClient from "../utils/axios"

export const login = async (email: string, password: string) => {
    await axiosClient.post('/login', { email, password }).then((response) => {
        if (response.status === 200) {
            window.location.href = '/dashboard'
        }
    })
}