import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { envConfig } from '../../config/env.config';

function RTE({ defaultValue, label, name, control }) {
  return (
    <>
      <div className="w-full">{label && <label className="inline-block mb-1 pl-1">{label}</label>}</div>
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={envConfig.tinyMceApiKEy}
            init={{
              plugins: [
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              ],
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            initialValue={defaultValue}
            onEditorChange={onChange}
          />
        )}
      />
    </>
  );
}

export default RTE;
