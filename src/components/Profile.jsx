import { useState } from 'react';
import './Profile.css';
import CreatePost from './CreatePost';
import PostList from './PostList';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [profileImage, setProfileImage] = useState('https://ui-avatars.com/api/?name=John+Doe&background=random');
  const [coverImage, setCoverImage] = useState('https://example.com/your-cover-photo.jpg');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Designer',
    location: 'London, UK',
    bio: 'Senior UI/UX designer with 5+ years of experience in digital product design.',
    phone: '+44 207 123 4567',
    website: 'www.johndoe.com'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover">
            <img 
              src={coverImage}
              alt="Cover" 
              className="cover-image"
            />
            {isEditing && (
              <label 
                className="edit-cover" 
                role="button" 
                tabIndex="0"
                title="Change cover photo"
                aria-label="Change cover photo"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden-input"
                />
              </label>
            )}
          </div>
          <div className="profile-avatar">
            <img 
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
            {isEditing && (
              <label 
                className="edit-avatar" 
                role="button" 
                tabIndex="0"
                title="Change profile photo"
                aria-label="Change profile photo"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden-input"
                />
              </label>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-actions">
            <a 
              href="https://www.facebook.com/yourpage" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-facebook-like"
            >
              Facebook Profile
            </a>
            <button className="btn-create-post" onClick={handleCreatePost}>
              Create Post
            </button>
            {isEditing ? (
              <button className="btn-save" onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button className="btn-edit" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>

          <form className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.email}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.role}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.location}</p>
                )}
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">Bio</label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                    rows="4"
                  />
                ) : (
                  <p>{userData.bio}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={userData.website}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.website}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}

      <PostList />
    </div>
  );
};

export default Profile; 