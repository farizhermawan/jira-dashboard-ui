import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Container, Fade} from "reactstrap";
import Skeleton from "react-loading-skeleton";

import {HeaderMain} from "routes/components/HeaderMain";
import {BasicHeader, ManagedTable} from "routes/components/CRUD";
import DataService from "services/DataService";

import {TableBody, TableHeader} from "./components";

const ManageSprint = () => {
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(false);

  const init = async () => {
    let response = await DataService.get("/v1/board");
    setBoard(response);
  }

  const sync = async () => {
    setLoading(true);
    await DataService.get("/v1/sprints", {sync: true});
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  if (!board) return '';

  return (
    <Container fluid={ false }>
      <div className="d-flex">
        <HeaderMain title={board.name} subTitle="test" className="mb-5 mt-4"/>
        <ButtonToolbar className="ml-auto mt-4">
          <ButtonGroup className="align-self-start">
            <Button color="primary" className="mr-2 mt-4 px-3" onClick={() => sync()}>Sync Sprints</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>

      {loading ? <Skeleton count={3} height={50}/> :
        <>
          <Fade in={true} className="mb-5">
            <BasicHeader title="Active Sprint"/>
            <ManagedTable api="/v1/sprints" params={{state: 'active'}} header={<TableHeader/>} body={<TableBody/>} pagination={false} />
          </Fade>
          <Fade in={true} className="mb-5">
            <BasicHeader title="Future Sprint"/>
            <ManagedTable api="/v1/sprints" params={{state: 'future'}} header={<TableHeader/>} body={<TableBody/>} pagination={false} />
          </Fade>
          <Fade in={true} className="mb-5">
            <BasicHeader title="Closed Sprint"/>
            <ManagedTable api="/v1/sprints" params={{state: 'closed'}} header={<TableHeader/>} body={<TableBody/>} pagination={false} />
          </Fade>
        </>
      }
    </Container>
  );
};

export default ManageSprint;
