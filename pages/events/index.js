import EventSearch from '@/components/event-search/event-search.component';
import EventsList from '@/components/events-list/events-list.component';
import { getAllEvents } from '@/dummy-data';

export default function AllEventsPage() {
  const events = getAllEvents();

  return (
    <div>
      <EventSearch />
      <EventsList events={events} />
    </div>
  );
}
