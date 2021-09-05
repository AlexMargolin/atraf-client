import { FC } from "react"
import { makeClasses } from "@/hooks"
import modules from "./comment.module.scss"
import { CommentProps } from "@/features/comment/index"

const mc = makeClasses(modules)

const classes = {
  root: "comment",
  header: "comment__header",
  avatar: "comment__avatar",
  author: {
    root: "comment__author",
    link: "comment__author-link",
    time: "comment__author-time",
  },
  body: "comment__body",
}

const Comment: FC<CommentProps> = props => {
  const { comment } = props

  return (
    <div className={mc(classes.root)}>
      <div className={mc(classes.header)}>
        <img
          alt='My Picture %s'
          className={mc(classes.avatar)}
          src='https://www.gravatar.com/avatar/e667fa431b98e1bb50bb42beb735ca9b'
        />

        <address className={mc(classes.author.root)}>
          <a
            rel='author'
            href={`#${comment.id}`}
            className={mc(classes.author.link)}
          >
            Alex
          </a>
          <time dateTime='%t' className={mc(classes.author.time)}>
            {comment.created_at}
          </time>
        </address>
      </div>

      <div className={mc(classes.body)}>{comment.body}</div>
    </div>
  )
}

export default Comment
