import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import { connect } from 'react-redux';
import { StepButton } from '../../components/Button';
import { Row, Col } from 'react-bootstrap';

import { fetchRoofEstimates } from '../../actions';

import './ResultContainer.scss';

class ResultContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calculations: {
        roof: {
          base_area: props.calculations.base_area || '',
          true_roof_area: props.calculations.true_roof_area || '',
          pitch: props.calculations.pitch || '',
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ calculations: nextProps.calculations });
    console.log("Just got new props:", this.state);
  }

  renderMaterials(list) {
    if (!list) return;

    console.log({list})

    let content = list.map(it => {
      console.log(it);
      return (
        <tr><td><strong>{it.title}:</strong></td><td>{it.value}</td></tr>
        )
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Artikkel</th>
            <th>Antall</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    );

    return content.length ? <table className="table">{content}</table> : <div>Ingen materialer</div>
  }

  render() {
    console.log('Selected:', this.props);
    return(
      <div className="page">
        <HeaderBar />
        <div className="result-container">
          <Row>
            <Col md={5} sm={12} className="equal-height-col">
              <section className="section-half">
                <div className="step-description">
                  <h1>{this.props.roofs.selected.title || ''}</h1>
                  <div className="selectedImg my-5">
                    <img src={this.props.roofs.selected.imgurl || ''} />
                  </div>
                    {
                      this.props.calculations.roof &&
                      this.props.calculations.isUpdated &&
                      <div className="measurements my-2">
                        <strong>Grunnareal: </strong>{this.props.calculations.roof.baseRoofArea || ''} <br />
                        <strong>Faktisk areal: </strong>{this.props.calculations.roof.trueRoofArea}
                      </div>
                      
                    }
                  <div className="text">
                    {this.props.roofs.selected.description || ''}
                  </div>
                </div>
              </section>
            </Col>
            <Col md={7} sm={12} className="equal-height-col">
              <section className="section-half input-section margin-auto">
                <h1>Oppsummering</h1>
                <div className="material-summary">
                  {this.renderMaterials(this.props.calculations.materials)}
                </div>
              </section>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="btnrow">
                <StepButton dest="/step-2" text="Tilbake" />
                <StepButton dest="/step-4" text="Neste" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    roofs: state.roofs,
    calculations: state.calculations,
    form: state.form,
  }
};

export default connect(mapStateToProps, { fetchRoofEstimates })(ResultContainer);