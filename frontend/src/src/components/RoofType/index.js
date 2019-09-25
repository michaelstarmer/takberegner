import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FaCheck } from 'react-icons/fa';

import { updateSelectedRoofType } from '../../actions';
import './RoofType.scss';

// let styles = {
//   border: '1px solid red',
// }

class RoofType extends React.Component {

  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      previousSelected: null,
      selectedRoof: null,
      roofs: props.roofs || [],
    }
  }

  handleMouseEnter(e, key) {
    //const roof = this.state.roofs.all[this.props.itemID];
  }

  handleMouseLeave() {
  }

  handleClick(e, itemID) {
    
    const currentRoof = this.state.roofs.selected || null;
    if(currentRoof && currentRoof.id === itemID) return;

    this.props.updateSelectedRoofType(this.props.roof);
    
    e.style = "transform: scale(1.1);";
    e.style = "background: red;"
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ roofs: nextProps.roofs })
  }

  renderRoofItem(roof) {
    const { key, title, imgurl, anglesnumber, sidesnumber, itemID } = roof;
    let itemClass = 'roof-item';
    return (
    
      <div
        onMouseEnter={e => this.handleMouseEnter(e, key)}
        onMouseLeave={e => this.handleMouseLeave(false)}
        onClick={e => this.handleClick(e, itemID)}
        className={this.state.roofs.selected.id === roof.id ? 'roof-item roof-item--active' : 'roof-item'}
      >
        <img key={key} alt={title} src={imgurl} />
        {
          this.props.roofs &&
            roof.itemID &&
            this.props.roofs[roof.itemID].selected
            ? <FaCheck /> : null
        }
      </div>
    );
  }

  render() {
    return (
      <Col md={4} xs={6}>
        {this.renderRoofItem(this.props.roof)}
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    roofs: state.roofs
  }
}

export default connect(mapStateToProps, { updateSelectedRoofType })(RoofType);