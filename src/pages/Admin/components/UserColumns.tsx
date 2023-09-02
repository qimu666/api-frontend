import {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';

export const UserAddModalFormColumns: ProFormColumnsType<API.User, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '名称',
    dataIndex: 'userName',
    key: "userName",
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: "userAccount",
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("用户账号为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  }, {
    title: '密码',
    key: "userPassword",
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("用户密码为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
  }, {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    valueType: "radio",
    valueEnum: {
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '余额',
    key: "balance",
    dataIndex: 'balance',
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value < 0) {
              return Promise.reject(new Error("余额不能为负数"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
];
export const UserUpdateModalFormColumns: ProFormColumnsType<API.User, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '名称',
    dataIndex: 'userName',
    key: "userName",
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    valueType: "radio",
    valueEnum: {
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '余额',
    key: "balance",
    dataIndex: 'balance',
    width: 'lg',
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value < 0) {
              return Promise.reject(new Error("余额不能为负数"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
  {
    title: '密码',
    key: "userPassword",
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value.length < 0) {
              return Promise.reject(new Error("用户密码为必填项"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
];

export const UserColumns: ProColumns<API.UserVO>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    copyable: true,
    ellipsis: true,
    key: 'userName',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    valueType: 'text',
    copyable: true,
    key: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    valueType: 'image',
    key: 'userAvatar',
  },
  {
    title: '邀请码',
    dataIndex: 'invitationCode',
    valueType: 'text',
    copyable: true,
    key: 'invitationCode',
  },
  {
    title: 'secretKey',
    dataIndex: 'secretKey',
    valueType: 'textarea',
    copyable: true,
    ellipsis: true,
    key: 'secretKey',
  },
  {
    title: 'accessKey',
    dataIndex: 'accessKey',
    valueType: 'textarea',
    copyable: true,
    ellipsis: true,
    key: 'accessKey',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    onFilter: true,
    key: 'gender',
    valueEnum: {
      0: {
        text: '男',
      },
      1: {
        text: '女',
      }
    }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    key: 'updateTime',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    key: 'createTime',
  },
];

export default UserColumns;
