import axios from "axios";

axios.defaults.baseURL = 'https://hulu-app-backend.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:3001'


axios.interceptors.response.use(null, error => {
    /*
        Unexpected: (Network down, server down, db down, Bug,the URL is wrong)
        - Log the error
        - Display a generic and friendly error message
   */
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError) {
        console.log(error)
    }
    return Promise.reject(error)
})

const exportedObject = {
    get: axios.get,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    post: axios.post,
}

export default exportedObject;