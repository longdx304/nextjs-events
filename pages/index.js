import EventsList from '@/components/events-list/events-list.component';
import { getFeaturedEvents } from '@/utils/firebase';

export default function HomePage({ events }) {
  return (
    <div>
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
