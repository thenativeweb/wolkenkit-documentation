'use strict';

const PropTypes = require('prop-types'),
      React = require('react');

const Header = require('./navigation/Header.jsx'),
      PageMenu = require('./navigation/PageMenu.jsx'),
      Pattern = require('./Pattern.jsx');

const Navigation = function (props) {
  const {
    activePath,
    history,
    metadata,
    showLogo,
    onNavigated,
    onLogoClick,
    onVersionChange
  } = props;

  return (
    <div className='wk-navigation'>
      <Pattern />
      <div className='wk-navigation__content'>
        <Header
          activePath={ activePath }
          history={ history }
          showLogo={ showLogo }
          versions={ Object.keys(metadata.navigation) }
          onLogoClick={ onLogoClick }
          onVersionChange={ onVersionChange }
        />
        <PageMenu
          activePath={ activePath }
          history={ history }
          metadata={ metadata }
          onNavigated={ onNavigated }
        />
      </div>
    </div>
  );
};

Navigation.propTypes = {
  activePath: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  showLogo: PropTypes.bool.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onNavigated: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired
};

module.exports = Navigation;
