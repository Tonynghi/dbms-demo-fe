import { createFileRoute } from '@tanstack/react-router';

import { ImagesList, Profile } from './components';

export const Route = createFileRoute('/gallery/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen flex gap-5 flex-col relative">
      <Profile />
      <ImagesList />
    </div>
  );
}
