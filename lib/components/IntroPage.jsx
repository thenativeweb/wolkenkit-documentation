'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react'),
      { Product, View } = require('thenativeweb-ux');

const Feed = require('./Feed.jsx');

const styles = theme => ({
  IntroPage: {
    flex: theme.contentFlex,
    width: theme.contentWidth,
    overflow: 'hidden',
    transition: 'width 800ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'will-change': 'width'
  },

  IsCollapsed: {
    flex: '0 0 auto',
    width: '0px',

    '& $Brand': {
      opacity: 0
    }
  },

  Brand: {
    transition: 'opacity 400ms',
    'will-change': 'opacity'
  },

  Title: {
    'font-size': theme.font.size.large,
    'text-align': 'center',
    color: theme.color.brand.white
  },

  [theme.device.small]: {
    IntroPage: {
      'flex-direction': 'column',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },

    Brand: {
      flex: '0 0 40vh',
      height: '40vh'
    },

    Title: {
      'font-size': theme.font.size.small,
      'text-align': 'center',
      color: theme.color.brand.white
    }
  }
});

const IntroPage = function ({ classes, isCollapsed }) {
  const componentClasses = classNames(classes.IntroPage, {
    [classes.IsCollapsed]: isCollapsed
  });

  /* eslint-disable no-process-env */
  const newsUrl = process.env.NEWS_URL || 'https://docs.wolkenkit.io/news.json';
  /* eslint-enable no-process-env */

  return (
    <View orientation='horizontal' background='dark' className={ componentClasses }>
      <View className={ classes.Brand } orientation='vertical' alignItems='center' justifyContent='center' adjust='flex'>
        <Product name='wolkenkit' isAnimated={ !isCollapsed } size='xl' />
        <div className={ classes.Title }>Documentation</div>
      </View>
      <Feed url={ newsUrl } />
    </View>
  );
};

module.exports = injectSheet(styles)(IntroPage);
