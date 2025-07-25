import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Image,
  Space,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { charactersAPI, Character } from "@/services/api";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null,
  );
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const data = await charactersAPI.getAll();
      setCharacters(data);
    } catch (error) {
      // Mock data for demo if API fails
      setCharacters([
        {
          id: "1",
          name: "Warrior Zara",
          gender: "Female",
          age: 25,
          description: "A fierce warrior from the northern lands",
          ability: "Sword Master",
          redeemed: 150,
          image: "/placeholder.svg",
        },
        {
          id: "2",
          name: "Mage Elara",
          gender: "Female",
          age: 30,
          description: "Powerful sorceress with elemental magic",
          ability: "Elemental Magic",
          redeemed: 200,
          image: "/placeholder.svg",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCharacter(null);
    form.resetFields();
    setFileList([]);
    setModalVisible(true);
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    form.setFieldsValue(character);
    if (character.image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: character.image,
        },
      ]);
    } else {
      setFileList([]);
    }
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await charactersAPI.delete(id);
      message.success("Character deleted successfully");
      fetchCharacters();
    } catch (error) {
      message.error("Failed to delete character");
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
        formData.append("image", fileList[0].originFileObj);
      }

      if (editingCharacter) {
        await charactersAPI.update(editingCharacter.id, formData);
        message.success("Character updated successfully");
      } else {
        await charactersAPI.create(formData);
        message.success("Character created successfully");
      }

      setModalVisible(false);
      fetchCharacters();
    } catch (error) {
      message.error(
        editingCharacter
          ? "Failed to update character"
          : "Failed to create character",
      );
    }
  };

  const handleUploadChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchText.toLowerCase()) ||
      character.ability.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns: ColumnsType<Character> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image: string) => (
        <Avatar
          size={50}
          src={image}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1890ff" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (
        <Tag
          color={
            gender === "Male"
              ? "blue"
              : gender === "Female"
                ? "pink"
                : "default"
          }
        >
          {gender}
        </Tag>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Ability",
      dataIndex: "ability",
      key: "ability",
      render: (ability: string) => <Tag color="purple">{ability}</Tag>,
    },
    {
      title: "Redeemed",
      dataIndex: "redeemed",
      key: "redeemed",
      sorter: (a, b) => a.redeemed - b.redeemed,
      render: (redeemed: number) => <Tag color="green">{redeemed}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
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
            title="Are you sure to delete this character?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Characters Management
            </Title>
          </Col>
          <Col>
            <Space>
              <Input
                placeholder="Search characters..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Add Character
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredCharacters}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredCharacters.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} characters`,
          }}
        />
      </Card>

      <Modal
        title={editingCharacter ? "Edit Character" : "Create Character"}
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
                rules={[
                  { required: true, message: "Please input character name!" },
                ]}
              >
                <Input placeholder="Enter character name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select placeholder="Select gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: "Please input age!" }]}
              >
                <InputNumber
                  min={1}
                  max={1000}
                  style={{ width: "100%" }}
                  placeholder="Enter age"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="redeemed"
                label="Redeemed"
                rules={[
                  { required: true, message: "Please input redeemed count!" },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="Enter redeemed count"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="ability"
            label="Ability"
            rules={[{ required: true, message: "Please input ability!" }]}
          >
            <Input placeholder="Enter character ability" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea rows={4} placeholder="Enter character description" />
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

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingCharacter ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Characters;
