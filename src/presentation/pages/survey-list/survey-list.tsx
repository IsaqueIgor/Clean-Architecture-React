import React from 'react';

import { Footer, Header } from '@/presentation/components';

import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => (
  <div className={Styles.surveyListWrap}>
    <Header />
    <main className={Styles.contentWrap}>
      <h2>Surveys</h2>
      <span>Below are the public polls</span>
      <ul>
        <li>
          <div className={Styles.surveyContent}>
            <div className={[Styles.iconWrap, Styles.green].join(' ')}>
              <img
                className={Styles.icon}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII="
                alt="thumbUp"
              />
            </div>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favotiro?</p>
          </div>
          <footer>See Results</footer>
        </li>
      </ul>
    </main>
    <Footer />
  </div>
);

export default SurveyList;
