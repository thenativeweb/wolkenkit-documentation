'use strict';

const color = require('color');

const contentPanelBackground = '#f7f7f7',
      pageContentMaxWith = 800,
      tableCellPadding = '8px 8px 10px 8px';

const styles = theme => ({
  PageContent: {
    flex: theme.contentFlex,
    width: theme.contentWidth,
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    transition: 'width 800ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'will-change': 'width',
    background: theme.color.content.background,

    '& > *': {
      width: theme.contentWidth
    }
  },

  IsCollapsed: {
    flex: '0 0 auto',
    width: 0
  },

  Page: {
    padding: [ 0, theme.grid.stepSize * 4.8 ],
    'font-size': theme.font.size.copytext,

    '& a': {
      'font-weight': 400
    },

    '& h1, h2, h3, h4, h5': {
      margin: '1em 0 0.5em 0',
      'line-height': '1.1',
      position: 'relative',
      'font-family': theme.font.family.headline,
      'margin-top': theme.grid.stepSize * 5,
      'font-weight': 500
    },

    '& h1': {
      'font-size': '40px'
    },

    '& h2': {
      'font-size': '25px'
    },

    '& h3': {
      'font-size': '20px'
    },

    '& h4': {
      'font-size': theme.font.family.copytext,
      'font-family': theme.font.family.default,
      'font-weight': 600
    },

    '& h5': {
      'font-size': theme.font.family.copytext,
      'font-family': theme.font.family.default,
      'font-weight': 600
    },

    '& .header-anchor': {
      position: 'absolute',
      display: 'block',
      left: '-22px',
      top: '50%',
      'margin-top': '-0.55em',
      'padding-right': '10px',
      'font-size': '25px',
      color: theme.color.content.background,
      'font-weight': 'normal'
    },

    '& h1:hover .header-anchor, h2:hover .header-anchor, h3:hover .header-anchor, h4:hover .header-anchor, h5:hover .header-anchor': {
      color: theme.color.brand.highlight
    },

    '& p, ul, ol': {
      'max-width': pageContentMaxWith,
      'font-weight': 300,
      color: theme.color.copyText
    },

    '& p': {
      margin: [ theme.grid.stepSize * 1.5, 0 ]
    },

    '& img': {
      'margin-top': theme.grid.stepSize * 3,
      width: '100%'
    },

    '& pre, code': {
      'font-family': theme.font.family.code,
      'font-size': theme.font.size.code
    },

    '& pre': {
      'max-width': pageContentMaxWith,
      'margin-top': theme.grid.stepSize * 1.5,
      'margin-bottom': theme.grid.stepSize * 5,
      padding: 0,
      border: 0,

      '& .hljs': {
        padding: [ theme.grid.stepSize * 1.5, theme.grid.stepSize * 2 ]
      }
    },

    '& p code, & ul li code, & table code': {
      padding: '0.25em 0.3em',
      'background-color': color(theme.color.brand.highlight).
        fade(0.9).
        rgb().
        string(),
      'border-radius': 0,
      'font-size': theme.font.size.default
    },

    '& ul': {
      margin: '0.5em 0 1em 0em',
      padding: 0,
      'padding-left': '1em',
      'text-indent': '-0.85em',

      '& ul': {
        'margin-left': '1.5em'
      },

      '& li': {
        margin: 0,
        padding: 0,
        'padding-bottom': '0.25em',
        'list-style-type': 'none'
      },

      '& li:before': {
        'margin-right': '0.5em',
        content: '"\\2022"'
      }
    },

    '& table': {
      width: '100%',
      'max-width': pageContentMaxWith,
      'margin-bottom': theme.grid.stepSize * 2,
      'border-bottom': `1px solid ${theme.color.content.border}`,
      'font-weight': 300,

      '& th:first-child, & td:first-child': {
        'padding-left': theme.grid.stepSize * 1.5
      },

      '& th:last-child, & td:last-child': {
        'padding-right': theme.grid.stepSize * 1.5
      },

      '& thead': {
        '& th': {
          padding: tableCellPadding,
          'vertical-align': 'top',
          background: contentPanelBackground
        },

        '& th:last-child': {
          'border-right': `1px solid ${theme.color.content.border}`
        }
      },

      '& tbody': {
        '& td': {
          padding: tableCellPadding,
          'vertical-align': 'top',
          'border-top': `1px solid ${theme.color.content.border}`
        },

        '& tr:first-child td': {
          'border-top': 'none'
        },

        '& td:first-child': {
          'border-left': `1px solid ${theme.color.content.border}`
        },

        '& td:last-child': {
          'border-right': `1px solid ${theme.color.content.border}`
        }
      }
    },

    '& blockquote': {
      'max-width': pageContentMaxWith,
      padding: [ theme.grid.stepSize * 3, theme.grid.stepSize * 6, theme.grid.stepSize * 3, theme.grid.stepSize * 3 ],
      margin: [ theme.grid.stepSize * 1.5, theme.grid.stepSize * 3, theme.grid.stepSize * 1.5, 0 ],
      background: contentPanelBackground,

      '& p:first-child': {
        'margin-top': 0
      }
    },

    '& .hint-congrats, & .hint-question, & .hint-tip, & .hint-warning, & .hint-wisdom': {
      position: 'relative',
      'max-width': pageContentMaxWith,
      'margin-top': theme.grid.stepSize * 6,
      'margin-bottom': theme.grid.stepSize * 6,

      '& blockquote': {
        'border-left': 'none',
        'margin-left': '224px',
        'border-radius': theme.grid.stepSize,

        '& strong': {
          'font-family': 'Kalam',
          'font-size': '24px',
          'letter-spacing': '0.5px'
        }
      },

      '& blockquote:after': {
        position: 'absolute',
        'border-color': `transparent ${contentPanelBackground} transparent transparent`,
        'border-style': 'solid',
        'border-width': theme.grid.stepSize,
        top: '50%',
        content: '""',
        left: 0,
        'margin-left': '205px',
        'margin-top': theme.grid.stepSize / -2
      },

      '&::after': {
        position: 'absolute',
        width: '200px',
        height: '200px',
        left: '10px',
        top: '50%',
        'margin-top': '-100px',
        content: '""',
        'background-repeat': 'no-repeat'
      }
    },

    '& .hint-congrats::after': {
      'background-image': `url('/mascot/congrats-medium.svg')`
    },

    '& .hint-question::after': {
      'background-image': `url('/mascot/question-medium.svg')`
    },

    '& .hint-tip::after': {
      'background-image': `url('/mascot/tip-medium.svg')`
    },

    '& .hint-warning::after': {
      'background-image': `url('/mascot/warning-medium.svg')`
    },

    '& .hint-wisdom::after': {
      'background-image': `url('/mascot/wisdom-medium.svg')`
    },

    '& .read-model, .write-model, .flows': {
      'padding-left': theme.grid.stepSize * 3,
      'margin-bottom': theme.grid.stepSize * 8,
      'margin-left': 115,
      'border-left': '1px solid #eeeeee',
      position: 'relative',

      '& p': {
        'max-width': pageContentMaxWith - 3 * theme.grid.stepSize - 115
      },

      '&::after': {
        position: 'absolute',
        width: 80,
        height: 80,
        left: -115,
        top: 0,
        content: '""',
        'background-repeat': 'no-repeat'
      }
    },

    '& .read-model::after': {
      'background-image': `url('/data-flow/read-model.svg')`
    },

    '& .write-model::after': {
      'background-image': `url('/data-flow/write-model.svg')`
    },

    '& .flows::after': {
      'background-image': `url('/data-flow/flows.svg')`
    }
  },

  [theme.device.small]: {
    PageContent: {
      flex: '3 3 100vw',
      width: '100vw',

      '& > *': {
        width: '100vw'
      }
    },

    IsCollapsed: {
      flex: '0 0 auto',
      width: 0
    },

    Page: {
      'padding-right': theme.grid.stepSize * 1.5,

      '& .header-anchor': {
        color: theme.color.brand.highlight
      },

      '& h1, h2, h3, h4, h5': {
        margin: [ theme.grid.stepSize * 2.5, 0, 0, 0 ]
      },

      '& h1': {
        'font-size': 26
      },

      '& h2': {
        'font-size': 20
      },

      '& h3': {
        'font-size': 18
      },

      '& h4': {
        'font-size': 18
      },

      '& h5': {
        margin: 0,
        'font-size': 18
      },

      '& ul ul': {
        'margin-left': '0em'
      },

      '& .hint-congrats, & .hint-question, & .hint-tip, & .hint-warning, & .hint-wisdom': {
        '& blockquote': {
          padding: theme.grid.stepSize * 1.5,
          'margin-top': 180,
          'margin-left': 0,

          '&::after': {
            top: 0,
            left: '50%',
            'margin-left': -theme.grid.stepSize,
            'margin-top': -theme.grid.stepSize * 2,
            'border-color': `transparent transparent ${contentPanelBackground} transparent`
          }
        },

        '&::after': {
          left: '50%',
          top: -170,
          'margin-left': -80,
          'margin-top': 0,
          width: 160,
          height: 160
        }
      },

      '& .read-model, .write-model, .flows': {
        'padding-left': 0,
        'margin-top': 115 + theme.grid.stepSize * 6,
        'margin-bottom': theme.grid.stepSize * 8,
        'margin-left': 0,
        'border-left': 'none',

        '&::after': {
          top: -115,
          left: 0
        }
      }
    }
  }

  // /* Extra Small Devices, Phones */
  // @media only screen and (max-width : 768px) {
  //   .wk-page-content {
  //   }
  //
  //   .wk-mobile--nav-visible .wk-page-content {
  //     overflow: hidden;
  //   }
  //   .wk-mobile--nav-visible {
  //     overflow: hidden;
  //   }
  // }
});

module.exports = styles;
