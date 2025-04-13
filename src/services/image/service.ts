import { API_URL } from '@/config/env';
import { AxiosResponse } from '@/types';
import axios from '@/utils/custom-axios';

import {
  DeleteImageRequest,
  GetAllImagesRequest,
  GetImageDataRequest,
  GetImageFileRequest,
  UploadImageRequest,
} from './requests';
import { GetAllImagesResponse, GetImageDataResponse } from './responses';

const url = `${API_URL}/image`;

const ImageService = {
  getAllImages: async (getAllImagesRequest: GetAllImagesRequest) => {
    const { pagination, pageSize, pageNumber, filename } = getAllImagesRequest;
    const paginationQuery = `?pagination=${pagination || pagination === undefined ? 'true' : 'false'}`;
    const pageSizeQuery = `&pageSize=${pageSize}`;
    const pageNumberQuery = `&pageNumber=${pageNumber}`;
    const filenameQuery = filename !== undefined ? `&filename=${filename}` : '';

    return await axios.get<AxiosResponse<GetAllImagesResponse>>(
      `${url}${paginationQuery}${pageSizeQuery}${pageNumberQuery}${filenameQuery}`,
    );
  },

  uploadImage: async (uploadImageRequest: UploadImageRequest) => {
    const { filename, description, file } = uploadImageRequest;

    const formdata = new FormData();
    formdata.append('image', file);
    formdata.append('filename', filename);
    formdata.append('description', description);

    return await axios.post<AxiosResponse<void>>(`${url}/`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getImageData: async (getImageDataRequest: GetImageDataRequest) => {
    const { id } = getImageDataRequest;

    return await axios.get<AxiosResponse<GetImageDataResponse>>(`${url}/${id}`);
  },

  getImageFile: async (getImageFileRequest: GetImageFileRequest) => {
    const { id } = getImageFileRequest;

    return await axios.get<ArrayBuffer>(`${url}/attachments/${id}`, {
      responseType: 'arraybuffer',
    });
  },

  deleteImage: async (deleteImageRequest: DeleteImageRequest) => {
    const { id } = deleteImageRequest;

    return await axios.delete<void>(`${url}/${id}`);
  },
};

export default ImageService;
