import { FC } from "react"
import modules from "./post.module.scss"
import { useParams } from "react-router-dom"
import { makeClasses } from "@/hooks"
import { Comment } from "@/features"
import { CommentStatic } from "@/features/comment"

const mc = makeClasses(modules)

type PostRouteParams = {
  id: string
}

const cls = {
  root: "post",
  title: "post__title",
  info: "post__info",
  author: {
    root: "post__author",
    link: "post__author-link",
    time: "post__author-time",
  },
  media: {
    root: "post__media",
    image: "post__media-image",
  },
  comments: {
    root: "post__comments",
    count: "post__comments-count",
    header: "post__comments-header",
  },
}

const mockComment: CommentStatic = {
  body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, perspiciatis.",
  created_at: "5 minutes ago",
  id: "123456",
  post_id: "",
  user_id: "",
}

const Post: FC = () => {
  const comments = Array.from(new Array(1))
  const { id } = useParams<PostRouteParams>()

  return (
    <div className={mc(cls.root)}>
      <h1 className={mc(cls.title)}>
        LOREM IPSUM DOLOR SIT AMET <code>({id})</code>
      </h1>

      <div className={mc(cls.info)}>
        <address className={mc(cls.author.root)}>
          By
          <a href='#' rel='author' className={mc(cls.author.link)}>
            <span role='presentation'>@</span>
            Alex
          </a>
        </address>
        <time className={mc(cls.author.time)}>5 minutes ago</time>
      </div>

      <div className={mc(cls.media.root)}>
        <img
          alt='%s'
          className={mc(cls.media.image)}
          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        />
      </div>

      <div className={mc(cls.comments.root)}>
        <h2 className={mc(cls.comments.header)}>
          <strong className={mc(cls.comments.count)}>120</strong>{" "}
          Comments
        </h2>

        {comments.map(c => (
          <Comment key={c} comment={mockComment} />
        ))}
      </div>
    </div>
  )
}

export default Post
