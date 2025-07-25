import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Spin, List, Avatar, Tag } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  CarOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { dashboardAPI, DashboardSummary } from '@/services/api';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalCharacters: 0,
    totalPets: 0,
    totalVehicles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getSummary();
      setSummary(data);
    } catch (error) {
      // If API fails, use mock data for demo
      setSummary({
        totalCharacters: 247,
        totalPets: 89,
        totalVehicles: 156,
      });
    } finally {
      setLoading(false);
    }
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Created new character',
      item: 'Warrior Zara',
      time: '2 minutes ago',
      type: 'create',
      icon: <PlusOutlined style={{ color: '#52c41a' }} />,
    },
    {
      id: 2,
      action: 'Updated vehicle stats',
      item: 'Lightning Bike',
      time: '15 minutes ago',
      type: 'update',
      icon: <EditOutlined style={{ color: '#1890ff' }} />,
    },
    {
      id: 3,
      action: 'Deleted pet',
      item: 'Fire Dragon',
      time: '1 hour ago',
      type: 'delete',
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
    },
    {
      id: 4,
      action: 'Created new pet',
      item: 'Ice Phoenix',
      time: '2 hours ago',
      type: 'create',
      icon: <PlusOutlined style={{ color: '#52c41a' }} />,
    },
    {
      id: 5,
      action: 'Updated character',
      item: 'Mage Elara',
      time: '3 hours ago',
      type: 'update',
      icon: <EditOutlined style={{ color: '#1890ff' }} />,
    },
  ];

  const getTypeTag = (type: string) => {
    const colors = {
      create: 'success',
      update: 'processing',
      delete: 'error',
    };
    return <Tag color={colors[type as keyof typeof colors]}>{type}</Tag>;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Loading dashboard...</Text>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          Dashboard Overview
        </Title>
        <Text type="secondary">Welcome back! Here's what's happening with your game assets.</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Characters"
              value={summary.totalCharacters}
              prefix={
                <Avatar
                  style={{
                    backgroundColor: '#1890ff',
                    marginRight: 8,
                  }}
                  icon={<UserOutlined />}
                />
              }
              suffix={
                <div style={{ fontSize: '12px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 12%
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Pets"
              value={summary.totalPets}
              prefix={
                <Avatar
                  style={{
                    backgroundColor: '#eb2f96',
                    marginRight: 8,
                  }}
                  icon={<HeartOutlined />}
                />
              }
              suffix={
                <div style={{ fontSize: '12px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 8%
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Vehicle Fleet"
              value={summary.totalVehicles}
              prefix={
                <Avatar
                  style={{
                    backgroundColor: '#faad14',
                    marginRight: 8,
                  }}
                  icon={<CarOutlined />}
                />
              }
              suffix={
                <div style={{ fontSize: '12px', color: '#ff4d4f' }}>
                  <ArrowDownOutlined /> 3%
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Assets"
              value={summary.totalCharacters + summary.totalPets + summary.totalVehicles}
              prefix={
                <Avatar
                  style={{
                    backgroundColor: '#52c41a',
                    marginRight: 8,
                  }}
                  icon={<TrophyOutlined />}
                />
              }
              suffix={
                <div style={{ fontSize: '12px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 7%
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Asset Distribution */}
        <Col xs={24} lg={12}>
          <Card
            title="Asset Distribution"
            extra={<Text type="secondary">Current breakdown</Text>}
            style={{ height: '400px' }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
                    <div>
                      <div style={{ fontWeight: 500 }}>Characters</div>
                      <Text type="secondary">Game characters</Text>
                    </div>
                  </div>
                  <Statistic value={summary.totalCharacters} valueStyle={{ fontSize: '18px' }} />
                </div>
              </Col>
              <Col span={24}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar style={{ backgroundColor: '#eb2f96' }} icon={<HeartOutlined />} />
                    <div>
                      <div style={{ fontWeight: 500 }}>Pets</div>
                      <Text type="secondary">Companion pets</Text>
                    </div>
                  </div>
                  <Statistic value={summary.totalPets} valueStyle={{ fontSize: '18px' }} />
                </div>
              </Col>
              <Col span={24}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar style={{ backgroundColor: '#faad14' }} icon={<CarOutlined />} />
                    <div>
                      <div style={{ fontWeight: 500 }}>Vehicles</div>
                      <Text type="secondary">Transportation</Text>
                    </div>
                  </div>
                  <Statistic value={summary.totalVehicles} valueStyle={{ fontSize: '18px' }} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={12}>
          <Card
            title="Recent Activity"
            extra={<Text type="secondary">Latest updates</Text>}
            style={{ height: '400px' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{item.action}</span>
                        {getTypeTag(item.type)}
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: 4 }}>{item.item}</div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {item.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
