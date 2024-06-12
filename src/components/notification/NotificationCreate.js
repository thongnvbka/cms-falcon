import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as notificationApi from '../../api/notification';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import { toast } from 'react-toastify';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';

const NotificationCreate = () => {
  const history = useHistory();
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    getSampleData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (provinceData.length > 0) setProvince(provinceData[0].province_id);
  }, [provinceData]);

  useEffect(() => {
    if (districtData.length > 0) setDistrict(districtData[0].district_id);
  }, [districtData]);

  useEffect(() => {
    if (wardData.length > 0) setWard(wardData[0].ward_id);
  }, [wardData]);

  useEffect(() => {
    if (province) getDistrictData(province);
  }, [province]);

  useEffect(() => {
    if (district) getWardData(district);
  }, [district]);

  const getSampleData = async () => {
    const result = await notificationApi.getProvince();
    setProvinceData(result);
  };

  const getDistrictData = async (provinceId) => {
    const result = await notificationApi.getDistrict(provinceId);
    setDistrictData(result);
  };

  const getWardData = async (districtId) => {
    const result = await notificationApi.getWard(province, districtId);
    setWardData(result.ward);
  };

  const createNotification = async (formData) => {
    const result = await notificationApi.create(formData);
    toast(
      <Fragment>
        <h6>Success message</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/notification');
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    const imageResult = await fileManagerApi.uploadImage(image);
    const formData = {
      province,
      district,
      wards: ward,
      title,
      content,
      image: imageResult.imageId,
    };
    console.log('formData_', formData);
    createNotification(formData);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">Create notification</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={OnSubmit}>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="province">Tỉnh/Thành phố</Label>
                    <CustomInput
                      value={province}
                      onChange={({ target }) => {
                        setProvince(target.value);
                      }}
                      type="select"
                      id="province"
                      name="province"
                      required
                    >
                      {provinceData.map((item) => {
                        return (
                          <option key={item._id} value={item.province_id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="district">Quận/Huyện</Label>
                    <CustomInput
                      value={district}
                      onChange={({ target }) => {
                        setDistrict(target.value);
                      }}
                      type="select"
                      id="district"
                      name="district"
                      required
                    >
                      {districtData.map((item) => {
                        return (
                          <option key={item.district_id} value={item.district_id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="ward">Xã/Phường</Label>
                    <CustomInput
                      value={ward}
                      onChange={({ target }) => {
                        setWard(target.value);
                      }}
                      type="select"
                      id="ward"
                      name="ward"
                      required
                    >
                      {wardData.map((item) => {
                        return (
                          <option key={item.ward_id} value={item.ward_id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      value={title}
                      onChange={({ target }) => {
                        setTitle(target.value);
                      }}
                      type="text"
                      rows="5"
                      name="title"
                      id="title"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="content">Content</Label>
                    <Input
                      value={content}
                      onChange={({ target }) => {
                        setContent(target.value);
                      }}
                      type="textarea"
                      rows="5"
                      name="content"
                      id="content"
                      required
                    />
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
                Create
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/notification')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NotificationCreate;
