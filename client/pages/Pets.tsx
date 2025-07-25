import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Space,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Avatar,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  HeartOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { petsAPI, Pet } from '@/services/api';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title } = Typography;
const { TextArea } = Input;

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await petsAPI.getAll();
      setPets(data);
    } catch (error) {
      // Mock data for demo if API fails
      setPets([
        {
          id: '1',
          name: 'Fire Phoenix',
          sub_title: 'Legendary Companion',
          description: 'A majestic fire bird with healing powers',
          ability: 'Fire Healing',
          image: '/placeholder.svg',
        },
        {
          id: '2',
          name: 'Ice Wolf',
          sub_title: 'Arctic Guardian',
          description: 'A loyal wolf companion from the frozen lands',
          ability: 'Ice Shield',
          image: '/placeholder.svg',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPet(null);
    form.resetFields();
    setFileList([]);
    setModalVisible(true);
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    form.setFieldsValue(pet);
    if (pet.image) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: pet.image,
        },
      ]);
    } else {
      setFileList([]);
    }
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await petsAPI.delete(id);
      message.success('Pet deleted successfully');
      fetchPets();
    } catch (error) {
      message.error('Failed to delete pet');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      if (editingPet) {
        await petsAPI.update(editingPet.id, formData);
        message.success('Pet updated successfully');
      } else {
        await petsAPI.create(formData);
        message.success('Pet created successfully');
      }

      setModalVisible(false);
      fetchPets();
    } catch (error) {
      message.error(editingPet ? 'Failed to update pet' : 'Failed to create pet');
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
    pet.ability.toLowerCase().includes(searchText.toLowerCase()) ||
    pet.sub_title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Pet> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string) => (
        <Avatar
          size={50}
          src={image}
          icon={<HeartOutlined />}
          style={{ backgroundColor: '#eb2f96' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Subtitle',
      dataIndex: 'sub_title',
      key: 'sub_title',
      render: (subtitle: string) => <Tag color="cyan">{subtitle}</Tag>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ability',
      dataIndex: 'ability',
      key: 'ability',
      render: (ability: string) => <Tag color="purple">{ability}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this pet?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Pets Management
            </Title>
          </Col>
          <Col>
            <Space>
              <Input
                placeholder="Search pets..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                Add Pet
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredPets}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredPets.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} pets`,
          }}
        />
      </Card>

      <Modal
        title={editingPet ? 'Edit Pet' : 'Create Pet'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input pet name!' }]}
              >
                <Input placeholder="Enter pet name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sub_title"
                label="Subtitle"
                rules={[{ required: true, message: 'Please input subtitle!' }]}
              >
                <Input placeholder="Enter pet subtitle" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="ability"
            label="Ability"
            rules={[{ required: true, message: 'Please input ability!' }]}
          >
            <Input placeholder="Enter pet ability" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <TextArea rows={4} placeholder="Enter pet description" />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              accept=".jpg,.jpeg,.png,.webp"
              maxCount={1}
            >
              {fileList.length === 0 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingPet ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Pets;
