import api from "@/api";
import { User } from "@/api/users";
import { Post } from "@/api/posts";
import { makeClasses } from "@/hooks";
import { Comments } from "@/features";
import modules from "./post.module.scss";
import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

export type PostRouteParams = {
  id: string;
};

const classes = makeClasses(modules);

export const classNames = {
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
};

const Post: FC = () => {
  const { id } = useParams<PostRouteParams>();
  const [user, setUser] = useState<User>(null);
  const [post, setPost] = useState<Post>(null);

  useEffect(() => {
    (async () => {
      const [result, response] = await api.posts.readOne(id);

      if (!response.ok) {
        return;
      }

      setUser(result.user);
      setPost(result.post);
    })();
  }, [id]);

  if (!user || !post) {
    return <div>loading post...</div>;
  }

  return (
    <div className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>{post.title}</h1>

      <div className={classes(classNames.info)}>
        <address className={classes(classNames.author.root)}>
          By
          <a
            href=''
            rel='author'
            className={classes(classNames.author.link)}
          >
            <span role='presentation'>@</span>
            {user.email}
          </a>
        </address>
        <time className={classes(classNames.author.time)}>
          {post.created_at}
        </time>
      </div>

      <div className={classes(classNames.media.root)}>
        <img
          alt='%s'
          src='https://picsum.photos/770/855'
          className={classes(classNames.media.image)}
        />
      </div>

      <p>{post.body}</p>

      <Comments sourceId={post.id} />
    </div>
  );
};

export default Post;
