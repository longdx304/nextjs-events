import MainHeader from '@/components/main-header/main-header.component';
import '@/styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainHeader />
      <Component {...pageProps} />
    </>
  );
}
