"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Thermometer,
  Droplets,
  MapPin,
  Zap,
  Plus,
  Minus,
  AlertTriangle,
  Users,
  TrendingUp,
  Activity,
  Shield,
  Phone,
  Siren,
  ArrowRight,
  EyeOff,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Enhanced mock data for heatwave forecast
const heatwaveData = [
  {
    id: 1,
    name: "Barangay San Miguel",
    lat: 14.5995,
    lng: 120.9842,
    temp: 38,
    risk: "high",
    peakTime: "2:00 PM",
    recommendation: "Open cooling centers, distribute water",
    population: 5200,
    vulnerablePopulation: 850,
    coolingCenters: 2,
    responseTeams: 1,
    historicalMax: 41,
    trend: "increasing",
  },
  {
    id: 2,
    name: "Barangay Poblacion",
    lat: 14.6042,
    lng: 120.9822,
    temp: 35,
    risk: "medium",
    peakTime: "1:30 PM",
    recommendation: "Monitor vulnerable populations",
    population: 3800,
    vulnerablePopulation: 420,
    coolingCenters: 1,
    responseTeams: 1,
    historicalMax: 38,
    trend: "stable",
  },
  {
    id: 3,
    name: "Barangay Riverside",
    lat: 14.5932,
    lng: 120.9765,
    temp: 42,
    risk: "extreme",
    peakTime: "3:00 PM",
    recommendation: "Emergency heat protocols activated",
    population: 4100,
    vulnerablePopulation: 680,
    coolingCenters: 3,
    responseTeams: 2,
    historicalMax: 43,
    trend: "increasing",
  },
  {
    id: 4,
    name: "Barangay Central",
    lat: 14.6012,
    lng: 120.9889,
    temp: 36,
    risk: "medium",
    peakTime: "2:30 PM",
    recommendation: "Increase public awareness campaigns",
    population: 6200,
    vulnerablePopulation: 920,
    coolingCenters: 2,
    responseTeams: 1,
    historicalMax: 39,
    trend: "stable",
  },
]

const alertHistory = [
  {
    id: 1,
    time: "10:30 AM",
    location: "Barangay Riverside",
    type: "Temperature Alert",
    message: "Temperature exceeded 40°C threshold",
    status: "active",
    details: "Dangerous heat levels expected to reach 42°C",
    recommendation: "Evacuation recommended",
  },
  {
    id: 2,
    time: "9:15 AM",
    location: "Barangay San Miguel",
    type: "Cooling Center",
    message: "Emergency cooling center activated",
    status: "resolved",
    details: "Cooling center operational since 9:00 AM",
    recommendation: "Monitor supply levels",
  },
  {
    id: 3,
    time: "8:45 AM",
    location: "Multiple Areas",
    type: "Heat Advisory",
    message: "Heat index forecast to reach dangerous levels",
    status: "active",
    details: "Public advisory issued to all barangays",
    recommendation: "Increase public awareness campaigns",
  },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "bg-[var(--color-heat-low)]"
    case "medium":
      return "bg-[var(--color-heat-medium)]"
    case "high":
      return "bg-[var(--color-heat-high)]"
    case "extreme":
      return "bg-[var(--color-heat-extreme)]"
    default:
      return "bg-muted"
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "increasing":
      return <TrendingUp className="h-3 w-3 text-red-500" />
    case "decreasing":
      return <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
    default:
      return <Activity className="h-3 w-3 text-muted-foreground" />
  }
}

export default function HeatwaveDashboard() {
  const [selectedDay, setSelectedDay] = useState([0])
  const [zoomLevel, setZoomLevel] = useState(10)
  const [selectedBarangay, setSelectedBarangay] = useState<any>(null)
  const [viewMode, setViewMode] = useState("forecast")

  const days = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
  // Get all active alerts
  const activeAlerts = alertHistory.filter((alert) => alert.status === "active");
  // The primary alert to show in the detailed view (the latest one)
  const primaryAlert = activeAlerts[0]; 
  // The list of other active alerts (excluding the primary one)
  const otherActiveAlerts = activeAlerts.slice(1);
  const mapImageUrl = "https://placehold.co/1200x800/81C7D4/ffffff?text=Stylized+Map+Background";

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance flex items-center gap-3">
            <Thermometer className="h-8 w-8 text-red-500" />
            Heatwave Monitoring
          </h1>
          <p className="text-muted-foreground text-balance">
            Real-time heat risk assessment and emergency response coordination
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forecast">Forecast View</SelectItem>
              <SelectItem value="response">Response View</SelectItem>
              <SelectItem value="historical">Historical View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Siren className="h-4 w-4 mr-2" />
            Emergency Alert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map Panel */}
        <div className="lg:col-span-2">
          <Card className="h-[1100px]">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Interactive Heat Risk Map
                </CardTitle>
              </div>

              {/* Date Slider */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Forecast Day:</span>
                  <span className="text-sm text-primary font-medium">{days[selectedDay[0]]}</span>
                </div>
                <Slider value={selectedDay} onValueChange={setSelectedDay} max={6} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {days.map((day, index) => (
                    <span key={index}>{day}</span>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-[calc(100%-140px)] relative">
              {/* Map Area */}
          <div className="relative h-full bg-muted/20">
            <div className="absolute inset-4 bg-card rounded-xl border border-border overflow-hidden shadow-inner">
              {/* Simulated Map with Placeholder Image */}
              <div 
                className="relative w-full h-full bg-blue-50/50 dark:bg-gray-800" 
                style={{ 
                  backgroundImage: `url('/images/map.png')`, // Use the placeholder image
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {/* Overlay for contrast and dimming the map */}
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>

                {heatwaveData.map((location) => (
                  <div
                    key={location.id}
                    // Added z-10 here to ensure the pins are above the overlay
                    className={`absolute rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg ${getRiskColor(location.risk)} opacity-90 hover:opacity-100 p-1 z-10`} 
                    style={{
                      left: `${20 + location.id * 12 + (location.id % 2) * 5}%`, // Adjusted for better spacing
                      top: `${30 + location.id * 10 + (location.id % 3) * 5}%`,
                      width: "56px",
                      height: "56px",
                    }}
                    onClick={() => setSelectedBarangay(location)}
                  >
                    <div className="w-full h-full rounded-full border-2 border-background flex flex-col items-center justify-center">
                      <MapPin className="h-3 w-3 text-background mb-1" />
                      <span className="text-xs font-bold text-background leading-none">{location.temp}°</span>
                      {getTrendIcon(location.trend, "w-3 h-3 text-background")}
                    </div>

                    {/* Response indicators (Only show if viewMode is "response") */}
                    {viewMode === "response" && (
                      <div className="absolute -top-1 -right-1 flex gap-1">
                        {location.coolingCenters > 0 && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full border border-background shadow" title={`${location.coolingCenters} Cooling Centers`} />
                        )}
                        {location.responseTeams > 0 && (
                          <div className="w-3 h-3 bg-green-500 rounded-full border border-background shadow" title={`${location.responseTeams} Response Teams`} />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-card border border-border rounded-xl p-3 shadow-2xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
              <h4 className="text-sm font-semibold mb-2 text-foreground">Heat Risk Level</h4>
              <div className="space-y-1">
                {[
                  { level: "Low", color: "bg-[var(--color-heat-low)]", range: "< 35°C" },
                  { level: "Medium", color: "bg-[var(--color-heat-medium)]", range: "35-37°C" },
                  { level: "High", color: "bg-[var(--color-heat-high)]", range: "38-40°C" },
                  { level: "Extreme", color: "bg-[var(--color-heat-extreme)]", range: "> 40°C" },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-2 text-xs">
                    <div class={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
                    <span className="w-16 font-medium">{item.level}</span>
                    <span className="text-muted-foreground">({item.range})</span>
                  </div>
                ))}
              </div>

              {viewMode === "response" && (
                <div className="mt-3 pt-3 border-t border-border">
                  <h5 className="text-xs font-semibold mb-1 text-foreground">Response Assets</h5>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
                      <span>Cooling Centers</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm" />
                      <span>Response Teams</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

              {/* Detailed Location Panel */}
              {selectedBarangay && (
                <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-4 max-w-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{selectedBarangay.name}</h4>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedBarangay(null)}>
                      ×
                    </Button>
                  </div>

                  <Tabs defaultValue="forecast" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="forecast" className="text-xs">
                        Forecast
                      </TabsTrigger>
                      <TabsTrigger value="response" className="text-xs">
                        Response
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="forecast" className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-primary" />
                        <span>Current: {selectedBarangay.temp}°C</span>
                        {getTrendIcon(selectedBarangay.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>Peak Risk: {selectedBarangay.peakTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span>Historical Max: {selectedBarangay.historicalMax}°C</span>
                      </div>
                      <div className="mt-3 p-2 bg-muted rounded text-xs">
                        <strong>Recommendation:</strong> {selectedBarangay.recommendation}
                      </div>
                    </TabsContent>

                    <TabsContent value="response" className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Population: {selectedBarangay.population.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>Vulnerable: {selectedBarangay.vulnerablePopulation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Cooling Centers: {selectedBarangay.coolingCenters}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span>Response Teams: {selectedBarangay.responseTeams}</span>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>


        {/* Right Panel - Alerts and Response */}
        <div className="space-y-6">
          {/* Current Alerts */}
          <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  Heatwave Monitoring
                </CardTitle>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Next Update 15 minutes</p>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
            {/* Current Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Current Status
              </h3>
              <p className="text-2xl font-bold text-orange-600 mb-1">
                Moderate Risk
              </p>
              <p className="text-sm text-gray-600">
                Multiple heat wave affecting this region
              </p>
            </div>

            {/* Priority Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Priority Actions
              </h3>
              <ul className="flex flex-col space-y-1 text-gray-700 gap-1">
                <li className="flex items-start">
                  <span className="mr-2 text-sm leading-none">• Issue heat advisories</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sm leading-none">• Prepare evacuation routes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sm leading-none">• Monitor flood-prone areas</span>
                </li>
              </ul>
            </div>
          </div>
              </CardContent>
            </Card>
          
          {/* Active Alerts - REFACTORED TO MATCH IMAGE */}
            <Card>
              <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Active Alerts
              </CardTitle>
            </CardHeader>
              <CardContent className="p-4">
                {primaryAlert ? (
                  // Detailed Card for the Primary Active Alert
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-red-600" />
                        <h3 className="text-base font-semibold text-gray-800">
                          {primaryAlert.type}
                        </h3>
                      </div>
                      {/* Extreme Tag */}
                      <Badge className="py-0.5 px-3 text-xs font-semibold rounded-md bg-red-600 text-white uppercase tracking-wider">
                        Extreme
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      {primaryAlert.details}
                    </p>

                    {/* Location and Time */}
                    <div className="flex space-x-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span>{primaryAlert.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Activity className="h-3 w-3 text-gray-500" />
                        <span>{primaryAlert.time} ago</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Recommended Actions:
                    </h4>
                    
                    {/* Recommended Actions Checkboxes (simulated with radio buttons) */}
                    <div className="space-y-2 mb-4">
                      <label className="flex items-center text-sm text-gray-700">
                        <input type="radio" name={`action-${primaryAlert.id}`} className="form-radio h-4 w-4 text-blue-600 border-gray-300 mr-2" defaultChecked />
                        Evacuation recommended
                      </label>
                      <label className="flex items-center text-sm text-gray-700">
                        <input type="radio" name={`action-${primaryAlert.id}`} className="form-radio h-4 w-4 text-blue-600 border-gray-300 mr-2" />
                        Emergency shelters activated
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="py-1.5 px-3 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="py-1.5 px-3 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100">
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No active alerts at this time.</p>
                )}
              </CardContent>
            </Card>
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">
                    {heatwaveData.filter((d) => d.risk === "extreme" || d.risk === "high").length}
                  </p>
                  <p className="text-xs text-muted-foreground">High Risk Areas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {heatwaveData.reduce((sum, d) => sum + d.coolingCenters, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Cooling Centers</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    {heatwaveData.reduce((sum, d) => sum + d.responseTeams, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Response Teams</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">
                    {(heatwaveData.reduce((sum, d) => sum + d.vulnerablePopulation, 0) / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-muted-foreground">At Risk Population</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                <Siren className="h-4 w-4 mr-2" />
                Issue Heat Advisory
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Activate Cooling Centers
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Deploy Response Teams
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Contact Vulnerable Groups
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
