import Fetch from "./fetch/fetch"
import Posts from "./posts/posts"
import Account from "./account/account"
import Comments from "./comments/comments"

const HTTP = new Fetch()

export interface Handler {
  get: () => void
  post: () => void
  put: () => void
  delete: () => void
}

export default {
  posts: new Posts(HTTP),
  account: new Account(HTTP),
  comments: new Comments(HTTP),
}
