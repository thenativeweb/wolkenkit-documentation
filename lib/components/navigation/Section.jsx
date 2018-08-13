'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Icon, Text } = require('thenativeweb-ux');

const styles = theme => ({
  Section: {
    flex: '1 1 100%',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'align-items': 'center',
    'border-bottom': '1px solid rgba(255,255,255, 0.1)',

    '& a:link, & a:visited, & a:active': {
      flex: '1 1 100%',
      display: 'flex',
      'flex-direction': 'row',
      'justify-content': 'space-between',
      'align-items': 'center',
      'text-decoration': 'none',
      padding: [ theme.grid.stepSize, theme.grid.stepSize * 1.5 ],
      color: theme.color.brand.white
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  Chevron: {
    fill: theme.color.brand.white,
    'margin-left': theme.grid.stepSize
  },

  Label: {
    flex: '1 1 100%',
    padding: 0
  },

  IsActive: {
    'font-weight': 800
  }
});

class Section extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleItemClicked = this.handleItemClicked.bind(this);
  }

  handleItemClicked (event) {
    const { onClick, path } = this.props;

    event.preventDefault();
    event.stopPropagation();

    onClick(path);
  }

  render () {
    const { classes, isActive, title } = this.props;

    const componentClasses = classNames(classes.Section, {
      [classes.IsActive]: isActive
    });

    return (
      <div className={ componentClasses }>
        <a href='#' onClick={ this.handleItemClicked }>
          <Text className={ classes.Label }>{ title }</Text>
          <Icon className={ classes.Chevron } name='chevron' size='s' />
        </a>
      </div>
    );
  }
}

Section.propTypes = {
  isActive: PropTypes.bool.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

module.exports = injectSheet(styles)(Section);
