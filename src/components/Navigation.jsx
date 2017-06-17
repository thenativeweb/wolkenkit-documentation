'use strict';

const React = require('react');

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
  activePath: React.PropTypes.array.isRequired,
  history: React.PropTypes.object.isRequired,
  metadata: React.PropTypes.object.isRequired,
  showLogo: React.PropTypes.bool.isRequired,
  onLogoClick: React.PropTypes.func.isRequired,
  onNavigated: React.PropTypes.func.isRequired,
  onVersionChange: React.PropTypes.func.isRequired
};

module.exports = Navigation;
