import { API_URL } from '@/config/env';
import axios from '@/utils/custom-axios';

import { LoginWithGoogleResponse } from './responses';

const url = `${API_URL}/image`;

const ImageService = {
  getAllImages: async () => {
    return await axios.get<LoginWithGoogleResponse>(`${url}/login`);
  },
};

export default ImageService;
