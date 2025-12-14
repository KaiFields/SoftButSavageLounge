import React, { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    author: 'sisterhood_guest',
    content: 'Today I reclaimed my softness by taking a mindful walk and writing a gratitude list.',
    comments: [
      { id: 1, author: 'softlyme', text: 'Beautiful! Thank you for sharing.' }
    ]
  }
];

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [comment, setComment] = useState({});

  function handleAddPost(e) {
    e.preventDefault();
    if (!newPost) return;
    setPosts([
      {
        id: Date.now(),
        author: 'you',
        content: newPost,
        comments: []
      },
      ...posts
    ]);
    setNewPost('');
  }

  function handleAddComment(postId, e) {
    e.preventDefault();
    if (!comment[postId]) return;
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), author: 'you', text: comment[postId] }] }
        : post
    ));
    setComment({ ...comment, [postId]: '' });
  }

  return (
    <section className="community">
      <h2>Community</h2>
      <form onSubmit={handleAddPost} className="community-form">
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="Share a journal entry, ritual, or encouragement..."
          required
        />
        <button type="submit">Post</button>
      </form>
      <ul className="community-posts">
        {posts.map(post => (
          <li key={post.id} className="community-post">
            <div><b>@{post.author}</b>: {post.content}</div>
            <ul className="comments">
              {post.comments.map(c => (
                <li key={c.id}><b>@{c.author}</b>: {c.text}</li>
              ))}
            </ul>
            <form onSubmit={e => handleAddComment(post.id, e)} className="comment-form">
              <input
                value={comment[post.id] || ''}
                onChange={e => setComment({ ...comment, [post.id]: e.target.value })}
                placeholder="Add a comment..."
              />
              <button type="submit">Comment</button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
