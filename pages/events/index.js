import EventSearch from '@/components/event-search/event-search.component';
import EventsList from '@/components/events-list/events-list.component';
import { getAllEvents } from '@/utils/firebase';
import Head from 'next/head';

export default function AllEventsPage({ events }) {
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
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
