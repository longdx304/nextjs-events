import MainHeader from '@/components/main-header/main-header.component';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainHeader />
      <Component {...pageProps} />
    </>
  );
}
