import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Heart, 
  Car, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data for demo
  const statsData = [
    {
      title: 'Total Characters',
      value: '247',
      change: '+12%',
      trend: 'up' as const,
      icon: Users,
      color: 'indigo'
    },
    {
      title: 'Active Pets',
      value: '89',
      change: '+8%',
      trend: 'up' as const,
      icon: Heart,
      color: 'rose'
    },
    {
      title: 'Vehicle Fleet',
      value: '156',
      change: '-3%',
      trend: 'down' as const,
      icon: Car,
      color: 'amber'
    },
    {
      title: 'Total Assets',
      value: '492',
      change: '+7%',
      trend: 'up' as const,
      icon: Activity,
      color: 'emerald'
    }
  ];

  const pieData = [
    { name: 'Characters', value: 247, color: '#4f46e5' },
    { name: 'Pets', value: 89, color: '#f43f5e' },
    { name: 'Vehicles', value: 156, color: '#f59e0b' }
  ];

  const barData = [
    { month: 'Jan', characters: 45, pets: 20, vehicles: 30 },
    { month: 'Feb', characters: 52, pets: 25, vehicles: 28 },
    { month: 'Mar', characters: 48, pets: 22, vehicles: 35 },
    { month: 'Apr', characters: 61, pets: 30, vehicles: 32 },
    { month: 'May', characters: 55, pets: 28, vehicles: 38 },
    { month: 'Jun', characters: 67, pets: 35, vehicles: 42 }
  ];

  const lineData = [
    { month: 'Jan', total: 420 },
    { month: 'Feb', total: 435 },
    { month: 'Mar', total: 445 },
    { month: 'Apr', total: 462 },
    { month: 'May', total: 478 },
    { month: 'Jun', total: 492 }
  ];

  const recentActivity = [
    { action: 'Created new character', item: 'Warrior Zara', time: '2 minutes ago', type: 'create' },
    { action: 'Updated vehicle stats', item: 'Lightning Bike', time: '15 minutes ago', type: 'update' },
    { action: 'Deleted pet', item: 'Fire Dragon', time: '1 hour ago', type: 'delete' },
    { action: 'Created new pet', item: 'Ice Phoenix', time: '2 hours ago', type: 'create' },
    { action: 'Updated character', item: 'Mage Elara', time: '3 hours ago', type: 'update' },
    { action: 'Created new vehicle', item: 'Storm Cruiser', time: '5 hours ago', type: 'create' }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      indigo: 'text-indigo-600 bg-indigo-50',
      rose: 'text-rose-600 bg-rose-50',
      amber: 'text-amber-600 bg-amber-50',
      emerald: 'text-emerald-600 bg-emerald-50'
    };
    return colors[color as keyof typeof colors];
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus className="w-3 h-3 text-emerald-600" />;
      case 'update': return <Activity className="w-3 h-3 text-amber-600" />;
      case 'delete': return <MoreHorizontal className="w-3 h-3 text-rose-600" />;
      default: return <Activity className="w-3 h-3 text-slate-600" />;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-montserrat text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of your game assets and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-rose-600" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Asset Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Asset Distribution</CardTitle>
            <CardDescription>Breakdown of all game assets by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Monthly Growth</CardTitle>
            <CardDescription>Asset creation trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="characters" fill="#4f46e5" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="pets" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="vehicles" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Assets Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-montserrat">Total Assets Over Time</CardTitle>
            <CardDescription>Cumulative asset count progression</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Recent Activity</CardTitle>
            <CardDescription>Latest changes to your assets</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-sm text-slate-600 truncate">{activity.item}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <Button variant="ghost" size="sm" className="w-full">
                View all activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
