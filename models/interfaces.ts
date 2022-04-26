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
  shareCount: number
  kind: string
}

export interface Share {
  id: number
  username: string
  User: User
  count: number
}
