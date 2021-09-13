import Fetch from "./fetch/fetch"
import Posts from "./posts/posts"
import Users from "./users/users"
import Account from "./account/account"
import Comments from "./comments/comments"
import { auth } from "./fetch/middleware"

export type ResponseStatic = {
  ok: boolean
  status: number
  data: unknown
}

export type Response = Promise<ResponseStatic>

export type GetRequest = (route: string) => Response
export type PostRequest = (route: string, data: unknown) => Response
export type PatchRequest = (route: string, data: unknown) => Response
export type PutRequest = (route: string, data: unknown) => Response
export type DeleteRequest = (route: string) => Response

export interface Handler {
  get: GetRequest
  post: PostRequest
  patch: PatchRequest
  put: PutRequest
  delete: DeleteRequest
}

// Default API Url
Fetch.setBaseUrl(process.env.APP_API_URL)

// Default Fetch Config
Fetch.setDefaults({ headers: { "content-type": "application/json" } })

// Response Middleware
Fetch.use(auth)

// Handler instance
const HTTP = new Fetch()

export default {
  posts: new Posts(HTTP),
  users: new Users(HTTP),
  account: new Account(HTTP),
  comments: new Comments(HTTP),
}
