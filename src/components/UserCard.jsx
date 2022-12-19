/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Avatar, Card, Popconfirm, Form, Input, Button } from 'antd';
import {
  EditOutlined,
  DeleteFilled,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteConfirmation, updateConfirmation } from '../redux/reducers/user';
import './UserCard.style.scss';

const { Meta } = Card;

function DeleteBtn({ id }) {
  const dispatcher = useDispatch();

  const confirm = () => {
    dispatcher(deleteConfirmation(id));
  };

  return (
    <Popconfirm
      title="Are you sure to delete this user?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
    >
      <DeleteFilled key="delete" />
    </Popconfirm>
  );
}

function UserCard({ data }) {
  const dispatcher = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: data.name,
    lastName: data.lastName,
    document: data.document,
  });

  const [form] = Form.useForm();

  const onclickEdit = () => {
    setEditMode(true);
    setUserInfo(data);
    form.setFieldsValue({
      name: data.name,
      lastName: data.lastName,
      document: data.document,
    });
  };

  const onClickCancel = () => {
    setEditMode(false);
    setUserInfo({
      name: data.name,
      lastName: data.lastName,
      document: data.document,
    });
  };

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (
      data.name === userInfo.name &&
      data.lastName === userInfo.lastName &&
      data.document === userInfo.document
    ) {
      setEditMode(false);
      return;
    }
    dispatcher(updateConfirmation({ ...userInfo, id: data.id }));
    setEditMode(false);
  };

  const content = editMode ? (
    <Form
      style={{ marginTop: '20px' }}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      form={form}
      autoComplete="off"
      id="userFormEdit"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
          { min: 3, message: "'Name' must be at least 3 characters" },
        ]}
      >
        <Input type="text" name="name" onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input your Last name!',
          },
          { min: 3, message: "'Last Name' must be at least 3 characters" },
        ]}
      >
        <Input type="text" name="lastName" onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Document"
        name="document"
        rules={[
          {
            required: true,
            message: 'Please input your document number!',
          },
          { min: 3, message: "'Document' must be at least 3 characters" },
          { max: 10, message: "'Document' cannot be longer than 10 characters" },
        ]}
      >
        <Input type="number" name="document" onChange={handleChange} />
      </Form.Item>
    </Form>
  ) : (
    ''
  );

  const btns = editMode
    ? [
        <Button type="text" htmlType="submit" form="userFormEdit">
          <CheckOutlined />
        </Button>,
        <Button type="text" onClick={onClickCancel}>
          <CloseOutlined />
        </Button>,
      ]
    : [<EditOutlined onClick={onclickEdit} />, <DeleteBtn id={data.id} key="delete" />];

  return (
    <Card
      style={{
        marginTop: 16,
      }}
      actions={btns}
    >
      <Meta
        avatar={<Avatar size={60} icon={<UserOutlined />} src={data.image} />}
        title={`${userInfo.name} ${userInfo.lastName}`}
        description={data.gender}
      />
      <div className="text-container">
        <div>
          <p>Document:</p> <p>{userInfo.document}</p>
        </div>
        <div>
          <p>Ocupation:</p>
          <p>{data.ocupation}</p>
        </div>
        <div>
          <p>Birth Date:</p>
          <p>{data.birthdate}</p>
        </div>
      </div>
      {content}
    </Card>
  );
}

export default UserCard;
