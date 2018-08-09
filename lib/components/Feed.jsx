'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('./Bar.jsx'),
      FeedFallback = require('./FeedFallback.jsx'),
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
    const { url } = this.props;

    news.load({
      url
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

    return feed.map(item => <FeedItem key={ `${item.date.year}${item.date.month}${item.date.day}${item.title}` } item={ item } />);
  }

  render () {
    return (
      <div className={ 'wk-feed' }>
        <Bar />
        <Bar>News</Bar>
        <div className='wk-feed__items'>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  url: PropTypes.string.isRequired
};

module.exports = Feed;
