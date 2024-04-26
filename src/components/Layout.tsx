import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';

type LayoutProps = PropsWithChildren;

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="px-10 py-10">
      <Header />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
