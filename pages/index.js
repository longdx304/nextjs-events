import EventsList from '@/components/events-list/events-list.component';
import { getFeaturedEvents } from '@/utils/firebase';
import Head from 'next/head';

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsList events={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: { events },
    revalidate: 1800,
  };
}
