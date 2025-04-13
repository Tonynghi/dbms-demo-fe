import { TextareaAutosize } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { DropzoneArea } from 'react-mui-dropzone';
import { toast } from 'react-toastify';

import handleAxiosError from '@/helpers/handle-axios-error';
import ImageService from '@/services/image/service';

export const Route = createFileRoute('/gallery/upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const uploadImage = async () => {
    try {
      setLoading(true);
      if (!uploadedFile) {
        toast.error('No uploaded file yet! Please upload a file');
        return;
      }
      await ImageService.uploadImage({
        filename: uploadedFile.name.replace(/\.[^/.]+$/, ''),
        description,
        file: uploadedFile,
      });
      navigate({ to: '/gallery' });
      toast.success(
        `Image ${uploadedFile.name.replace(/\.[^/.]+$/, '')} uploaded!`,
      );
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen flex-col px-20 py-10">
      <div className="w-full flex items-center mb-10 justify-center font-bold text-5xl">
        UPLOAD IMAGE
      </div>
      <div className="w-full flex px-20 relative flex-row gap-10">
        <div className="relative h-80 w-[30rem]">
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={'Drag and drop an image here or click'}
            onChange={(files) => {
              if (!loading) setUploadedFile(files[0]);
            }}
            onDelete={() => setUploadedFile(null)}
            showFileNames
          />
        </div>
        <div className="relative w-full flex flex-col h-[15.75rem] justify-between">
          <div className="flex flex-col relative gap-2">
            <div className="relative flex flex-row gap-2">
              <span className="font-bold">Name:</span>
              <span>
                {uploadedFile
                  ? uploadedFile.name.replace(/\.[^/.]+$/, '')
                  : 'No image yet'}
              </span>
            </div>
            <div className="relative flex flex-row gap-2">
              <span className="font-bold mt-2">Description:</span>
              <TextareaAutosize
                minRows={4}
                id="description"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                disabled={loading}
                value={description}
                className={`border-black w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary xs:text-xs md:text-sm 2xl:text-base`}
              />
            </div>
          </div>
          <div className="flex w-full flex-row relative gap-5">
            <button
              onClick={uploadImage}
              disabled={loading}
              className="text-white cursor-pointer font-bold bg-green-700 hover:bg-green-900 ease-in-out duration-200 py-2 w-full"
            >
              Upload image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
