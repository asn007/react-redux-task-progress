import React from 'react';

export const ProgressShape = React.PropTypes.shape({
  running: React.PropTypes.number.isRequired,
  complete: React.PropTypes.number.isRequired,
  fakeRunning: React.PropTypes.number.isRequired,
  fakeComplete: React.PropTypes.number.isRequired
});
