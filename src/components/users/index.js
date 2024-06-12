import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paginations from '../common/Paginations';
import Avatar from '../common/Avatar';
import * as usersAPI from '../../api/users';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [totalUser, setTotalUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resetPagination, setResetPagination] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUserList();
  }, [currentPage]);

  useEffect(() => {
    if (resetPagination) {
      setResetPagination(false);
    }
  }, [resetPagination]);

  const nameFormatter = (dataField, { first_name, last_name }) => {
    return <span className="mb-0 fs--1">{first_name + ' ' + last_name}</span>;
  };

  const statusFormatter = (dataField, { _id, status }) => {
    return (
      <Badge
        onClick={() => handleChangeStatus(_id, status)}
        className="btn"
        color={status === 'ACTIVE' ? 'success' : 'secondary'}
      >
        {status}
      </Badge>
    );
  };
  const avatarFormatter = (dataField, avatar) => {
    if (dataField) {
      return <Avatar src={`${urlConfig.GET_FILE_IMAGE}?width=45&height=45&image_id=${dataField}&fit=contain`} />;
    }
    return <Avatar />;
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => resetPassword(_id)}>Reset Password</DropdownItem>
        {/* <DropdownItem onClick={() => history.push(`/users/update/${_id}`)}>Edit</DropdownItem> */}
        {/* <DropdownItem onClick={() => console.log(_id)} className="text-danger">
          Delete
        </DropdownItem> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const columns = [
    {
      dataField: 'avatar',
      headerClasses: 'border-0',
      text: 'Avatar',
      classes: 'border-0 py-2 align-middle',
      formatter: avatarFormatter,
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      formatter: nameFormatter,
      sort: true,
    },
    {
      dataField: 'email',
      headerClasses: 'border-0',
      text: 'Email',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'phone',
      headerClasses: 'border-0',
      text: 'Phone',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'status',
      headerClasses: 'border-0',
      text: 'Status',
      classes: 'border-0 py-2 align-middle',
      formatter: statusFormatter,
      sort: true,
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right',
    },
  ];

  const resetPassword = async (userId) => {
    if (window.confirm('Are you sure to reset password?')) {
      const result = await usersAPI.resetPW({userId});
      toast(
        <Fragment>
          <h6>Name: {result.first_name + ' ' + result.last_name}</h6>
          <hr />
          <p className="mb-0">Reset password successfully!</p>
        </Fragment>
      );
    }
  }

  const getUserList = async (initCurrent = null) => {
    setLoading(true);
    const data = await usersAPI.getList(
      ((initCurrent ? initCurrent : (currentPage ? currentPage : 1)) - 1) * limit,
      limit,
      keyword
    );
    setTotalUser(data.total);
    setUserList(data.items);
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  const searchUser = async (e) => {
    if (e.key === 'Enter') {
      if (currentPage === 1) {
        getUserList(1);
      } else {
        setCurrentPage(1);
        setResetPagination(true);
      }
    }
  };

  const handleChangeStatus = async (userId, status) => {
    const data = {
      userId,
      status: status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE',
    };
    if (window.confirm('Are you sure change status?')) {
      const result = await usersAPI.changeStatus(data);
      getUserList();
    }
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="User list" light={false}>
        <Fragment>
          <Row>
            <Input
              onKeyDown={searchUser}
              onChange={({ target }) => setKeyword(target.value)}
              className="mr-1"
              placeholder="Search..."
              style={{
                flex: 1,
                borderColor: '#FFF',
                boxShadow:
                  '0 0 0 1px rgb(43 45 80 / 10%), 0 2px 5px 0 rgb(43 45 80 / 8%), 0 1px 1.5px 0 rgb(0 0 0 / 7%), 0 1px 2px 0 rgb(0 0 0 / 8%)',
              }}
            />
            <ButtonIcon
              className="mr-1"
              onClick={() => history.push('/users/create')}
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              New
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Export
            </ButtonIcon>
          </Row>
        </Fragment>
      </FalconCardHeader>
      <CardBody className="p-3">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col sm="12"></Col>
            </Row>
            <Row>
              <Col sm="12">
                <BootstrapTable keyField="_id" data={userList} columns={columns} />
              </Col>
            </Row>
           
          </>
        )}
         <Row>
              <Col sm="12">
                <Paginations
                  totalRecords={totalUser}
                  pageLimit={limit}
                  pageNeighbours={1}
                  onPageChanged={setCurrentPage}
                  reset={resetPagination}
                />
              </Col>
            </Row>
      </CardBody>
    </Card>
  );
};

export default Users;
