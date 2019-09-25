import React from 'react';
import { Link } from 'react-router-dom';

import { updateHomeState } from '../../actions/index';
import HeaderBar from '../../components/HeaderBar';
import './LandingContainer.scss';
import { connect } from 'react-redux';

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  setCurrentPage(status) {
    this.setState({ isLandingPage: status });
    this.props.updateHomeState(status);
  }

  componentDidMount() {
    this.setCurrentPage(true);
  }

  render() {
    return(
      <div className="page">
        <HeaderBar isHome={true} />
        <div className="landing-container">
          <Link className="startBtn" to='/step-1' onClick={e => this.setCurrentPage(false)}>Start</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLocation: state.appLocation.isLandingPage,
  }
}

export default connect(mapStateToProps, { updateHomeState })(LandingContainer);
