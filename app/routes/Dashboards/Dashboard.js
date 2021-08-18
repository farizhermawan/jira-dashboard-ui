import React from 'react';
import {Card} from "reactstrap";

import {Col, Container, Row, setupPage} from 'components';
import {HeaderMain} from "routes/components/HeaderMain";

import {SummaryActiveSprint} from './components';

const Dashboard = () => (
  <Container>
    <Row className="mb-5">
      <Col lg={12}>
        <HeaderMain
          title="Dashboard"
          className="mb-4 mb-lg-5"
        />
      </Col>
      <Col lg={6}>
        <Card className="p-3">
          <SummaryActiveSprint/>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default setupPage({
  pageTitle: 'Dashboard'
})(Dashboard);
