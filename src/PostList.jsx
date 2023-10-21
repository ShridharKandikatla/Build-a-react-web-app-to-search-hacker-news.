import React from 'react';

function PostList({ posts, onSelectPost }) {
  return (
    <ul>
      {posts.map((post, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              onSelectPost(Number(post.objectID));
            }}
          >
            {post.title}
          </li>
        );
      })}
    </ul>
  );
}

export default PostList;
