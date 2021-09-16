import api from "@/api";
import { Spinner } from "@/base";
import { Post } from "@/api/posts";
import { POSTS_LIMIT } from "@/defines";
import modules from "./home.module.scss";
import { MappedUsers } from "@/api/users";
import { makeClasses, useInView } from "@/hooks";
import { Post as PostComponent } from "@/features";
import { FC, useCallback, useEffect, useRef, useState } from "react";

const classes = makeClasses(modules);

export const classNames = {
  root: "home",
  loader: "home__loader",
};

const Home: FC = () => {
  const [cursor, setCursor] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<MappedUsers>({});

  const lastPost = posts[posts.length - 1];
  const lastPostRef = useRef<HTMLDivElement>();

  const load = async () => {
    setLoading(true);
    const [result, response] = await api.posts.readMany(
      cursor,
      POSTS_LIMIT,
    );
    setLoading(false);

    if (!response.ok) {
      return;
    }

    const usersMap: MappedUsers = {};
    for (const user of result.users) {
      usersMap[user.id] = user;
    }

    setCursor(result.cursor);
    setUsers(Object.assign(users, usersMap));
    setPosts(posts.concat(result.posts));
  };

  // initial render
  useEffect(() => {
    load();
  }, []);

  // load additional posts when the last post is in the viewport
  useInView(
    lastPostRef,
    useCallback(
      entry => {
        // load new data only when the last post is in view
        // and the cursor is present in the previous API response
        if (entry.isIntersecting && cursor) {
          load();
        }
      },
      [lastPost],
    ),
    { once: true },
  );

  return (
    <>
      <div className={classes(classNames.root)}>
        {posts.map(post =>
          post.id === lastPost.id ? (
            <PostComponent
              post={post}
              key={post.id}
              ref={lastPostRef}
              user={users[post.user_id]}
            />
          ) : (
            <PostComponent
              post={post}
              key={post.id}
              user={users[post.user_id]}
            />
          ),
        )}
      </div>

      {loading && (
        <Spinner
          absolute={false}
          className={classes(classNames.loader)}
        />
      )}
    </>
  );
};

export default Home;
