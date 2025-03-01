import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import { Post } from '../components';
import postService from '../services/post.service';
function MultiplePostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    postService.getPosts([Query.equal('userId', JSON.parse(userData).$id)]).then((post) => {
      return setPosts(post.documents);
    });
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      {posts?.map((post) => (
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
  );
}

export default MultiplePostsPage;
