'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Icon = require('./Icon.jsx');

class Dropdown extends React.PureComponent {
  static renderOption (option) {
    return (
      <a
        key={ option }
        data-option={ option }
        href={ `/${option}/` }
        className='wk-dropdown__option'
      >
        { option }
      </a>
    );
  }

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

  render () {
    const { selected, options } = this.props;
    const { isOpen } = this.state;

    let dropdownClasses = 'wk-dropdown';

    if (isOpen) {
      dropdownClasses += ' wk-dropdown--open';
    }

    return (
      <div className={ dropdownClasses } ref={ this.storeContainerRef }>
        <a href='#open' className='wk-dropdown__value' onClick={ this.handleValueClicked }>
          <span>{selected}</span>
          <Icon name='expand' />
        </a>
        <div className='wk-dropdown__options' onClick={ this.handleOptionClicked }>
          {options.map(Dropdown.renderOption)}
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

module.exports = Dropdown;
