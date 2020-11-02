import React, { memo, useContext } from 'react';

import { ApiContext } from '@/presentation/contexts';
import { useHistory } from 'react-router-dom';

import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const history = useHistory();

  const { setCurrentAccount } = useContext(ApiContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <div className={Styles.logoWrap}>
          <h1>ASKIT</h1>
        </div>
        <div className={Styles.logoutWrap}>
          <span>Isaque</span>
          <a data-testid="logout" href="/#" onClick={logout}>Logout</a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
