import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { STATE_KEY } from '../constants';
import { ProgressShape } from '../shapes';


class LoadingBarWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selector = this.context.store[STATE_KEY];
  }

  render() {
    return <LoadingBar progressState={this.props.state[this.selector]} {...this.props} />;
  }
}

LoadingBarWrapper.contextTypes = {
  store: React.PropTypes.object.isRequired
};

LoadingBarWrapper.propTypes = {
  state: ProgressShape.isRequired
};

export default connect(state => ({ state }))(LoadingBarWrapper);

// eslint-disable-next-line
class LoadingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      noTransition: false
    };
  }

  componentWillReceiveProps(newProps) {
    const { progressState } = newProps;
    // eslint-disable-next-line
    let completed = 1 - ((progressState.running + progressState.fakeRunning) / (progressState.complete + progressState.fakeComplete + progressState.running + progressState.fakeRunning));
    if(isNaN(completed)) completed = 1;
    this.setState(prevState => ({ value: completed, noTransition: prevState.value > completed }));
  }

  render() {
    const { className, theme, alwaysShow } = this.props;
    const style = { width: `${this.state.value * 100}%` };
    if(this.state.noTransition) style.transition = 'none';
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
  className: React.PropTypes.string,
  // eslint-disable-next-line
  progressState: ProgressShape.isRequired,
  alwaysShow: React.PropTypes.bool
};

LoadingBar.defaultProps = {
  className: '',
  alwaysShow: false
};
