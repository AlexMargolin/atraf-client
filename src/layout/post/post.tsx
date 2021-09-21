import { time } from "@/utils";
import { PostProps } from "./";
import { forwardRef } from "react";
import { makeClasses } from "@/hooks";
import modules from "./post.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "post",
  title: "post__title",
  link: "post__link",
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
        <h3 className={classes(classNames.title)}>
          <a
            href={`/post/${post.id}`}
            className={classes(classNames.link)}
          >
            {post.title}
          </a>
        </h3>

        <div className={classes(classNames.author.root)}>
          <a href='#' className={classes(classNames.author.link)}>
            {user.nickname}
          </a>
          <time className={classes(classNames.author.time)}>
            {time(post.created_at)}
          </time>
        </div>

        <div className={classes(classNames.media.root)}>
          <img
            loading='lazy'
            alt={post.body}
            src={post.attachment}
            className={classes(classNames.media.image)}
          />
        </div>

        <div className={classes(classNames.body)}>{post.body}</div>
      </div>
    );
  },
);

export default Post;
