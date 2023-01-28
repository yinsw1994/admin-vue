/* eslint-disable */
import service from "../utils/request";

export function GetCode(data) {
    return service.request({
        method: "post",
        url: "/getCode/",
        data
    })
}

export function ErrorHttp() {
    return service.request({
        method: "post",
        url: "/error",
    })
}