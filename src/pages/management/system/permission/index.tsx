import { Button, Card, InputNumber, message, Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import PermissionModal, { type PermissionModalProps } from './permission-modal';

import { Permission } from '#/entity';
import { BasicStatus, PermissionType } from '#/enum';
import {useGetPermissionList} from '@/store/permission';

import menuService from '@/api/services/menuService';

const defaultPermissionValue: Permission = {
  id: '',
  parent_id: '',
  name: '',
  label: '',
  route: '',
  component: '',
  icon: '',
  hide: false,
  status: BasicStatus.ENABLE,
  type: PermissionType.CATALOGUE,
};
export default function PermissionPage() {
  useGetPermissionList();
  // const { permissionList } = usePermissionStore();

  const [permissionList, setPermissionList] = useState<Permission[]>([]);

  const { t } = useTranslation();

  const onSortChange = (id: string, sort: number) => {
    console.log(id, sort);
  };
  const onDelete = (id: string) => {
    menuService.deleteMenu(Number(id)).then((res) => {
      message.success('Delete success');
      getPermissionAll();
    });
  };

  const getPermissionAll = () => {
    menuService.menuTree().then((res) => {
      setPermissionList(res);
    });
  };

  useEffect(() => {
    getPermissionAll();
  }, []);

  const [permissionModalProps, setPermissionModalProps] = useState<PermissionModalProps>({
    formValue: { ...defaultPermissionValue },
    title: 'New',
    show: false,
    onOk: () => {
      setPermissionModalProps((prev) => ({ ...prev, show: false }));
      getPermissionAll();
    },
    onCancel: () => {
      setPermissionModalProps((prev) => ({ ...prev, show: false }));
      getPermissionAll();
    },
  });
  const columns: ColumnsType<Permission> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      render: (_, record) => <div>{t(record.label)}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 60,
      render: (_, record) => <ProTag color="processing">{PermissionType[record.type]}</ProTag>,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 60,
      render: (icon: string) => {
        if (isNil(icon)) return '';
        if (icon.startsWith('ic')) {
          return <SvgIcon icon={icon} size={18} className="ant-menu-item-icon" />;
        }
        return <Iconify icon={icon} size={18} className="ant-menu-item-icon" />;
      },
    },
    {
      title: 'Component',
      dataIndex: 'component',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
          {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
        </ProTag>
      ),
    },
    { 
      title: 'Sort', 
      dataIndex: 'sort', 
      width: 60,
      render: (sort, record) => (
        <InputNumber
          style={{ width: '100%' }}
          value={sort}
          onChange={(value) => onSortChange(record.id, value as number)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-end text-gray">
          {record?.type === PermissionType.CATALOGUE && (
            <IconButton onClick={() => onCreate(record.id)}>
              <Iconify icon="gridicons:add-outline" size={18} />
            </IconButton>
          )}
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Permission" okText="Yes" onConfirm={() => onDelete(record.id)} cancelText="No" placement="left">
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onCreate = (parentId?: string) => {
    setPermissionModalProps((prev) => ({
      ...prev,
      show: true,
      ...defaultPermissionValue,
      title: 'New',
      formValue: { ...defaultPermissionValue, parent_id: parentId ?? '' },
    }));
  };

  const onEdit = (formValue: Permission) => {
    setPermissionModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }));
  };
  return (
    <Card
      title="Permission List"
      extra={
        <Button type="primary" onClick={() => onCreate()}>
          New
        </Button>
      }
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={permissionList}
      />

      <PermissionModal {...permissionModalProps} />
    </Card>
  );
}
