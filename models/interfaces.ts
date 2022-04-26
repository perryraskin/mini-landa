export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  Orders: Order[]
}

export interface Order {
  id: number
  username: string
  User: User
  price: number
  shareAmount: number
  kind: string
}

export interface Share {
  id: number
  username: string
  User: User
  price: number
  Orders: Order[]
}
