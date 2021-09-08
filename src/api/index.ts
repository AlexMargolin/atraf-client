import Posts from "./posts/posts"
import Fetch from "./fetch/fetch"
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
  comments: new Comments(HTTP),
}
