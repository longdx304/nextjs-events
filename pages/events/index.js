import EventSearch from '@/components/event-search/event-search.component';
import EventsList from '@/components/events-list/events-list.component';
import { getAllEvents } from '@/utils/firebase';

export default function AllEventsPage({ events }) {
  return (
    <div>
      <EventSearch />
      <EventsList events={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
}
