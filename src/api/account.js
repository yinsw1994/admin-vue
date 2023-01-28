/* eslint-disable */
import service from '../utils/request'

export function Login(data) {
    return service.request({
        method: "post",
        url: "/api/login",
        data
    })
}

export function Register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}