import api from "@/api";
import { Post } from "@/api/posts";
import { MappedUsers } from "@/api/users";
import { useHistory } from "react-router-dom";
import { FC, useEffect, useState } from "react";

const Home: FC = () => {
  const history = useHistory();

  const [cursor, setCursor] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<MappedUsers>({});

  const handlePostClick = (id: Post["id"]) => {
    history.push(`/post/${id}`);
  };

  useEffect(() => {
    (async () => {
      const [result, response] = await api.posts.readMany();

      if (!response.ok) {
        return;
      }

      const usersMap: MappedUsers = {};
      for (const user of result.users) {
        usersMap[user.id] = user;
      }

      setUsers(usersMap);
      setPosts(result.posts);
      setCursor(result.cursor);
    })();
  }, []);

  if (0 === posts.length) {
    return <div>loading posts...</div>;
  }

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
  );
};

export default Home;
