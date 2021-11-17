import { FC } from 'react';
import Header from './Header';

const MainLayout: FC = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default MainLayout;
