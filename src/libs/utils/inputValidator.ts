import validator from 'validator'

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const isEmail = (email?: string) => {
  if (!email) {
    return false
  }
  return EMAIL_REGEX.test(email)
}

export const isEmpty = (value?: any) => {
  if (!value) {
    return true
  }
  return validator.isEmpty(value, { ignore_whitespace: true })
}
