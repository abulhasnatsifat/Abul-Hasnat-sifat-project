import { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ onClose }) => {
  const categories = [
    'Technology',
    'Design',
    'Development',
    'Business',
    'Marketing',
    'Lifestyle',
    'Other'
  ];

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: null,
    tags: [],
    category: ''
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the post submission
    console.log('Post submitted:', postData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !postData.tags.includes(newTag)) {
        setPostData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="create-post-overlay">
      <div className="create-post-modal">
        <div className="create-post-header">
          <h2>Create New Post</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={postData.category}
              onChange={handleChange}
              required
              className="category-select"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handleChange}
              required
              placeholder="Write your post content here..."
              rows="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tags-input-container">
              <div className="tags-list">
                {postData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add tags (press Enter or comma to add)"
                className="tag-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Add Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {postData.image && (
              <div className="image-preview">
                <img src={postData.image} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost; 