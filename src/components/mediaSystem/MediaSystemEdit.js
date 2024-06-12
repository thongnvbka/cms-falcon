import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Input, Label, Row, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import * as mediaSystemApi from '../../api/mediaSystem';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';
import Avatar from '../common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MediaSystemEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [backgroundProfile, setBackgroundProfile] = useState('');
  const [backgroundGroup, setBackgroundGroup] = useState('');
  const [slide, setSlide] = useState('');
  const [slideDefault, setSlideDefault] = useState([]);
  const [mediaSystem, setMediaSystem] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) {
      getMediaSystem();
    } else {
      resetData();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!isEmpty(mediaSystem)) {
      setBackgroundProfile(mediaSystem.background_profile);
      setBackgroundGroup(mediaSystem.background_group);
      setYoutubeLink(mediaSystem.youtube.link);
      setSlideDefault(mediaSystem.slide_default);
    }
  }, [mediaSystem]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateMediaSystem();
      } else {
        createMediaSystem();
      }
    }
    
    console.log('formData', formData);
  }, [formData, isSubmit]);

  const getMediaSystem = async () => {
    const result = await mediaSystemApi.detail(id);
    setMediaSystem(result);
    setFormData({ youtube: result.youtube, status: result.status, slide_default: result.slide_default });
  };

  const resetData = () => {
    setLoading(true);
    setMediaSystem({});
    setFormData({});
    setYoutubeLink('');
    setBackgroundGroup('');
    setBackgroundProfile('');
    setSlide('');
    setSlideDefault([]);
  };

  const updateMediaSystem = async () => {
    const result = await mediaSystemApi.update(id, formData);
    toast(
      <Fragment>
        <h6>Message</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/media-system');
  };

  const createMediaSystem = async () => {
    const result = await mediaSystemApi.create(formData);
    toast(
      <Fragment>
        <h6>Message</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/media-system');
  };

  const addSlide = async () => {
    if (slide instanceof File) {
      const slideResult = await fileManagerApi.uploadImage(slide);
      setSlideDefault([...slideDefault, slideResult.imageId]);
      setSlide('');
    }
  };

  const OnSubmit = async (data, e) => {
    const youtubeData = {
      link: data.youtube_link,
      width: data.youtube_width,
      height: data.youtube_height,
      embed: data.youtube_embed,
      start: data.youtube_start,
      end: data.youtube_end,
    };
    let backgroundProfileResult = null;
    let backgroundGroupResult = null;
    if (backgroundProfile instanceof File)
      backgroundProfileResult = await fileManagerApi.uploadImage(backgroundProfile);
    if (backgroundGroup instanceof File) backgroundGroupResult = await fileManagerApi.uploadImage(backgroundGroup);
    setFormData({
      ...formData,
      youtube: youtubeData,
      background_profile: backgroundProfileResult ? backgroundProfileResult.imageId : backgroundProfile,
      background_group: backgroundGroupResult ? backgroundGroupResult.imageId : backgroundGroup,
      slide_default: slideDefault,
    });
    setIsSubmit(true);
  };

  const handleRemoveSlide = (slide) => {
    if (window.confirm('Are you sure to remove this slide?')) {
      setSlideDefault(slideDefault.filter(item => item !== slide));
    }
  }

  console.log('mediaSystem', mediaSystem);
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">Media System</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="youtube_link">Youtube link</Label>
                    <Input
                      value={youtubeLink}
                      onChange={({ target }) => {
                        setYoutubeLink(target.value);
                      }}
                      innerRef={register({
                        required: 'required',
                      })}
                      type="text"
                      name="youtube_link"
                      id="youtube_link"
                      placeholder="Enter link"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="youtube_embed">Youtube embed</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.youtube.embed : ''}
                      innerRef={register({
                        required: 'required',
                      })}
                      type="text"
                      name="youtube_embed"
                      id="youtube_embed"
                      placeholder="Enter embed"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_width">Youtube width</Label>
                        <Input
                          defaultValue={!isEmpty(formData) ? formData.youtube.width : ''}
                          innerRef={register({
                            required: 'required',
                            pattern: {
                              value: /^\d+$/i,
                              message: 'Must be number',
                            },
                          })}
                          type="text"
                          name="youtube_width"
                          id="youtube_width"
                          placeholder="Enter width"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_height">Youtube height</Label>
                        <Input
                          defaultValue={!isEmpty(formData) ? formData.youtube.height : ''}
                          innerRef={register({
                            required: 'required',
                            pattern: {
                              value: /^\d+$/i,
                              message: 'Must be number',
                            },
                          })}
                          type="text"
                          name="youtube_height"
                          id="youtube_height"
                          placeholder="Enter height"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_start">Youtube start</Label>
                        <Input
                          type="datetime-local"
                          name="youtube_start"
                          id="youtube_start"
                          defaultValue={
                            !isEmpty(formData) ? moment.utc(formData.youtube.start).format('YYYY-MM-DDTHH:mm') : ''
                          }
                          innerRef={register({
                            required: 'required',
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_end">Youtube end</Label>
                        <Input
                          type="datetime-local"
                          name="youtube_end"
                          id="youtube_end"
                          defaultValue={
                            !isEmpty(formData) ? moment.utc(formData.youtube.end).format('YYYY-MM-DDTHH:mm') : ''
                          }
                          innerRef={register({
                            required: 'required',
                          })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  {youtubeLink && (
                    <iframe
                      src={youtubeLink}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="video"
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="status">Media system status</Label>
                    <CustomInput
                      value={!isEmpty(formData) ? formData.status : true}
                      onChange={({ target }) => {
                        setFormData({ ...formData, status: target.value });
                      }}
                      type="select"
                      id="status"
                      name="status"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Disable</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Background Profile"
                    imageLink={backgroundProfile && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundProfile}
                    setImage={setBackgroundProfile}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Background Group"
                    imageLink={backgroundGroup && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundGroup}
                    setImage={setBackgroundGroup}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} style={{ position: 'relative' }}>
                  <UploadImage label="Slide Image" setImage={setSlide} required={false} />
                  <div style={{ position: 'absolute', bottom: 0, left: '15px' }}>
                    <Button onClick={addSlide} color="success">
                      Add
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                {slideDefault.map((slide, index) => {
                  return (
                    <Col key={index} md={2} style={{ position: 'relative' }}>
                      <Avatar
                        className="mb-2"
                        size="4xl"
                        src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + slide}
                        alt="slide"
                      />
                      <div style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Label
                          onClick={() => handleRemoveSlide(slide)}
                          className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer"
                        >
                          <FontAwesomeIcon icon="times" className="fs-1" />
                        </Label>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Button type="submit" color="primary">
                Update
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/media-system')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default MediaSystemEdit;
