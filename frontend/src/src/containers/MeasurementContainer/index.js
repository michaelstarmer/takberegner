import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import ContactForm from '../../components/ContactForm';
import { connect } from 'react-redux';
import { StepButton } from '../../components/Button';
import { Row, Col } from 'react-bootstrap';

import './MeasurementContainer.scss';

class MeasurementContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitForm: false,
    }
  }

  submitForm = () => {
    this.setState({ submitForm: true });
  }

  render() {
    console.log('Measurement:', this.props)
    return (
      <div className="page">
        <HeaderBar />
        <div className="measurement-container">
          <Row>
            <Col md={5} sm={12} className="equal-height-col">
              <section className="section-half">
                <div className="step-description">
                  <h1>{this.props.roofs.selected.title || ''}</h1>
                  <div className="selectedImg my-5">
                    <img src={this.props.roofs.selected.imgurl || ''} />
                  </div>
                  <div className="text">{this.props.roofs.selected.description || ''}</div>
                </div>
              </section>
            </Col>
            <Col md={7} sm={12} className="equal-height-col">
              <section className="section-half input-section">
                <ContactForm roof={this.props.roofs.selected} />
              </section>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <div className="btnrow">
                <StepButton dest="/step-1" text="Tilbake" />
                <StepButton onClick={this.submitForm} dest="/step-3" text="Neste"/>
              </div>
            </Col>
          </Row> */}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    roofs: state.roofs,
  }
}

export default connect(mapStateToProps, null)(MeasurementContainer);