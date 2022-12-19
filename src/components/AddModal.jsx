/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Avatar,
  Upload,
  message,
  Radio,
  Select,
  DatePicker,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { sendUser } from '../redux/reducers/user';
import { closeModal } from '../redux/reducers/modal';
import getBase64 from '../utils/base64';
import './AddModal.style.scss';

function AddModal() {
  const dispatcher = useDispatch();
  const isOpen = useSelector((state) => state.modal.open);
  const { isLoading } = useSelector((state) => state.users);

  const [form] = Form.useForm();
  const nameValue = Form.useWatch('name', form);
  const lastNameValue = Form.useWatch('lastName', form);
  const documentValue = Form.useWatch('document', form);
  const genderValue = Form.useWatch('gender', form);
  const ocupationValue = Form.useWatch('ocupation', form);
  const birthdateValue = Form.useWatch('birthdate', form);

  const [imageURL, setImageURL] = useState();

  // FORM HANDLERS

  const onSubmit = () => {
    const userInfo = {
      name: nameValue,
      lastName: lastNameValue,
      document: documentValue,
      gender: genderValue,
      image: imageURL,
      ocupation: ocupationValue,
      birthdate: birthdateValue,
    };
    dispatcher(sendUser(userInfo));
  };

  const cleanInputs = () => {
    form.resetFields();
    setImageURL();
  };

  // IMAGES HANDLERS

  const beforeUploadHandler = (file) => {
    const isIMG =
      file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
    if (!isIMG) {
      message.error(`${file.name} is not a IMG file`);
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const onChangeHandlerIMG = (info) => {
    // para cuando borra la img ,porque no enviamos request
    if (info.file.originFileObj) return;

    getBase64(info.file, (url) => {
      setImageURL(url);
    });
  };

  const onRemoveHandlerIMG = () => {
    setImageURL();
  };

  useEffect(() => {
    cleanInputs();
  }, [isOpen]);

  return (
    <Modal
      forceRender
      title="User form"
      open={isOpen}
      onOk={() => dispatcher(closeModal())}
      onCancel={() => dispatcher(closeModal())}
      footer={[
        <Button key="submit" type="primary" loading={isLoading} form="userForm" htmlType="submit">
          Add
        </Button>,
      ]}
    >
      <div className="avatar-container">
        <Avatar size={100} icon={<UserOutlined />} src={imageURL} />
      </div>
      <Form
        key={isOpen}
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
        id="userForm"
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
          <Input type="text" name="name" />
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
          <Input type="text" name="lastName" />
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
          <Input type="number" name="document" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please select your gender!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male"> male </Radio>
            <Radio value="female"> female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="ocupation"
          label="Ocupation"
          rules={[
            {
              required: true,
              message: 'Please select your ocupation!',
            },
          ]}
        >
          <Select>
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Bully">Bully</Select.Option>
            <Select.Option value="Programmer">Programmer</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birthdate"
          label="Birth date"
          rules={[
            {
              required: true,
              message: 'Please select a Date!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Upload Image" extra="file size limit 2 mb">
          <Upload
            maxCount={1}
            beforeUpload={beforeUploadHandler}
            onChange={onChangeHandlerIMG}
            onRemove={onRemoveHandlerIMG}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddModal;
