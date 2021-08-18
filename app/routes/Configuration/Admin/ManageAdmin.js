import React from 'react';
import {Container, Fade} from "reactstrap";

import {ManagedTable} from "routes/components/CRUD";
import {HeaderMain} from "routes/components/HeaderMain";

import {FormGrantAccess, TableBody, TableHeader} from "./components";

const ManageAdmin = () => {

  return (
    <Container>
      <HeaderMain title="Manage Admin" className="mb-5 mt-4"/>
      <Fade in={true}>
        <ManagedTable api="/v1/roles/1/users" header={<TableHeader/>} body={<TableBody/>} pagination={false}>
          <FormGrantAccess />
        </ManagedTable>
      </Fade>
    </Container>
  );
};

export default ManageAdmin;
