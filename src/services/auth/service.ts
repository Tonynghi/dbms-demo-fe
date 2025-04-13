import { API_URL } from '@/config/env';
import { AxiosResponse } from '@/types';
import axios from '@/utils/custom-axios';

import { LoginWithGoogleRequest } from './requests';
import { LoginWithGoogleResponse } from './responses';

const url = `${API_URL}/auth`;

const AuthService = {
  loginWithGoogle: async (request: LoginWithGoogleRequest) => {
    const { idToken } = request;

    return await axios.post<AxiosResponse<LoginWithGoogleResponse>>(
      `${url}/login`,
      {
        idToken,
      },
    );
  },
};

export default AuthService;
