import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as stickerApi from '../../api/sticker';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';

const StickerEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [sticker, setSticker] = useState({});
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      resetData();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!isEmpty(sticker)) {
      setImage(sticker.image);
    }
  }, [sticker]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateSticker();
      } else {
        createSticker();
      }
    }
  }, [formData, isSubmit]);

  const resetData = () => {
    setLoading(true);
    setSticker({});
    setFormData({});
    setImage('');
  };

  const getDetail = async () => {
    const result = await stickerApi.detail(id);
    setSticker(result);
    setFormData({ name: result.name, key: result.key, status: result.status, type: result.type });
  };

  const updateSticker = async () => {
    const result = await stickerApi.update(id, formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/sticker');
  };

  const createSticker = async () => {
    const result = await stickerApi.create(formData);
    toast(
      <Fragment>
        <h6>Name: {result.name}</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/sticker');
  };

  const OnSubmit = async (data, e) => {
    let imageResult = null;
    if (image instanceof File) imageResult = await fileManagerApi.uploadImage(image);
    setFormData({ ...data, image: (imageResult ? imageResult.imageId : image) });
    setIsSubmit(true);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{id ? 'Update' : 'Create'} sticker</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Sticker name</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.name : ''}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter sticker name"
                      innerRef={register({
                        required: 'required',
                        minLength: {
                          value: 6,
                          message: 'Minimum six word',
                        },
                      })}
                      className={classNames({ 'border-danger': errors.name })}
                    />
                    {errors.name && <span className="text-danger fs--1">{errors.name.message}</span>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="key">Sticker key</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.key : ''}
                      type="text"
                      name="key"
                      id="key"
                      placeholder="Enter sticker key"
                      innerRef={register({
                        required: 'required',
                        minLength: {
                          value: 6,
                          message: 'Minimum six word',
                        },
                      })}
                      className={classNames({ 'border-danger': errors.key })}
                    />
                    {errors.key && <span className="text-danger fs--1">{errors.key.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="status">Sticker status</Label>
                    <CustomInput
                      innerRef={register({
                        required: 'required',
                      })}
                      type="select"
                      id="status"
                      value={!isEmpty(formData) ? formData.status : true}
                      onChange={({ target }) => {
                        setFormData({ ...formData, status: target.value });
                      }}
                      name="status"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Disable</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="type">Sticker type</Label>
                    <CustomInput
                      innerRef={register({
                        required: 'required',
                      })}
                      type="select"
                      id="type"
                      value={!isEmpty(formData) ? formData.type : 1}
                      onChange={({ target }) => {
                        setFormData({ ...formData, type: target.value });
                      }}
                      name="type"
                    >
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                      <option value={4}>Four</option>
                      <option value={5}>Five</option>
                      <option value={6}>Six</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <UploadImage
                    label="Image"
                    imageLink={image && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image}
                    setImage={setImage}
                  />
                </Col>
              </Row>

              <Button type="submit" color="primary">
                {id ? 'Update' : 'Create'}
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/sticker')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default StickerEdit;
