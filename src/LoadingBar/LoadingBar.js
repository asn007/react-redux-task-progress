import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { STATE_KEY } from '../constants'
import cx from 'classnames'

function mapStateToProps(state, props) {
    props['progressState'] = state[STATE_KEY];
}

function LoadingBar(props) {
    const { className, progressState, theme, alwaysShow } = props;
    const passedClassName = className ? className : '';
    const completed = progressState.running / (progressState.complete + progressState.running);
    return (
      <div className={cx(passedClassName, theme.progressContainer, { [theme.progressHidden]: !!alwaysShow || completed == 1 })}>
          <div className={cx(theme.progressTrack)}>
              <div className={cx(theme.progressValue)} style={{ width: `${completed * 100}%` }}></div>
          </div>
      </div>
    );
}

export default connect(mapStateToProps, { pure: true })(LoadingBar);