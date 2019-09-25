import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

import { connect } from 'react-redux';

import './HeaderBar.scss';

class HeaderBar extends React.Component {

  constructor(props) {
    super(props);
    this.isHome = this.props.isHome;
  }

  componentDidMount() {
  }

  renderHeader() {
    return (
      <div className="header">
        <h1>Takberegner</h1>
      </div>
    );
  }

  renderProgressBar() {
    return (
      <div className="header-bar">
        <Row>
          <Col md={12}>
            <div className="p-bar">
              <Row>
                <Col md={4} xs={4}>
                  <div className="p-bar__step">
                    <h5>1. Taktype</h5>
                    <div className="p-icon p-icon--done">
                      <FaCheckCircle />
                    </div>
                  </div>
                </Col>
                <Col md={4} xs={4}>
                  <div className="p-bar__step">
                    <h5>2. Produkter</h5>
                    <div className="p-icon p-icon">
                      <FaCircle />
                    </div>
                  </div>
                </Col>
                <Col md={4} xs={4}>
                  <div className="p-bar__step">
                    <h5>3. Tilbehør</h5>
                    <div className="p-icon p-icon">
                      <FaCircle />
                    </div>
                  </div>
                </Col>
              </Row>

            </div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div className="page-landing">
        <div className="app-header">
          <Link className="logo" to="/">RoofCalc</Link>
        </div>
        {this.isHome ? this.renderHeader() : this.renderProgressBar()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLocation: state.appLocation,
  }
}

export default connect(mapStateToProps, null)(HeaderBar);