function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { STATE_KEY } from '../constants';
import cx from 'classnames';

function mapStateToProps(state) {
    return {
        progressState: state[STATE_KEY]
    };
}

function LoadingBar(props) {
    var className = props.className,
        progressState = props.progressState,
        theme = props.theme,
        alwaysShow = props.alwaysShow;

    var passedClassName = className ? className : '';
    var completed = progressState.running / (progressState.complete + progressState.running);
    return React.createElement(
        'div',
        { className: cx(passedClassName, theme.progressContainer, _defineProperty({}, theme.progressHidden, !!alwaysShow || completed == 1)) },
        React.createElement(
            'div',
            { className: cx(theme.progressTrack) },
            React.createElement('div', { className: cx(theme.progressValue), style: { width: completed * 100 + '%' } })
        )
    );
}

export default connect(mapStateToProps, { pure: true })(LoadingBar);