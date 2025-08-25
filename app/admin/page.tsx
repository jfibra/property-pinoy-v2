import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Properties",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Building,
  },
  {
    title: "Active Users",
    value: "5,678",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Monthly Revenue",
    value: "₱2.4M",
    change: "+15%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Property Views",
    value: "45,678",
    change: "+23%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

const recentActivities = [
  {
    id: 1,
    action: "New property listed",
    details: "Modern Condo in BGC",
    time: "2 hours ago",
    user: "John Doe",
  },
  {
    id: 2,
    action: "User registered",
    details: "maria.santos@email.com",
    time: "4 hours ago",
    user: "Maria Santos",
  },
  {
    id: 3,
    action: "Property inquiry",
    details: "Luxury Villa in Makati",
    time: "6 hours ago",
    user: "Robert Chen",
  },
  {
    id: 4,
    action: "Property sold",
    details: "Family House in Quezon City",
    time: "1 day ago",
    user: "Lisa Garcia",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with Property Pinoy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-400">
                      {activity.time} • {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">Add New Property</h4>
                <p className="text-sm text-gray-600">Create a new property listing</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">Manage Users</h4>
                <p className="text-sm text-gray-600">View and edit user accounts</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">View Reports</h4>
                <p className="text-sm text-gray-600">Check analytics and insights</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">System Settings</h4>
                <p className="text-sm text-gray-600">Configure platform settings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
