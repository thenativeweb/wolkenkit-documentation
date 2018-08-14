'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react');

const HighlightText = require('./HighlightText.jsx');

const styles = theme => ({
  Keywords: {
    'padding-top': 10,
    'font-size': 12
  },

  Keyword: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.2)',
    'border-radius': 8,
    padding: '0px 7px 1px 7px',
    'margin-right': 8,
    color: theme.color.brand.dark,
    'margin-bottom': 8
  }
});

const Keywords = ({ classes, className, keywords, searchWords }) => {
  if (!keywords) {
    return null;
  }

  return (
    <div className={ classNames(classes.Keywords, className) }>
      { keywords.sort((left, right) => left.localeCompare(right)).map(keyword => (
        <span key={ keyword } className={ classes.Keyword }>
          <HighlightText searchWords={ searchWords }>{ keyword }</HighlightText>
        </span>
      ))}
    </div>
  );
};

module.exports = injectSheet(styles)(Keywords);
