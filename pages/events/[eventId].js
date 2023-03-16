import ErrorAlert from '@/components/error-alert/error-alert.component';
import EventContent from '@/components/event-content/event-content.component';
import EventLogistics from '@/components/event-logistics/event-logistics.component';
import EventSummary from '@/components/event-summary/event-summary.component';
import { getEventById, getFeaturedEvents } from '@/utils/firebase';

export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }

  const { title, date, location, image, description } = event;

  return (
    <>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
