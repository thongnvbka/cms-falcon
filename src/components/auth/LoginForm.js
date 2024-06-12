import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import Divider from '../common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import withRedirect from '../../hoc/withRedirect';
import * as loginAPI from '../../api/login';
import { getValueUser, setProfileLists} from "../../services/storages/userStorage";

const LoginForm = ({ setRedirect, hasLabel, layout }) => {
  // State
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  // Handler

  useEffect(() => {
    setIsDisabled(!username || !password);
  }, [username, password]);
  

  useEffect(() => {
    // localStorage.clear();
  }, []);
  const setStorage = (username, token, user) => {
    const lists = [
        { key: 'username', value: username },
        { key: 'token', value: token },
        { key: 'user', value: user },
    ];
    setProfileLists(lists);
};

  const  handleSubmit = (e) => {
    // stop here if form is invalid
    e.preventDefault();
    console.log(`handleSubmit`, handleSubmit)
    loginAPI.login(username,password).then((data) => {
        console.log(data.data);
        const { token, user } = data.data.data;

        if (data.data.code && data.data.code !== 1) {
          
            return;
        }
      

        if (user && token) {
            setStorage(username, token, user);
            window.location.replace('/');
        }
    })
        .catch((error) => {
          return;
        });
  
}

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Tài khoản</Label>}
        <Input
          placeholder={!hasLabel ? 'Tài khoản' : ''}
          value={username}
          onChange={({ target }) => setusername(target.value)}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Mật khẩu</Label>}
        <Input
          placeholder={!hasLabel ? 'Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label="Remember me"
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/authentication/${layout}/forget-password`}>
            Forget Password?
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3"  >
          Log in
        </Button>
      </FormGroup>
      {/* <Divider className="mt-4">or log in with</Divider> */}
      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default withRedirect(LoginForm);
