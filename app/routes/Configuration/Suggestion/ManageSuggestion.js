import React from 'react';
import {Container, Fade, Table, UncontrolledTooltip} from "reactstrap";
import {Link} from 'react-router-dom'

import {Button, ButtonGroup, ButtonToolbar, Card} from "components";

import {HeaderMain} from "routes/components/HeaderMain";
import {BasicHeader} from "routes/components/CRUD";

import {TableBody, TableHeader} from "./components";

const ManageSuggestion = () => {
  return (
    <Container>
      <HeaderMain title="Kelola Sugesti" className="mb-5 mt-4"/>
      <Fade in={true}>
        <BasicHeader title="Master Data Sugesti" toolbar={(
          <ButtonToolbar>
            <ButtonGroup className="mr-auto mr-md-2"/>
            <ButtonGroup>
              <Button color="info" className="align-self-center" id="tooltip" tag={Link} to="/config/suggestion/new">
                <i className="fa-fw fa fa-plus"/>
              </Button>
              <UncontrolledTooltip placement="bottom" target="tooltip">
                Kategori Baru
              </UncontrolledTooltip>
            </ButtonGroup>
          </ButtonToolbar>
        )}/>
        <Card className="mb-3">
          <Table className="mb-0" responsive>
            <thead>
             <TableHeader/>
            </thead>
            <tbody>
             <TableBody/>
            </tbody>
          </Table>
        </Card>
      </Fade>
    </Container>
  );
};

export default ManageSuggestion;
