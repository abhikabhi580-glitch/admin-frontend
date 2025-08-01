import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
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
  Progress,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  CarOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { vehiclesAPI, Vehicle } from "@/services/api";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;
const { TextArea } = Input;

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehiclesAPI.getAll();
      setVehicles(data);
    } catch (error) {
      // Mock data for demo if API fails
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingVehicle(null);
    form.resetFields();
    setFileList([]);
    setModalVisible(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    form.setFieldsValue(vehicle);
    if (vehicle.image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: vehicle.image,
        },
      ]);
    } else {
      setFileList([]);
    }
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await vehiclesAPI.delete(id);
      message.success("Vehicle deleted successfully");
      fetchVehicles();
    } catch (error) {
      message.error("Failed to delete vehicle");
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
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

      if (editingVehicle) {
        const response = await vehiclesAPI.update(editingVehicle.id ? editingVehicle.id : editingVehicle._id, formData);
        message.success(response.message || "Vehicle updated successfully");
      } else {
        const response = await vehiclesAPI.create(formData);
        message.success(response.message || "Vehicle created successfully");
      }
      setLoading(false);
      setModalVisible(false);
      fetchVehicles();
    } catch (error: any) {
      setLoading(false);
      message.error(
        error.response?.data?.message ||
        (editingVehicle
          ? "Failed to update vehicle"
          : "Failed to create vehicle"),
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

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.ideal_use_case.toLowerCase().includes(searchText.toLowerCase()),
  );

  const getPerformanceColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "#52c41a";
    if (percentage >= 60) return "#faad14";
    return "#ff4d4f";
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      // width: 80,
      render: (image: string) => (
        <img src={image} style={{ backgroundColor: "transparent", width: '55px', height: '100px' }} />
        // <Avatar
        //   size={50}
        //   src={image}
        //   icon={<CarOutlined />}
        //   style={{ backgroundColor: "#faad14" }}
        // />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "HP",
      dataIndex: "hp",
      key: "hp",
      sorter: (a, b) => a.hp - b.hp,
      render: (hp: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ThunderboltOutlined style={{ color: "#faad14" }} />
          <span>{hp}</span>
        </div>
      ),
    },
    {
      title: "Speed",
      dataIndex: "speed",
      key: "speed",
      sorter: (a, b) => a.speed - b.speed,
      render: (speed: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DashboardOutlined style={{ color: "#1890ff" }} />
          <span>{speed}</span>
        </div>
      ),
    },
    {
      title: "Control",
      dataIndex: "control",
      key: "control",
      sorter: (a, b) => a.control - b.control,
      render: (control: number) => (
        <Progress
          percent={control}
          size="small"
          strokeColor={getPerformanceColor(control)}
          showInfo={false}
          style={{ width: 60 }}
        />
      ),
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
      sorter: (a, b) => a.seats - b.seats,
      render: (seats: number) => <Tag color="blue">{seats}</Tag>,
    },
    {
      title: "Use Case",
      dataIndex: "ideal_use_case",
      key: "ideal_use_case",
      ellipsis: true,
      render: (useCase: string) => <Tag color="purple">{useCase}</Tag>,
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
            title="Are you sure to delete this vehicle?"
            onConfirm={() => handleDelete(record.id ? record.id : record._id)}
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
              Vehicles Management
            </Title>
          </Col>
          <Col>
            <Space>
              <Input
                placeholder="Search vehicles..."
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
                Add Vehicle
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredVehicles}
          rowKey="_id"
          loading={loading}
          pagination={{
            total: filteredVehicles.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} vehicles`,
          }}
        />
      </Card>

      <Modal
        title={editingVehicle ? "Edit Vehicle" : "Create Vehicle"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
        loading={loading}
        maskClosable={!loading}
        cancelButtonProps={{ loading: loading }}
        closeIcon={false}
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
                  { required: true, message: "Please input vehicle name!" },
                ]}
              >
                <Input placeholder="Enter vehicle name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="seats"
                label="Seats"
                rules={[
                  { required: true, message: "Please input number of seats!" },
                ]}
              >
                <InputNumber
                  min={1}
                  max={20}
                  style={{ width: "100%" }}
                  placeholder="Enter seats"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="hp"
                label="HP"
                rules={[{ required: true, message: "Please input HP!" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Enter HP"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="speed"
                label="Speed"
                rules={[{ required: true, message: "Please input speed!" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Enter speed"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="control"
                label="Control"
                rules={[{ required: true, message: "Please input control!" }]}
              >
                <InputNumber
                  min={1}
                  max={100}
                  style={{ width: "100%" }}
                  placeholder="Enter control"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="acceleration_torque"
            label="Acceleration Torque"
            rules={[
              { required: true, message: "Please input acceleration torque!" },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Enter acceleration torque"
            />
          </Form.Item>

          <Form.Item
            name="ideal_use_case"
            label="Ideal Use Case"
            rules={[
              { required: true, message: "Please input ideal use case!" },
            ]}
          >
            <TextArea rows={3} placeholder="Enter ideal use case" />
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
                {editingVehicle ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicles;
