export interface IBlogCard{
  title:string,
  description:string,
  thumbnail:{
    url:string
  },
  tags: string[],
  category: string,
  author:{
    _id: string,
    username:string
  },
  createdAt:string,
  _id?:string,
}

export type TUser = {
  user:{
    _id?: string
    id: string
    email: string
    username: string
    avatar?: string
  },
  token:string
  isAuthenticated: boolean
};