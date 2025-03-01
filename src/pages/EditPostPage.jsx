import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostForm } from '../components';
import postService from '../services/post.service';
import storageService from '../services/storage.service';

function EditPostPage() {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postService.getPostById(slug).then((post) => {
        storageService.getFile(post.featuredImage).then((file) => {
          return (post.featuredImage = file);
        });
        setPosts(post);
      });
    } else {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <PostForm post={posts} />
    </div>
  );
}

export default EditPostPage;
