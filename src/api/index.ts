import Fetch from "./fetch/fetch"
import Posts from "./posts/posts"
import Comments from "./comments/comments"

const Handler = new Fetch()

export interface Handler {
  get: () => void
  post: () => void
  put: () => void
  delete: () => void
}

export default {
  posts: new Posts(Handler),
  comments: new Comments(Handler),
}
