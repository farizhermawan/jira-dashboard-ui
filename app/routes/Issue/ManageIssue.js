import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Card, CardBody, CardHeader, Container, Fade, Progress} from "reactstrap";
import PropTypes from "prop-types";

import {HeaderMain} from "routes/components/HeaderMain";
import {BasicHeader, ManagedTable} from "routes/components/CRUD";
import DataService from "services/DataService";

import {SummaryToolbar, TableBody, TableHeader} from "./components";
import {SummaryIssue} from "./components";

const ManageIssue = (props) => {
  const sprintId = props.match.params.sprintId;

  const [sprint, setSprint] = useState();
  const [syncState, setSyncState] = useState({loading: false, total: 0, progress: 0});

  const init = async () => {
    let response = await DataService.get("/v1/sprints/" + sprintId);
    setSprint(response);
  }

  const sync = async () => {
    setSyncState(prevState => ({...prevState, progress: 0, loading: true}));
    let response = await DataService.get("/v1/issues", {sync: true, sprint: sprintId});
    setSyncState(prevState => ({...prevState, total: response.data.length}));
    response.data.forEach((issueId) => {
      DataService.get("/v1/issues/" + issueId, {sync: true}).then(() => {
        setSyncState(prevState => ({...prevState, progress: prevState.progress + 1}));
      });
    });
  }

  const getSyncProgress = () => {
    let actual = syncState.progress === 0 ? 0 : Math.round(syncState.progress / syncState.total * 100);
    if (actual > 100) actual = 100;
    let progress = actual < 5 ? 5 : actual;
    return <>
      <Progress value={progress} animated striped color="info" className="mt-0 font-weight-bold">{actual}%</Progress>
    </>
  }

  useEffect(() => {
    if (!syncState.loading) return;
    if (syncState.progress === 0) return;
    if (syncState.progress === syncState.total) {
      setSyncState(prevState => ({...prevState, loading: false}));
    }
  }, [syncState]);

  useEffect(() => {
    init();
  }, []);

  if (!sprint) return '';

  return (
    <Container fluid={ false }>
      <div className="d-flex">
        <HeaderMain title={sprint.name} className="mb-5 mt-4"/>
        <ButtonToolbar className="ml-auto mt-4">
          <ButtonGroup className="align-self-start">
            <Button color="primary" disabled={syncState.loading} className="mr-2 mt-4 px-3" onClick={() => sync()}>Sync Issues</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>

      {syncState.loading ?
        <>
          <Card>
            <CardHeader>Sync in progress</CardHeader>
            <CardBody className="p5">
              {getSyncProgress()}
            </CardBody>
          </Card>
        </> :
        <>
          <Fade in={true} className="mb-5">
            <BasicHeader title="Issues"/>
            <ManagedTable api={"/v1/issues"} params={{sprint: sprintId}} header={<TableHeader/>} body={<TableBody/>} pagination={false}>
              <SummaryToolbar/>
            </ManagedTable>
          </Fade>
        </>
      }
    </Container>
  );
};

ManageIssue.propTypes = {
  match: PropTypes.any
};

export default ManageIssue;
