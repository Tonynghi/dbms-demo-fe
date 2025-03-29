import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from '@tanstack/react-router';
import React, { Suspense, useEffect } from 'react';

import { PRODUCTION } from '@/config/env';
import { useAuthStore, useGlobalLoadingStore } from '@/stores';

const TanStackRouterDevtools = PRODUCTION
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

type RouterContext = {
  authContext: { isAuthenticated: boolean };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated } = useAuthStore();
  const { globalLoading } = useGlobalLoadingStore();
  const router = useRouter();

  useEffect(() => {
    router.invalidate();
  }, [isAuthenticated, router]);

  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      {globalLoading && (
        <div className="relative flex h-screen w-screen items-center justify-center bg-white">
          Loading ...
        </div>
      )}
    </>
  );
}
