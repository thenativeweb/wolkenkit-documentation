'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Icon } = require('thenativeweb-ux');

const styles = theme => ({
  Dropdown: {
    position: 'relative',
    display: 'flex',
    'flex-direction': 'row',
    'min-height': theme.grid.stepSize * 3,
    'align-items': 'center'
  },

  IsOpen: {
    '& $Value': {
      cursor: 'pointer'
    },

    '& $ExpandIcon': {
      fill: theme.color.brand.highlight,
      transform: 'rotate(270deg)'
    },

    '& $Options': {
      display: 'flex'
    }
  },

  Value: {
    cursor: 'pointer',
    '&:hover $ExpandIcon': {
      fill: theme.color.brand.highlight
    }
  },

  ExpandIcon: {
    width: 11,
    height: 11,
    transform: 'rotate(90deg)',
    'margin-left': 5,
    fill: 'rgba(255, 255, 255, 0.65)'
  },

  Options: {
    position: 'absolute',
    background: theme.color.brand.white,
    top: theme.grid.stepSize * 3,
    left: 0,
    'margin-left': -5,
    padding: '3px 11px 2px 10px',
    display: 'none',
    'flex-direction': 'column',
    'z-index': theme.zIndex.overlay,

    '& a, & a:visited': {
      'line-height': `${theme.grid.stepSize * 3}px`,
      'font-size': theme.font.size.default,
      color: theme.color.brand.dark,
      background: 'transparent',
      display: 'block'
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  Option: {

  }
});

class Dropdown extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.storeContainerRef = this.storeContainerRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleValueClicked = this.handleValueClicked.bind(this);
    this.handleOptionClicked = this.handleOptionClicked.bind(this);
  }

  componentDidMount () {
    global.document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount () {
    global.document.removeEventListener('click', this.handleClickOutside, true);
  }

  storeContainerRef (ref) {
    this.containerRef = ref;
  }

  handleClickOutside (event) {
    if (this.containerRef && !this.containerRef.contains(event.target)) {
      this.setState({
        isOpen: false
      });
    }
  }

  handleValueClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleOptionClicked (event) {
    const { onChange } = this.props;

    event.preventDefault();
    event.stopPropagation();

    const newOption = event.target.getAttribute('data-option');

    onChange(newOption);

    this.setState({
      isOpen: false
    });
  }

  renderOption (option) {
    const { classes } = this.props;

    return (
      <a
        key={ option }
        data-option={ option }
        href={ `/${option}/` }
        className={ classes.Option }
      >
        { option }
      </a>
    );
  }

  render () {
    const { classes, selected, options } = this.props;
    const { isOpen } = this.state;

    const componentClasses = classNames(classes.Dropdown, {
      [classes.IsOpen]: isOpen
    });

    return (
      <div className={ componentClasses } ref={ this.storeContainerRef }>
        <a href='#open' className={ classes.Value } onClick={ this.handleValueClicked }>
          <span>{selected}</span>
          <Icon className={ classes.ExpandIcon } name='expand' />
        </a>
        <div className={ classes.Options } onClick={ this.handleOptionClicked }>
          { options.map(this.renderOption.bind(this)) }
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

module.exports = injectSheet(styles)(Dropdown);
