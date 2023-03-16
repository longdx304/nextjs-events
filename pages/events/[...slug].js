import Button from '@/components/button/button.component';
import ErrorAlert from '@/components/error-alert/error-alert.component';
import EventsList from '@/components/events-list/events-list.component';
import ResultsTitle from '@/components/results-title/results-title.component';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSwr from 'swr';
import Head from 'next/head';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const { query } = useRouter();
  const filterData = query.slug;

  const { data, error } = useSwr(
    'https://events-nextjs-7e959-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const year = +filterData[0];
  const month = +filterData[1];

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${month}/${year}`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the choosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventsList events={filteredEvents} />
    </>
  );
}
