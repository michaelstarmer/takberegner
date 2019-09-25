import React from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import { Row, Col } from 'react-bootstrap';
import { fetchRoofTypes, fetchRoofTypesSuccess } from '../../actions';
import { FaLightbulb } from 'react-icons/fa';

import { StepButton } from '../../components/Button';
import RoofType from '../../components/RoofType';

import './StepContainer.scss';

class StepContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    
    this.selectedItem = this.props.roofs.selected || null;
    
    this.state = {
      description: "asdmklfams",
      roofs: props.roofs,
    }
    
  }

  handleMouseEnter(e, i) {
    console.log("User is hovering. Item data:", e.target);
    //updateSelectedRoofType(this.props.key);
  }

  handleMouseLeave(e) {
    console.log("User not hovering anymore.");
  }

  componentDidMount() {
    this.props.fetchRoofTypes();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      roofs: nextProps.roofs
    })
  }

  renderInfoText(selectedItem) {
    console.log('RenderInfoText', {selectedItem, props: this.props.roofs})
    let content = (<div>No data</div>);

    if (selectedItem.id) {
      content = (<section className="section-half">
        <div className="step-description">
          <h1>{this.props.roofs.selected.title || ''}</h1>
          <div className="selectedImg my-5">
            <img src={this.props.roofs.selected.imgurl || ''} />
          </div>
          <div className="text">{selectedItem.description}</div>
        </div>
      </section>)
    } else {
      content = (
        <section className="section-half">
          <div className="step-description">
            <div className="ic"><FaLightbulb /></div>
            <div className="text">Start med å velge utformingen på taket du skal beregne. For mer komplekse former kan du også angi mål selv.</div>
          </div>
        </section>
      );
    }

    
    return content;
  }

  displayRoofTypes(list) {

    let content = (<div className="loading">Loading data...</div>);
    
    if (list) {
      content = list.map((it, i) => <RoofType key={i} roof={it} />);
      content = <Row>{content}</Row>
    }

    return content;
  }

  render() {
    return(
      <div className="page">
        <HeaderBar />
        <div className="step-container">
          <Row>
            <Col md={5} sm={12} className="equal-height-col">
              { this.renderInfoText(this.props.roofs.selected) }
            </Col>
            <Col md={7} sm={12}>
              <section className="section-half">
                <h2 className="section-header">Velg taktype</h2>
                { this.displayRoofTypes(this.state.roofs.all) }
              </section>
              <div className="btn-wrap my-5">
                {
                  this.state.roofs.selected &&
                  this.state.roofs.selected.id &&
                  (<StepButton dest="/step-2" text="Neste" />)
                  // (<a href="" className="btn btn-success btn-step">Neste</a>)
                }
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
  };
}

export default connect(mapStateToProps, { fetchRoofTypes, fetchRoofTypesSuccess })(StepContainer);