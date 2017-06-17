'use strict';

const React = require('react');

const Symbols = function () {
  return (
    <svg style={{ display: 'none' }}>
      <symbol id='icon-back' viewBox='0 0 24 24'>
        <path d='M7,6l2.038-2L17,12l-7.962,8L7,18.001L13,12L7,6z' />
      </symbol>

      <svg id='icon-breadcrumb-separator' viewBox='0 0 24 24'>
        <path d='M7,6l2.038-2L17,12l-7.962,8L7,18.001L13,12L7,6z' />
      </svg>

      <svg id='icon-chevron' viewBox='0 0 24 24'>
        <path d='M7,6l2.038-2L17,12l-7.962,8L7,18.001L13,12L7,6z' />
      </svg>

      <symbol id='icon-heart' viewBox='0 0 16 16'>
        <g><path d='M1.16,2.65a3.91,3.91,0,0,0,0,5.56L8,15l6.85-6.82A3.94,3.94,0,0,0,9.26,2.66L8,3.92,6.74,2.65A4,4,0,0,0,1.16,2.65Z' /></g>
      </symbol>

      <svg id='icon-expand' viewBox='0 0 24 24'>
        <path d='M7,6l2.038-2L17,12l-7.962,8L7,18.001L13,12L7,6z' />
      </svg>

      <symbol id='icon-nav' viewBox='0 0 24 24'>
        <path d='M20,8H4V6h16V8z M20,11H4v2h16V11z M20,16H4v2h16V16z' />
      </symbol>
    </svg>
  );
};

module.exports = Symbols;
