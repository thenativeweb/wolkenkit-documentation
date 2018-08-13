'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('../Bar/index.jsx');

const MenuBar = ({ backLabel, onBack, onShowSearch }) => (
  <Bar>
    {
      backLabel ?
        <Bar.BackAction onClick={ onBack }>{ backLabel }</Bar.BackAction> :
        <Bar.Left>Table of contents</Bar.Left>
    }
    <Bar.Action onClick={ onShowSearch } icon='search' />
  </Bar>
);

MenuBar.propTypes = {
  onBack: PropTypes.func.isRequired,
  onShowSearch: PropTypes.func.isRequired,
  backLabel: PropTypes.string
};

module.exports = MenuBar;
