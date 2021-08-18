import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon} from "reactstrap";

import {useSharedState} from "contexts/sharedState";
import DataService from "services/DataService";

const FormGrantAccess = () => {
  const defaultParams = {
    email: ""
  };

  const {refresh} = useSharedState();
  const [params, setParams] = useState(defaultParams);
  const [error, setError] = useState("");

  const reset = () => {
    setError("");
    setParams(defaultParams);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setParams(prevState => ({...prevState, [name]: value}));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.email.length === 0) return;
    if (!isEmailValid(params.email)) {
      setError("Email is not valid.");
      return;
    }
    if (!isTraveloka(params.email)) {
      setError("Only accpeted email from traveloka email address.");
      return;
    }

    const payload = {email: params.email, auto_create_user: true};
    DataService.post("/v1/roles/1/users", payload).then((response) => {
      if (response.error) {
        if (response.code === 409) setError(params.email + " already have access to admin area.");
      }
      else {
        reset();
        refresh();
      }
    });
  };

  const isEmailValid = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  }

  const isTraveloka = (email) => {
    return email.indexOf("@traveloka.com") !== -1;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row>
        <Col lg={6}>
          <InputGroup>
            <Input name="email" value={params.email} onChange={handleChange} placeholder="Enter traveloka email" />
            <InputGroupAddon addonType="append">
              <Button color="info">
                Grant Access <i className="fa fa-angle-right ml-2"/>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {error.length !== 0 ? <FormText color="red">{error}</FormText> : ""}
        </Col>
      </FormGroup>
    </Form>
  );
};

export default FormGrantAccess;
