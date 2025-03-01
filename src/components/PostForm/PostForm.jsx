import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postService from '../../services/post.service';
import storageService from '../../services/storage.service';
import { Input, RTE } from '../index';

function PostForm({ post }) {
  const { register, control, getValues, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.featuredImage[0] ? storageService.uploadFile(data.featuredImage[0]) : null;

      if (file) {
        storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await postService.createPost({
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } else {
      const file = data.featuredImage[0] ? await storageService.uploadFile(data.featuredImage[0]) : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await postService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/posts/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .toLowerCase() // Convert to lowercase
        .trim() // Trim whitespace from both ends
        .replace(/[\s]+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens

    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <div className="m-auto max-w-screen-lg mb-6">
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <Input
            label="Title"
            className="mb-4"
            placeholder="Title"
            bgColor="gray"
            {...register('title', { required: true })}
            onInput={(e) => {
              setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <Input
            label="Slug"
            className="mb-4"
            bgColor="gray"
            placeholder="slug"
            {...register('slug', { required: true })}
          />

          <RTE label="Content" name="content" control={control} defaultValue={getValues('content')} />
        </div>
        <div className="w1/3 px-2">
          <Input
            label="Featured Image"
            name="featured-image"
            type="file"
            bgColor="gray"
            className="mb-4"
            accept="image/png, image/jpeg, image/gif"
            {...register('featuredImage', { required: !post })}
          />
          {post && (
            <div className="max-w-72 mb-4">
              <img src={post.featuredImage} alt={post.title} className="rounded-lg" />
            </div>
          )}

          <Input
            type="submit"
            bgColor={post ? 'bg-green-700' : 'bg-blue-700'}
            textColor="text-white"
            borderColor={post ? 'border-green-900' : 'border-blue-900'}
            ringColor={post ? 'ring-green-800' : 'ring-blue-700'}
            placeHolderColor={post ? 'placeholder-green-800' : 'placeholder-blue-800'}
            className="w-full font-medium rounded-lg text-sm px-5 py-2.5 mb-2 on-hover:cursor-pointer on-hover:focus:ring-4"
            value={post ? 'Update' : 'Create'}
          />
        </div>
      </form>
    </div>
  );
}

export default PostForm;
