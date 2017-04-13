var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import { STATE_KEY } from '../constants';
import { connect } from 'react-redux';
import cx from 'classnames';

var LoadingBarWrapper = function (_Component) {
  _inherits(LoadingBarWrapper, _Component);

  function LoadingBarWrapper(props, context) {
    _classCallCheck(this, LoadingBarWrapper);

    var _this = _possibleConstructorReturn(this, (LoadingBarWrapper.__proto__ || Object.getPrototypeOf(LoadingBarWrapper)).call(this, props, context));

    _this.memoizedSelector = _this.context.store[STATE_KEY];
    return _this;
  }

  _createClass(LoadingBarWrapper, [{
    key: 'render',
    value: function render() {
      return React.createElement(LoadingBar, _extends({ progressState: this.props.state[this.memoizedSelector] }, this.props));
    }
  }]);

  return LoadingBarWrapper;
}(Component);

LoadingBarWrapper.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default connect(function (state) {
  return { state: state };
})(LoadingBarWrapper);

var LoadingBar = function (_Component2) {
  _inherits(LoadingBar, _Component2);

  function LoadingBar(props) {
    _classCallCheck(this, LoadingBar);

    var _this2 = _possibleConstructorReturn(this, (LoadingBar.__proto__ || Object.getPrototypeOf(LoadingBar)).call(this, props));

    _this2.state = {
      value: 1,
      noTransition: false
    };
    return _this2;
  }

  _createClass(LoadingBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var progressState = newProps.progressState;

      var completed = 1 - progressState.running / (progressState.complete + progressState.running);
      if (isNaN(completed)) completed = 1;
      this.setState(function (prevState) {
        return { value: completed, noTransition: prevState.value > completed };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          progressState = _props.progressState,
          theme = _props.theme,
          alwaysShow = _props.alwaysShow;

      var completed = this.state.value;
      var style = { width: this.state.value * 100 + '%' };
      if (this.state.noTransition) style['transition'] = 'none';
      return React.createElement(
        'div',
        {
          className: cx(className, theme.progressContainer, _defineProperty({}, theme.progressHidden, (this.state.value === 1 || this.state.value === 0) && !alwaysShow))
        },
        React.createElement(
          'div',
          { className: cx(theme.progressTrack) },
          React.createElement('div', { className: cx(theme.progressValue), style: style })
        )
      );
    }
  }]);

  return LoadingBar;
}(Component);

LoadingBar.propTypes = {
  className: PropTypes.string,
  progressState: PropTypes.shape({
    running: PropTypes.number.isRequired,
    complete: PropTypes.number.isRequired
  }).isRequired,
  alwaysShow: PropTypes.bool
};

LoadingBar.defaultProps = {
  className: '',
  alwaysShow: false
};