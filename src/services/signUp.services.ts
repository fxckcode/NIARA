import axiosClient from "../utils/axios"

export const signUp = async (User: object) => {
    await axiosClient.post('/auth/signup', User).then((response) => {
        if (response.status === 201) {
            window.location.href = '/auth/login'
        }
    })
}