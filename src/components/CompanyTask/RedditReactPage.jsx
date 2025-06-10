import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import './common.css';

const RedditReactPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(res => res.json())
      .then(data => {
        const items = data?.data?.children || [];
        setPosts(items.map(item => item.data));
      });
  }, []);

  return (
    <div className="container">
      <h1 className="header">ReactJS Reddit Feed</h1>
      <div className="grid">
        {posts.map(post => (
          <div key={post.id} className="card">
            <h2 className="title">{post.title}</h2>

            {post.selftext_html && (
              <div
                className="content"
            >
                {parse(parse(`${post.selftext_html}`).replace('<!-- SC_OFF -->', '').replace('<!-- SC_ON -->', ''))}</div>)}
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Visit Post
            </a>

            <div className="score">⭐ Score: {post.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedditReactPage;


