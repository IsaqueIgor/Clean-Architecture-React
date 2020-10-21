import React, { memo } from 'react';

import Styles from './header-styles.scss';

const Header: React.FC = () => (
  <header className={Styles.headerWrap}>
    <div className={Styles.headerContent}>
      <div className={Styles.logoWrap}>
        <h1>ASKIT</h1>
      </div>
      <div className={Styles.logoutWrap}>
        <span>Isaque</span>
        <a href="/#">Logout</a>
      </div>
    </div>
  </header>
);

export default memo(Header);
