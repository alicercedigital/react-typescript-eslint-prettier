import { FC } from 'react';
import Body from './Body';
import Header from './Header';

const MainLayout: FC = ({ children }) => (
  <>
    <Header />
    <Body>{children}</Body>
  </>
);

export default MainLayout;
