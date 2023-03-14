import EventsList from '@/components/events-list/events-list.component';
import { getFeaturedEvents } from '@/dummy-data';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventsList events={featuredEvents} />
    </div>
  );
}
