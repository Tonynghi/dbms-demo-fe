import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import handleAxiosError from '@/helpers/handle-axios-error';
import ImageService from '@/services/image/service';

type ImageItemProps = {
  id: string;
  name: string;
  description: string;
};

const ImageItem = ({ id, name, description }: ImageItemProps) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    fetchImageBuffer();
  }, [fetchImageBuffer]);

  return (
    <div className="w-[20rem] flex flex-col items-center gap-2 border p-2">
      {loading ? (
        <div className="h-60 w-full bg-gray-500 flex items-center justify-center font-bold text-black">
          {' '}
          NO IMAGE DATA
        </div>
      ) : (
        <img
          src={imageUrl || ''}
          alt={name}
          className="h-60 w-full roudned-lg object-cover object-center"
        />
      )}
      <span className="font-bold">{name}</span>
      <span className="w-full max-w-full h-20 overflow-scroll">
        {description}
      </span>
      <button
        onClick={() => {
          navigate({ to: '/gallery/$id', params: { id } });
        }}
        className="bg-green-700 hover:bg-green-900 ease-in-out duration-200 font-bold text-white cursor-pointer py-2 w-full"
      >
        View detail
      </button>
    </div>
  );
};

export default ImageItem;
