'use strict';

const React = require('react');

const Intro = function () {
  return (
    <div className={ 'wk-feed' }>
      <div className='wk-bar' />
      <div className='wk-bar'>News</div>
      <div className='wk-feed__items'>
        <section className='wk-feed__item'>
          <h2 className='wk-feed__item__title'><span className='wk-feed__item__date'>20.06.2017</span> Hello wolkenkit <span className='wk-emoji'>🎉</span></h2>
          <p>
            Finally, we have released wolkenkit, a semantic JavaScript backend. It
            empowers you to setup an API for your business to bridge the language
            gap between your domain and technology. <a href='/latest/getting-started/understanding-wolkenkit/why-wolkenkit/'>Want to get started?</a>
          </p>
        </section>
      </div>
    </div>
  );
};

module.exports = Intro;
