import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// import { useCallback, useEffect } from 'react';
import {
  // toast,
  ToastContainer,
} from 'react-toastify';

import { GOOGLE_OAUTH_CLIENT_ID } from '@/config/env';
// import handleAxiosError from '@/helpers/handle-axios-error';
import { routeTree } from '@/routeTree.gen';
// import { logger } from '@/utils/logger';

import 'react-toastify/dist/ReactToastify.css';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    authContext: { isAuthenticated: false },
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  // const { isAuthenticated } = useAuthStore();
  return (
    <RouterProvider
      router={router}
      // context={{ authContext: { isAuthenticated } }}
    />
  );
};

const App = () => {
  // const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  // const { setUser } = useUserStore();
  // const { setGlobalLoading } = useGlobalLoadingStore();

  // const getProfile = useCallback(async () => {
  //   try {
  //     setGlobalLoading(true);
  //     const { data } = await UserService.getUserProfile();
  //     setUser(data);
  //   } catch (error: unknown) {
  //     setIsAuthenticated(false);
  //     handleAxiosError(error, (message: string) => {
  //       toast.error(message);
  //     });
  //   } finally {
  //     setGlobalLoading(false);
  //   }
  // }, [setUser, setGlobalLoading, setIsAuthenticated]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     reloadBalance();
  //     getProfile();
  //   }
  // }, [isAuthenticated, getProfile, reloadBalance]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
