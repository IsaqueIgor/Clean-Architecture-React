import React, { memo, useContext } from 'react';

import { ApiContext } from '@/presentation/contexts';
import { useLogout } from '@/presentation/hooks';

import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const logout = useLogout();

  const { getCurrentAccount } = useContext(ApiContext);

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    logout();
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <div className={Styles.logoWrap}>
          <h1>ASKIT</h1>
        </div>
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="/#" onClick={buttonClick}>Logout</a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
