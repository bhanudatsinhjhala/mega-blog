import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import { Post } from '../components';
import { authService } from '../services/auth.service';
import postService from '../services/post.service';
import { login, logout } from '../store/features/authSlice';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((data) => {
      if (data) {
        setLoading(false);
        dispatch(login(data));
      } else {
        setLoading(true);
        dispatch(logout());
      }
    });
    postService.getPosts([]).then((posts) => setPosts(posts.documents));
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
        <div className="w-full block content-center m-auto w-1/2 mt-20">
          <main>
            {loading ? (
              <h1>Loading......</h1>
            ) : posts.length === 0 ? (
              <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">Create Posts first to see here.</h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center">
                {posts.map((post) => (
                  <Post
                    title={post.title}
                    content={post.content}
                    imageId={post.featuredImage}
                    imgAlt={post.title}
                    bgColor="gray"
                    key={post.$id}
                    appColor="blue"
                    id={post.$id}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
