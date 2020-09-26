import React from 'react';

import { Logo } from '@/presentation/components';

import Styles from './header-styles.scss';

const Header: React.FC = () => (
  <header className={Styles.headerWrap}>
    <div className={Styles.headerContent}>
      <Logo />
    </div>
  </header>
);

export default Header;
