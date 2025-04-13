import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import isoDateFormat from '@/helpers/date-format';
import handleAxiosError from '@/helpers/handle-axios-error';
import { ImageData } from '@/services';
import ImageService from '@/services/image/service';

import { Profile } from '../components';

export const Route = createFileRoute('/gallery/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchImageData = useCallback(async () => {
    try {
      setLoading(true);
      const { payload } = (await ImageService.getImageData({ id })).data;
      setImageData(payload.image);
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchImageBuffer = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ImageService.getImageFile({ id });
      const blob: Blob = new Blob([data]);
      const url: string = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchImageData();
    fetchImageBuffer();
  }, [fetchImageData, fetchImageBuffer]);

  if (loading)
    return (
      <div className="w-screen h-screen flex relative items-center justify-center flex-row gap-10">
        LOADING ...
      </div>
    );

  return (
    <div className="w-screen h-screen flex relative flex-col gap-10">
      <Profile />
      <div className="w-full flex px-20 relative flex-row gap-10">
        {imageUrl ? (
          <img src={imageUrl} className="size-80 relative object-cover" />
        ) : (
          <div className="size-80 relative flex items-center justify-center bg-gray-500 text-black font-bold">
            NO IMAGE DATA
          </div>
        )}
        {imageData ? (
          <div className="flex flex-col relative gap-2">
            <div className="relative flex flex-row gap-2">
              <span className="font-bold">ID:</span>
              <span>{imageData._id}</span>
            </div>
            <div className="relative flex flex-row gap-2">
              <span className="font-bold">Name:</span>
              <span>{imageData.filename}</span>
            </div>
            <div className="relative flex flex-row gap-2">
              <span className="font-bold">Description:</span>
              <span>{imageData.description}</span>
            </div>
            <div className="relative flex flex-row gap-2">
              <span className="font-bold">Uploaded at:</span>
              <span>{isoDateFormat(imageData.createdAt)}</span>
            </div>
          </div>
        ) : (
          <div>NO DATA</div>
        )}
      </div>
    </div>
  );
}
