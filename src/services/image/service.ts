import { API_URL } from '@/config/env';
import { AxiosResponse } from '@/types';
import axios from '@/utils/custom-axios';

import {
  GetAllImagesRequest,
  GetImageDataRequest,
  GetImageFileRequest,
} from './requests';
import { GetAllImagesResponse, GetImageDataResponse } from './responses';

const url = `${API_URL}/image`;

const ImageService = {
  getAllImages: async (getAllImagesRequest: GetAllImagesRequest) => {
    const { pagination, pageSize, pageNumber, filename } = getAllImagesRequest;
    const paginationQuery = `?pagination=${pagination || pagination === undefined ? 'true' : 'false'}`;
    const pageSizeQuery = `&pageSize=${pageSize}`;
    const pageNumberQuery = `&pageNumber=${pageNumber}`;
    const filenameQuery = filename !== undefined ? `filename=${filename}` : '';

    return await axios.get<AxiosResponse<GetAllImagesResponse>>(
      `${url}${paginationQuery}${pageSizeQuery}${pageNumberQuery}${filenameQuery}`,
    );
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
};

export default ImageService;
