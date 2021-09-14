import api from "@/api"
import { Post } from "@/api/posts"
import { useHistory } from "react-router-dom"
import { MappedUsers, User } from "@/api/users"
import { FC, useEffect, useState } from "react"

const Home: FC = () => {
  const history = useHistory()

  const [cursor, setCursor] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<MappedUsers>({})

  const handlePostClick = (id: Post["id"]) => {
    history.push(`/post/${id}`)
  }

  useEffect(() => {
    const loadPosts = async () => {
      const [result, response] = await api.posts.readMany()
      if (!response.ok) {
        console.warn(response)
        return
      }

      // Create users map
      const usersMap: Record<string, User> = {}
      for (const user of result.users) {
        usersMap[user.id] = user
      }

      setUsers(usersMap)
      setPosts(result.posts)
      setCursor(result.cursor)
    }

    loadPosts()
  }, [])

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <button onClick={() => handlePostClick(post.id)}>
            {post.title}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
