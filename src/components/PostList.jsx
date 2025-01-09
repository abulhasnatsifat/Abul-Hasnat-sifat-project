import { useState } from 'react';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'React is a powerful library for building user interfaces...',
      category: 'Development',
      tags: ['react', 'javascript', 'frontend'],
      author: {
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
      },
      image: 'https://picsum.photos/800/400',
      createdAt: '2024-03-15T10:00:00Z',
      likes: 42,
      comments: 15
    },
    {
      id: 2,
      title: 'UI Design Principles',
      content: 'Understanding core design principles is essential for creating...',
      category: 'Design',
      tags: ['ui', 'design', 'ux'],
      author: {
        name: 'Jane Smith',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
      },
      image: 'https://picsum.photos/800/401',
      createdAt: '2024-03-14T15:30:00Z',
      likes: 38,
      comments: 8
    }
  ]);

  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditData({ ...post });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setEditData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSave = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...editData } : post
    ));
    setEditingPost(null);
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditData({});
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <article key={post.id} className="post-card">
          <div className="post-header">
            <div className="post-author">
              <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
              <div className="author-info">
                <h3 className="author-name">{post.author.name}</h3>
                <span className="post-date">{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <div className="post-actions">
              <div className="post-category">{post.category}</div>
              <button className="edit-button" onClick={() => handleEdit(post)}>
                ✏️ Edit
              </button>
            </div>
          </div>

          {editingPost === post.id ? (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={handleEditChange}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={editData.tags.join(', ')}
                  onChange={handleTagChange}
                />
              </div>

              <div className="edit-actions">
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn-save" onClick={() => handleSave(post.id)}>
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}

              <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.content}</p>
                
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="post-footer">
            <div className="post-stats">
              <button className="stat-button">
                <span className="icon">❤️</span>
                <span>{post.likes}</span>
              </button>
              <button className="stat-button">
                <span className="icon">💬</span>
                <span>{post.comments}</span>
              </button>
            </div>
            <button className="share-button">
              <span className="icon">📤</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList; 