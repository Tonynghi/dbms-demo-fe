import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import handleAxiosError from '@/helpers/handle-axios-error';
import { GetMyProfileResponse } from '@/services';
import MeService from '@/services/me/service';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState<GetMyProfileResponse | null>(
    null,
  );

  const getMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { payload } = (await MeService.getMyProfile()).data;
      setProfileInfo(payload);
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  if (!profileInfo || loading)
    return (
      <div className="w-full flex flex-row justify-center text-2xl items-center h-32">
        LOADING ...
      </div>
    );

  return (
    <div className="w-full px-10 flex flex-row gap-10 items-center border-b h-32">
      <img
        src={profileInfo.picture}
        alt={`${profileInfo.name}'s avatar`}
        className="object-cover relative rounded-full size-20"
      />
      <div className="flex flex-col relative">
        <div className="relative flex flex-row gap-2">
          <span className="font-bold">ID:</span>
          <span>{profileInfo._id}</span>
        </div>
        <div className="relative flex flex-row gap-2">
          <span className="font-bold">Name:</span>
          <span>{profileInfo.name}</span>
        </div>
        <div className="relative flex flex-row gap-2">
          <span className="font-bold">Email:</span>
          <span>{profileInfo.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
