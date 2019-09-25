import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import LandingContainer from './containers/LandingContainer';
import StepContainer from './containers/StepContainer';
import MeasurementContainer from './containers/MeasurementContainer';
import ResultContainer from './containers/ResultContainer';

import './assets/scss/common.scss';

class App extends React.Component {

  render() {
    
    return(
      <div className="app">
        <Container>
          <BrowserRouter>
            <Row>
              <Route path="/" exact isHome={this.props.location} component={LandingContainer} />
              <Route path="/step-1" component={StepContainer} />
              <Route path="/step-2" component={MeasurementContainer} />
              <Route path="/step-3" component={ResultContainer} />
            </Row>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;