import api from "@/api"
import { CommentsProps } from "./"
import { User } from "@/api/users"
import { makeClasses } from "@/hooks"
import { Comment } from "@/api/comments"
import modules from "./comments.module.scss"
import { FC, useEffect, useState } from "react"
import { Comment as CommentComponent } from "@/features"
import { Spinner } from "@/components"

const classes = makeClasses(modules)

const classNames = {
  root: "comments",
  header: "comments__header",
  count: "comments__count",
  list: "comments__list",
}

const Comments: FC<CommentsProps> = props => {
  const { postId } = props

  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [users, setUsers] = useState<Record<string, User>>({})

  useEffect(() => {
    const loadComments = async () => {
      const [result, response] = await api.comments.readMany(postId)

      if (!response.ok) {
        return
      }

      // disable loader
      setLoading(false)

      // Create users map
      const usersMap: Record<string, User> = {}
      for (const user of result.users) {
        usersMap[user.id] = user
      }

      // Set Users
      setUsers(usersMap)

      // Set Comments
      setComments(result.comments)
    }

    loadComments()
  }, [])

  if (loading) {
    return <Spinner active={loading} fullScreen={false} />
  }

  return (
    <div className={classes(classNames.root)}>
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
