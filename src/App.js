import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=9")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="container">
      <h1 className="title">PostVista</h1>

      {selectedPost ? (
        <div className="blog">
          <button onClick={() => setSelectedPost(null)} className="back">
            ← Back
          </button>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </div>
      ) : (
        <div className="grid">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`card color-${index % 5}`}
              onClick={() => setSelectedPost(post)}
            >
              <h3>{post.title}</h3>
              <p>Click to read more...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
