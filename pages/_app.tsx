import 'styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';

const satoshi = localFont({ src: '../public/fonts/Satoshi.ttf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={satoshi.className}>
      <Component {...pageProps} />
    </main>
  );
}
