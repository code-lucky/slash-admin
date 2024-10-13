import { Form, Modal, Input, InputNumber, Radio, Tree } from 'antd';
import { useEffect, useState } from 'react';

import { flattenTrees } from '@/utils/tree';

import { Role } from '#/entity';
import { BasicStatus } from '#/enum';
import usePermissionStore, { useGetPermissionList } from '@/store/permission';

export type RoleModalProps = {
  formValue: Role;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};
export function RoleModal({ title, show, formValue, onOk, onCancel }: RoleModalProps) {
  console.log('formValue:', formValue);
  useGetPermissionList();
  const { permissionList } = usePermissionStore();

  const [form] = Form.useForm();

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  console.log('checkedKeys:', checkedKeys);
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('values:', values);
      onOk();
    });
  };

  useEffect(() => {
    const selectIds = formValue.permission?.map((item) => item.id) || [];
    setCheckedKeys(selectIds);
  }, [formValue, form]);

  return (
    <Modal title={title} open={show} onOk={handleOk} onCancel={onCancel}>
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<Role> label="Name" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item<Role> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={BasicStatus.ENABLE}> Enable </Radio>
            <Radio value={BasicStatus.DISABLE}> Disable </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<Role> label="Desc" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item<Role> label="Permission" name="permission">
          <Tree
            checkable
            checkedKeys={checkedKeys}
            onCheck={(checkedKeysValue) => setCheckedKeys(checkedKeysValue as string[])}
            treeData={permissionList}
            fieldNames={{
              key: 'id',
              children: 'children',
              title: 'name',
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
