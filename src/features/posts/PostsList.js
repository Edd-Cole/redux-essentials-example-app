import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <PostAuthor userId={post.user} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <ReactionButtons post={post} />
        <TimeAgo timeStamp={post.date} />
      </article>
    );
  });

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
