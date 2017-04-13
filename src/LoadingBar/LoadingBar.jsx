import React, { Component, PropTypes } from 'react';
import { STATE_KEY } from '../constants';
import { connect } from 'react-redux';
import cx from 'classnames';


class LoadingBarWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.memoizedSelector = this.context.store[STATE_KEY];
  }

  render() {
    return <LoadingBar progressState={this.props.state[this.memoizedSelector]} {...this.props} />;
  }
}

LoadingBarWrapper.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default connect((state) => ({ state }))(LoadingBarWrapper);

class LoadingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      noTransition: false
    };
  }

  componentWillReceiveProps(newProps) {
    const { progressState } = newProps;
    let completed = 1 - (progressState.running / (progressState.complete + progressState.running));
    if(isNaN(completed)) completed = 1;
    this.setState((prevState) => ({ value: completed, noTransition: prevState.value > completed }));
  };

  render() {
    const { className, progressState, theme, alwaysShow } = this.props;
    const completed = this.state.value;
    const style = { width: `${this.state.value * 100}%`};
    if(this.state.noTransition) style['transition'] = 'none';
    return (
      <div
        className={cx(
          className,
          theme.progressContainer,
          { [theme.progressHidden]: (this.state.value === 1 || this.state.value === 0) && !alwaysShow }
          )
        }
      >
        <div className={cx(theme.progressTrack)}>
          <div className={cx(theme.progressValue)} style={style} />
        </div>
      </div>
    );
  }
}

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
