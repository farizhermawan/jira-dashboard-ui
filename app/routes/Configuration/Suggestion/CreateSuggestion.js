import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {CardBody, Col, Container, Fade, Form, FormGroup, Input, Label, Row, UncontrolledTooltip} from "reactstrap";
import {toast} from 'react-toastify';
import { titleCase } from "title-case";
import PropTypes from "prop-types";

import {
  Alert,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardFooter,
  InputGroup,
  InputGroupAddon,
} from "components";

import {BasicHeader, NotificationBody} from "routes/components/CRUD";
import {HeaderMain} from "routes/components/HeaderMain";

import DataService from "services/DataService";

const CreateSuggestion = (props) => {
  const defaultItem = {display_text: '', item: ''};

  const history = useHistory();

  const [group, setGroup] = useState(props.match.params.group);
  const [items, setItems] = useState([defaultItem]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const onFieldChange = (name, value, index) => {
    const list = [...items];
    list[index][name] = value;
    setItems(list);
  };

  const removeField = index => {
    const list = [...items];
    list.splice(index, 1);
    if (list.length === 0) list.push(defaultItem);
    setItems(list);
  };

  const addMoreField = () => {
    setItems([...items, defaultItem]);
  };

  const isUpdate = () => typeof props.match.params.group !== 'undefined';

  const showError = () => {
    setError({title:'Oops, Terjadi kesalahan', desc: 'Proses penyimpanan data tidak berhasil. Anda bisa coba ulangi atau hubungi admin!'});
    setSaving(false);
  };

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    let payload = {group: group, items: items};
    let restApiCall = isUpdate() ? DataService.put('/v1/suggestion-groups/' + group, payload) : DataService.post('/v1/suggestion-groups', payload);
    restApiCall.then((response) => {
      if (response.error) showError();
      else {
        toast.success(<NotificationBody text="Data berhasil disimpan"/>);
        setTimeout(() => {
          history.push('/config/suggestion');
        }, 1000);
      }
    }).catch(() => showError());
  };

  const toTitle = (slug) => titleCase(slug.replace(/_/g, ' '));

  const toSlug = (text) => text.toLowerCase().replace(/ /g, '_');

  useEffect(() => {
    if (isUpdate()) {
      DataService.get('/v1/suggestion-groups/' + group).then((response) => {
        setItems(response.items);
      }).catch(() => history.goBack());
    }
  }, []);

  return (
    <Container>
      <HeaderMain title="Kelola Sugesti" className="mb-5 mt-4"/>
      <Fade in={true}>
        <BasicHeader title={isUpdate() ? `${toTitle(group)}` : "Tambah Kategori Baru"} toolbar={(
          <ButtonToolbar>
            <ButtonGroup className="mr-auto mr-md-2"/>
            <ButtonGroup>
              <Button color="info" className="align-self-center" id="tooltip" tag={Link} to="/config/suggestion">
                <i className="fa-fw fa fa-list-ul"/>
              </Button>
              <UncontrolledTooltip placement="bottom" target="tooltip">
                Kembali ke List
              </UncontrolledTooltip>
            </ButtonGroup>
          </ButtonToolbar>
        )}/>
        <Form onSubmit={(e) => save(e)}>
          <Card className="mb-3">
            <CardBody>
              {isUpdate() ? '' : (
                <Row>
                  <Col xs={7}>
                    <FormGroup>
                      <Label>Nama Kategori</Label>
                      <Input type="text" id="group" name="group" value={group} onChange={(e) => setGroup(toSlug(e.target.value))} placeholder="gender"/>
                    </FormGroup>
                  </Col>
                </Row>
              )}
              {/*<DragDropContext onDragEnd={(result) => onDragEnd(result)}>*/}
              {/*  <Droppable droppableId="droppable">*/}
              {/*    {(provided) => (*/}
              {/*      <div {...provided.droppableProps} ref={provided.innerRef}>*/}
                      {items.map((item, index) => (
                        // <Draggable key={index} draggableId={"item-" + index} index={index}>
                        //   {(provided) => (
                        //     <div
                        //       ref={provided.innerRef}
                        //       {...provided.draggableProps}
                        //       {...provided.dragHandleProps}
                        //     >
                              <Row key={index}>
                                <Col xs={7}>
                                  <FormGroup>
                                    {index === 0 ? <Label>Display Text</Label> : ''}
                                    <Input type="text" id={"display-text-"+index} value={item.display_text} onChange={(e) => onFieldChange('display_text', e.target.value, index)} placeholder="Contoh: Laki-laki"/>
                                  </FormGroup>
                                </Col>
                                <Col xs={5}>
                                  <FormGroup>
                                    {index === 0 ? <Label>Value</Label> : ''}
                                    <InputGroup>
                                      <Input type="text" id={"item-"+index} value={item.item} onChange={(e) => onFieldChange('item', toSlug(e.target.value), index)} placeholder="Contoh: male"/>
                                      <InputGroupAddon addonType="append">
                                        <Button color="secondary" outline onClick={() => removeField(index)}>
                                          <i className="fa fa-trash"/>
                                        </Button>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                            // </div>
                          // )}
                        // </Draggable>
                      ))}
                      {/*{provided.placeholder}*/}
                    {/*</div>*/}
                  {/*)}*/}
                {/*</Droppable>*/}
              {/*</DragDropContext>*/}
              <Row>
                <Col xs={12} className="text-right">
                  <Button color="info" onClick={() => addMoreField()}>
                    <i className="fa fa-plus"/>
                  </Button>
                </Col>
              </Row>
              {error ? (
                <Fade in={true} className="mt-3">
                  <Row>
                    <Col sm={12}>
                      <Alert color="danger">
                        <i className="fa fa-times-circle mr-1 alert-icon"/>
                        <strong className="alert-heading">{error.title}</strong>
                        <p className="mb-0">{error.desc}</p>
                      </Alert>
                    </Col>
                  </Row>
                </Fade>
              ) : <></>}
            </CardBody>
            <CardFooter>
              <div className="text-right">
                {isUpdate()
                  ? <Button color="link" className="align-self-center mr-2" onClick={() => history.goBack()}>Batal</Button>
                  : <></>
                }
                {saving
                  ? <Button color="info" disabled={true} className="align-self-center">Mohon Tunggu <i className="ml-2 fa fa-spinner fa-spin"/></Button>
                  : <Button color="info" className="align-self-center">Simpan</Button>
                }
              </div>
            </CardFooter>
          </Card>
        </Form>
      </Fade>
    </Container>
  );
};

CreateSuggestion.propTypes = {
  match: PropTypes.any
};

export default CreateSuggestion;
