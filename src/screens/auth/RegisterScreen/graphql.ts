import { gql } from '@apollo/client'

export type RegisterData = {
  createUser: {
    user: {
      _id: string
      name: string
      email: string
    }
    token: string
  }
}

export type RegisterVariables = {
  email: string
  password: string
  name: string
}

export const REGISTER = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    createUser(user: { email: $email, password: $password, name: $name }) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`
