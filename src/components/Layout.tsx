import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';

type LayoutProps = PropsWithChildren;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="px-10 py-10">
      <Header />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
