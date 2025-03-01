import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import postService from '../services/post.service';
import storageService from '../services/storage.service';
function PostPage() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    featuredImage: '',
    status: false,
  });
  const location = useLocation();

  const setContentAsHtml = (content) => {
    return { __html: content };
  };
  useEffect(() => {
    const id = location.pathname.split('/')[2];
    postService.getPostById(id).then((posts) => {
      storageService.getFile(posts.featuredImage).then((file) => {
        return (posts.featuredImage = file);
      });
      return setPost(posts);
    });
  }, [location.pathname]);
  return (
    <div>
      <div className="text-4xl text-center mb-8">{post.title}</div>
      <div className="text-center  w-screen-md m-auto">
        <img src={post.featuredImage} alt="" className="rounded-lg max-w-screen-md m-auto" />
      </div>
      <div className="mt-8 ml-4" dangerouslySetInnerHTML={setContentAsHtml(post.content)} />
    </div>
  );
}

export default PostPage;
