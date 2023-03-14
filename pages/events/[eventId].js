import ErrorAlert from '@/components/error-alert/error-alert.component';
import EventContent from '@/components/event-content/event-content.component';
import EventLogistics from '@/components/event-logistics/event-logistics.component';
import EventSummary from '@/components/event-summary/event-summary.component';
import { getEventById } from '@/dummy-data';
import { useRouter } from 'next/router';

export default function EventDetailPage() {
  const { query } = useRouter();

  const event = getEventById(query.eventId);

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
