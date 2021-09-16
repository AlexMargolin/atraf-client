import { PostProps } from "./";
import { forwardRef } from "react";
import { makeClasses } from "@/hooks";
import modules from "./post.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "post",
  title: "post__title",
  author: {
    root: "post__author",
    time: "post__author-time",
    link: "post__author-link",
  },
  media: {
    root: "post__media",
    image: "post__media-image",
  },
  body: "post__body",
};

const Post = forwardRef<HTMLDivElement, PostProps>(
  (props, forwardedRef) => {
    const { post, user } = props;

    return (
      <div ref={forwardedRef} className={classes(classNames.root)}>
        <h3 className={classes(classNames.title)}>{post.title}</h3>

        <div className={classes(classNames.author.root)}>
          <a href='#' className={classes(classNames.author.link)}>
            {user.email}
          </a>
          <time className={classes(classNames.author.time)}>
            {post.created_at}
          </time>
        </div>

        <div className={classes(classNames.media.root)}>
          <img
            alt=''
            src='https://picsum.photos/770/855'
            className={classes(classNames.media.image)}
          />
        </div>

        <div className={classes(classNames.body)}>{post.body}</div>
      </div>
    );
  },
);

export default Post;
