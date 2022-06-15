import axiosClient from "./axiosClient"
const studentApi = {
    getAll: () => {
        const url = '/students'
        return axiosClient.get(url)
    },
    getbyPage:(params) =>{
        const url = `/students?page=${params}`
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = `/student/${id}`
        return axiosClient.get(url)
    },
    postStudent: (formData) => {
        const url = `/add-student`
        return axiosClient.post(url, formData)
    },
    putStudent: (id, formData) => {
        const url = `/update-student/${id}`
        return axiosClient.put(url, formData)
    },
    deleteStudent: (id) => {
        const url = `/student/${id}`
        return axiosClient.delete(url)
    }
}
export default studentApi