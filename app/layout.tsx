import React from 'react';
import 'styles/globals.scss';
import localFont from '@next/font/local';
import Header from 'app/Header';

const satoshi = localFont({ src: '../public/fonts/Satoshi.ttf' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={satoshi.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
