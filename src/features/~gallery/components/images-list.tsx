import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Pagination from '@/components/pagination';
import handleAxiosError from '@/helpers/handle-axios-error';
import { ImageData } from '@/services';
import ImageService from '@/services/image/service';

import ImageItem from './image-item';

const ImagesList = () => {
  const [loading, setLoading] = useState(false);

  // Query
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 8;
  const pageCount = useMemo(() => {
    return Math.floor(total / pageSize) + 1;
  }, [total, pageSize]);

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
  }, [pageNumber, pageSize]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  if (loading)
    return (
      <div className="w-full flex flex-row justify-center text-2xl items-center h-32">
        LOADING ...
      </div>
    );

  return (
    <div className="w-full p-10 flex flex-col gap-5 items-center">
      <h1 className="text-5xl font-bold mb-5">Gallery</h1>
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
      <Pagination
        currentPage={pageNumber}
        pageCount={pageCount}
        changePage={setPageNumber}
      />
    </div>
  );
};

export default ImagesList;
