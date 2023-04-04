import { gql } from '@apollo/client'

export type LogInData = {
  login: {
    user: {
      _id: string
      name: string
      email: string
    }
    token: string
  }
}

export type LogInVariables = {
  email: string
  password: string
}

export const LOG_IN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`
