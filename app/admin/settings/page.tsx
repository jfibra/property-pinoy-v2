import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Save, Upload } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage platform settings and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="Property Pinoy" />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea id="siteDescription" defaultValue="Find your dream property in the Philippines" rows={3} />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" defaultValue="info@propertypinoy.com" />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" defaultValue="+63 2 123 4567" />
            </div>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Settings</CardTitle>
            <CardDescription>Enable or disable platform features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="userRegistration">User Registration</Label>
                <p className="text-sm text-gray-600">Allow new users to register</p>
              </div>
              <Switch id="userRegistration" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="propertySubmission">Property Submission</Label>
                <p className="text-sm text-gray-600">Allow users to submit properties</p>
              </div>
              <Switch id="propertySubmission" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Put site in maintenance mode</p>
              </div>
              <Switch id="maintenanceMode" />
            </div>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Feature Settings
            </Button>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" defaultValue="Property Pinoy - Find Your Dream Property" />
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                defaultValue="Browse thousands of property listings in the Philippines. Find houses, condos, apartments for sale."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input id="metaKeywords" defaultValue="Philippines real estate, property for sale, houses, condos" />
            </div>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save SEO Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Technical system configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxFileSize">Max File Upload Size (MB)</Label>
              <Input id="maxFileSize" type="number" defaultValue="10" />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="60" />
            </div>
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <Label>Logo Upload</Label>
              <div className="flex items-center gap-2">
                <Input type="file" accept="image/*" />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
