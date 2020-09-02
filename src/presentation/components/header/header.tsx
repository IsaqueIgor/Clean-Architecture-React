import React from 'react';

import Styles from './header-styles.scss';
import { Logo } from '@/presentation/components';

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
