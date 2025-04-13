import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounceCallback } from 'usehooks-ts';

import Pagination from '@/components/pagination';
import handleAxiosError from '@/helpers/handle-axios-error';
import { ImageData } from '@/services';
import ImageService from '@/services/image/service';

import ImageItem from './image-item';

const ImagesList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Query
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 8;
  const pageCount = useMemo(() => {
    return Math.floor(total / pageSize) + 1;
  }, [total, pageSize]);
  const [nameValue, setNameValue] = useState('');
  const debounceNameValue = useDebounceCallback((value: string) => {
    setNameValue(value);
    setPageNumber(1);
  }, 1000);

  // Data
  const [imagesList, setImagesList] = useState<Array<ImageData>>([]);

  const getMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { payload } = (
        await ImageService.getAllImages({
          pagination: true,
          pageNumber,
          pageSize,
          filename: nameValue !== '' ? nameValue : undefined,
        })
      ).data;
      setImagesList(payload.images);
      setTotal(payload.total);
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, nameValue]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <div className="w-full p-10 flex flex-col gap-5 items-center">
      <h1 className="text-5xl font-bold mb-5">Gallery</h1>
      <div className="flex relative w-full px-10 flex-row gap-5">
        <div className="relative flex size-full py-2 flex-row items-center gap-2 border border-tertiary px-2 sm:px-4">
          {/* <Search className="relative size-4 min-h-4 min-w-4 fill-tertiary xl:size-6" /> */}
          <input
            type="text"
            className="w-full !outline-none"
            onChange={(event) => {
              if (loading) return;
              debounceNameValue(event.target.value);
            }}
            placeholder="Enter the name of the image to find it ..."
          />
        </div>
        <button
          onClick={() => {
            navigate({ to: '/gallery/upload' });
          }}
          className="shrink-0 relative font-bold cursor-pointer text-white flex px-4 py-2 bg-green-700 hover:bg-green-900 ease-in-out duration-200"
        >
          Upload image
        </button>
      </div>
      {loading ? (
        <div className="w-full flex flex-row justify-center text-2xl items-center h-32">
          LOADING ...
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 relative">
          {imagesList.map((imageData) => {
            return (
              <ImageItem
                key={imageData._id}
                id={imageData._id}
                name={imageData.filename || ''}
                description={imageData.description}
              />
            );
          })}
        </div>
      )}
      <Pagination
        currentPage={pageNumber}
        pageCount={pageCount}
        changePage={setPageNumber}
      />
    </div>
  );
};

export default ImagesList;
