import api from "@/api";
import { Post } from "@/api/posts";
import { Icon, Spinner } from "@/base";
import { POSTS_LIMIT } from "@/defines";
import { Container } from "@/components";
import { MappedUsers } from "@/api/users";
import modules from "./posts.module.scss";
import { makeClasses, useInView } from "@/hooks";
import { Post as PostComponent } from "@/features";
import { FC, useCallback, useEffect, useRef, useState } from "react";

const classes = makeClasses(modules);

export const classNames = {
  root: "posts",
  end: "posts__end",
  loader: "posts__loader",
};

const Posts: FC = () => {
  const [cursor, setCursor] = useState<string>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<MappedUsers>({});
  const [loading, setLoading] = useState(true);

  const lastPost = posts[posts.length - 1];
  const lastPostRef = useRef<HTMLDivElement>();

  const load = async () => {
    setLoading(true);
    const [result, response] = await api.posts.readMany(
      cursor,
      POSTS_LIMIT,
    );
    setLoading(false);

    // 404 is handled by the middleware
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

  // load new data only when the last post is in view
  // and the cursor is present in the previous API response
  const inViewCallback = useCallback(
    entry => {
      if (entry.isIntersecting && cursor) {
        load();
      }
    },
    [lastPost],
  );

  // initial render
  useEffect(() => {
    load();
  }, []);

  // load additional posts when the last post is in the viewport
  useInView(lastPostRef, inViewCallback, {
    once: true,
  });

  return (
    <>
      <Container className={classes(classNames.root)}>
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

        {!cursor && 0 !== posts.length && (
          <Icon
            iconId='icon-flag'
            className={classes(classNames.end)}
          />
        )}
      </Container>

      {loading && (
        <Spinner
          absolute={false}
          className={classes(classNames.loader)}
        />
      )}
    </>
  );
};

export default Posts;
