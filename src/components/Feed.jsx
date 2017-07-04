'use strict';

const React = require('react');

const FeedFallback = require('./FeedFallback.jsx'),
      FeedItem = require('./FeedItem.jsx'),
      LoadingIndicator = require('./LoadingIndicator.jsx'),
      news = require('../services/news');

class Feed extends React.PureComponent {
  constructor () {
    super();

    this.state = {
      isLoading: true,
      feed: undefined
    };
  }

  componentDidMount () {
    news.load({
      url: '/news.json'
    }, (err, feed) => {
      if (err) {
        return this.setState({
          isLoading: false
        });
      }

      this.setState({
        isLoading: false,
        feed
      });
    });
  }

  renderContent () {
    const { feed, isLoading } = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!feed) {
      return <FeedFallback />;
    }

    return feed.map(item => <FeedItem key={ item.id } item={ item } />);
  }

  render () {
    return (
      <div className={ 'wk-feed' }>
        <div className='wk-bar' />
        <div className='wk-bar'>News</div>
        <div className='wk-feed__items'>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

module.exports = Feed;
