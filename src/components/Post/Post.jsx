import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import storageService from '../../services/storage.service';

function Post({
  className = '',
  id,
  title,
  content,
  bgColor,
  appColor,
  imageId,
  imgAlt,
  author,
  date,
  tags,
  ...props
}) {
  const [image, setImage] = useState('');

  const setContentAsHtml = (content) => {
    return { __html: content };
  };
  useEffect(() => {
    storageService.getFile(imageId).then((file) => {
      return setImage(file);
    });
  }, [imageId]);
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-4">
        <a href="#">
          <img className="rounded-t-lg" src={image} alt={imgAlt} />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
          </a>
          <div className="mb-3 font-normal text-gray-700 " dangerouslySetInnerHTML={setContentAsHtml(content)}></div>
          <Link
            to={`/posts/${id}`}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-${appColor}-700 rounded-lg hover:bg-${appColor}-800 focus:ring-4 focus:outline-none focus:ring-${appColor}-300`}
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
