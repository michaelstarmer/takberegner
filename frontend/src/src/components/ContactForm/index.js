import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap';
import { StepButton, FormStepButton } from '../../components/Button';
import { fetchRoofEstimates, fetchMaterialEstimates } from '../../actions';

import './ContactForm.scss';


class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectNext: false,
    }
  }

  renderAngleInput({ input, label, type }) {
    return (
      <div className="f-input f-input--angle form-group">
        <input {...input} type={type} placeholder={label} className="form-control no-spin-btns" />
      </div>
    )
  }

  renderLengthInput({ input, label, type }) {
    return (
      <div className="f-input f-input--side form-group">
        <input {...input} type={type} placeholder={label} className="form-control" />
      </div>
    )
  }

  renderAngles(roof) {
    let fields = [];
    for (let i = 0; i < roof.anglesnumber; i++) {
      fields.push(<Field
        key={i}
        name={`angles[${i}]`}
        type="number"
        component={this.renderAngleInput}
        label={`V${i+1}`}
      />)
    }
    return fields;
  }

  renderLengths(roof) {
    let fields = [];
    for(let i = 0; i < roof.sidesnumber; i++) {
      fields.push(<Field
        key={i}
        name={`lengths[${i}]`}
        type="number"
        component={this.renderLengthInput}
        label={`Side ${i}`}
      />)
    }
    return fields;
  }

  onSubmit = (formValues) => {
    console.log("FORM SUBMITTED:", formValues);
    this.props.fetchRoofEstimates(formValues.lengths, formValues.angles);
    this.props.fetchMaterialEstimates(formValues.lengths, formValues.angles);
    this.setState({ redirectNext: true });
  }

  render() {
    if (this.state.redirectNext) {
      return <Redirect to="/step-3" />
    }
    return (
      <div className="contact-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-row">
            <Col xs={12} sm={{ span: 4 }}>
              <h2>Sider</h2>
              {this.renderLengths(this.props.roof)}
            </Col>
            <Col xs={12} sm={{span: 4, offset: 2}}>
              <h2>Vinkler</h2>
              {this.renderAngles(this.props.roof)}
            </Col>
          </div>
          <div className="btnrow">
            <StepButton dest="/step-1" text="Tilbake" />
            <FormStepButton onClick={this.submitForm} text="Neste" />
          </div>
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    contactForm: state.form,
  }
}

const reduxConnector = connect(mapStateToProps, { fetchRoofEstimates, fetchMaterialEstimates });

ContactForm = reduxForm({
  form: 'contactForm',
})(ContactForm);

export default reduxConnector(ContactForm);