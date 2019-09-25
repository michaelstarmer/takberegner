import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

const StepButton = props => {
  return <Link className="stepBtn stepBtn--fixed-width" to={props.dest}>{props.text || 'Neste'}</Link>
}

const FormStepButton = props => {
  return <button type="submit" className="stepBtn stepBtn--fixed-width">{props.text || 'Neste'}</button>
}

export { StepButton, FormStepButton };