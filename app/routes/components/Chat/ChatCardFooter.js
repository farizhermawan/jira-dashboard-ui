import React from 'react';
import {Link} from 'react-router-dom';

import {Button, Input, InputGroup, InputGroupAddon} from './../../../components';

const ChatCardFooter = () => (
  <React.Fragment>
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button color="secondary" outline>
          <i className="fa fa fa-paperclip"></i>
        </Button>
      </InputGroupAddon>
      <Input placeholder="Your message..."/>
      <InputGroupAddon addonType="append">
        <Button color="info" tag={Link} to="/apps/chat">
          <i className="fa fa fa-send"></i>
        </Button>
      </InputGroupAddon>
    </InputGroup>
  </React.Fragment>
)

export {ChatCardFooter};
