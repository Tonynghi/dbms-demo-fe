import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CustomGoogleButton from '@/components/custom-google-button';
import handleAxiosError from '@/helpers/handle-axios-error';
import AuthService from '@/services/auth/service';
import { useAuthStore } from '@/stores';
import storage from '@/utils/storage';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setToken, isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = async (credentialResponse: string) => {
    try {
      setLoading(true);
      const { payload } = (
        await AuthService.loginWithGoogle({ idToken: credentialResponse })
      ).data;
      storage.setItem('token', payload.token);
      setToken(payload.token);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate({ to: '/gallery' });
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-10">
      <img
        src="/bg.jpg"
        alt="Web Background"
        className="absolute z-0 size-full object-cover"
      />
      <div className="relative z-1 w-[25rem] h-auto flex flex-col items-center justify-center gap-20">
        <span className="text-5xl font-black text-white text-center">
          Welcome to the Gallery
        </span>
        {!loading ? (
          <CustomGoogleButton
            onSuccess={async (credentialResponse) => {
              if (!credentialResponse.credential) {
                toast.error(
                  'Có lỗi xảy ra khi đăng nhập bằng tài khoản Google. Vui lòng thử lại!',
                );
                return;
              }
              await loginWithGoogle(credentialResponse.credential);
            }}
            onError={() => {
              toast.error(
                'Có lỗi xảy ra khi đăng nhập bằng tài khoản Google. Vui lòng thử lại!',
              );
            }}
          />
        ) : (
          <span>LOADING ...</span>
        )}
      </div>
    </div>
  );
}
