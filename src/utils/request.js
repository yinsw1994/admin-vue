/* eslint-disable */

import axios from "axios"
import { ElMessage } from "element-plus";

console.log(`output->process.env.VUE_APP_API`, process.env.VUE_APP_API)

const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000,
});

service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
    console.log(`output->response`, response)
    if (response.data.resCode == 0) {
        // ElMessage({
        //     type: 'success',
        //     message: response.data.message
        // })
        return Promise.resolve(response.data)
    } else {
        ElMessage({
            type: 'error',
            message: response.data.message
        })
        return Promise.reject(response.data)
    }
}, function (error) {
    console.log(`output->error.request`, error.request)
    const errorData = JSON.parse(error.request.response)

    if (errorData.message || errorData.msg) {
        ElMessage({
            type: 'error',
            message: errorData.message || errorData.msg
        })
    }

    return Promise.reject(errorData)
})


export default service