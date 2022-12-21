import React from 'react';
import 'styles/globals.scss';
import localFont from '@next/font/local';

import Header from 'app/common/Header';
import AuthContext from 'app/AuthContext';

const satoshi = localFont({ src: '../public/fonts/Satoshi.ttf' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={satoshi.className}>
        <AuthContext>
          <Header />
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
};

export default RootLayout;
