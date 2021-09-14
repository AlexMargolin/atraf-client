import api from "@/api"
import { CommentsProps } from "./"
import { User } from "@/api/users"
import { makeClasses } from "@/hooks"
import { Comment } from "@/api/comments"
import modules from "./comments.module.scss"
import { FC, useEffect, useMemo, useState } from "react"
import { Comment as CommentComponent, Editor } from "@/features"

const classes = makeClasses(modules)

export const classNames = {
  root: "comments",
  header: "comments__header",
  count: "comments__count",
  list: "comments__list",
}

const Comments: FC<CommentsProps> = props => {
  const { postId } = props

  const [unmapped, setUnmapped] = useState<User[]>([])
  const [comments, setComments] = useState<Comment[]>([])

  const users = useMemo(() => {
    const map: Record<string, User> = {}

    for (const user of unmapped) {
      map[user.id] = user
    }

    return map
  }, [unmapped])

  useEffect(() => {
    const loadComments = async () => {
      const [result, response] = await api.comments.readMany(postId)
      if (!response.ok) {
        return
      }

      setUnmapped(result.users)
      setComments(result.comments)
    }

    loadComments()
  }, [])

  const handleSubmit = async (value: string) => {
    const [{ comment }, response] = await api.comments.create({
      body: value,
      source_id: postId,
    })

    if (!response.ok) {
      console.warn("Error, create toast")
      return
    }

    // When a user creates a comment, unless previously commented,
    // the user object will not be present in the unmapped array
    if (!users[comment.user_id]) {
      const [{ user }, response] = await api.users.readOne(
        comment.user_id,
      )

      if (!response.ok) {
        console.warn("Error, create toast")
        return
      }
      setUnmapped([user, ...unmapped])
    }

    setComments([comment, ...comments])
  }

  return (
    <div className={classes(classNames.root)}>
      <Editor onSubmit={handleSubmit} />

      <h2 className={classes(classNames.header)}>
        <strong className={classes(classNames.count)}>
          {comments.length}
        </strong>
        Comments
      </h2>

      <div className={classes(classNames.list)}>
        {comments.map(c => (
          <CommentComponent
            data={c}
            key={c.id}
            user={users[c.user_id]}
          />
        ))}
      </div>
    </div>
  )
}

export default Comments
