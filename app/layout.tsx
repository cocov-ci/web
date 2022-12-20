import React from 'react';
import 'styles/globals.css';
import localFont from '@next/font/local';

const satoshi = localFont({ src: '../public/fonts/Satoshi.ttf' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={satoshi.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
