import { API_URL } from '@/config/env';
import axios from '@/utils/custom-axios';

import { GetMyProfileResponse } from './responses';

const url = `${API_URL}/me`;

const MeService = {
  getMyProfile: async () => {
    return await axios.get<GetMyProfileResponse>(`${url}/`);
  },
};

export default MeService;
