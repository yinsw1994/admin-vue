/* eslint-disable */

export function validate_email(value) {
    let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    console.log(`output->regEmail.test(value)`, regEmail.test(value))
    return regEmail.test(value)
}

export function validate_password(value) {
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return regPassword.test(value)
}

export function validate_code(value) {
    let regCode = /^[a-z0-9]{6}$/;
    return regCode.test(value)
}