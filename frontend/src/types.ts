export interface IBlogCard{
  title:string,
  description:string,
  thumbnail:string,
  category: string,
  author:{
    _id: string,
    username:string
  },
  createdAt:string,
  _id?:string,
}

export type TUser = {
  userData:{
    id: string
    email: string
    username: string
    avatar?: string
  },
  isAuthenticated: boolean
};