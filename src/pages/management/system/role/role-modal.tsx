import { Form, Modal, Input, InputNumber, Radio, Tree, message } from 'antd';
import { useEffect, useState } from 'react';


import { Role } from '#/entity';
import { BasicStatus } from '#/enum';
import usePermissionStore, { useGetPermissionList } from '@/store/permission';
import roleService from "@/api/services/roleService";
export type RoleModalProps = {
  formValue: Role;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};
export function RoleModal({ title, show, formValue, onOk, onCancel }: RoleModalProps) {
  useGetPermissionList();
  const { permissionList } = usePermissionStore();

  const [form] = Form.useForm();

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const handleOk = () => {
    form.validateFields().then((values) => {
      const permissions = checkedKeys?.map((item) => ({menu_id:item, role_id:formValue.id})) || [];
      console.log('permissions:', checkedKeys);
      if(formValue.id){
        roleService.updateAndAuth({id:formValue.id, ...values, permissions}).then((res) => {
          message.success('Role updated successfully'); // Success message
          onOk();
        });
      }else{
        roleService.createAndAuth(values).then((res) => {
          message.success('Role created successfully'); // Success message
          onOk();
        });
      }
    });
  };

  useEffect(() => {
    const selectIds = formValue.permission?.map((item) => item.menu_id);
    setCheckedKeys(selectIds);
  }, [formValue]);

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
