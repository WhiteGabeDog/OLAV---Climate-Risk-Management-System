"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Droplets,
  MapPin,
  Minus,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  HardHat,
  Box,
  Sprout,
  Truck,
  Calendar,
  BarChart3,
  Waves,
  CloudRain,
  Thermometer,
  Users,
  Factory,
  Home,
  Phone,
  Clock,
  Target,
  Activity,
  Database,
  Zap,
  Shield,
  FileText,
  Settings,
  Search,
  Download,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Wrench,
  Droplet,
} from "lucide-react"

const droughtData = [
  {
    id: 1,
    name: "#513",
    longitude: 13.812,
    latitude: 100.550,
    risk: "watch",
    soilMoisture: 45,
    vegStress: "moderate",
    daysToRisk: 15,
    recommendation: "Monitor water reserves closely",
    waterReserves: 78,
    agriculturalImpact: "low",
    population: 1300,
    waterDemand: 4200,
    coordinates: { lat: 14.5995, lng: 120.9842 },
    economicImpact: 2.5, // in billion PHP
    vulnerablePopulation: 85,
    waterSources: ["Angat Dam", "La Mesa Dam", "Ipo Dam"],
    emergencyContacts: [
      { name: "MMDA Emergency", phone: "136" },
      { name: "Water District", phone: "(02) 8917-7777" },
    ],
    historicalData: [
      { month: "Jan", soilMoisture: 65, rainfall: 25, temperature: 26 },
      { month: "Feb", soilMoisture: 58, rainfall: 18, temperature: 27 },
      { month: "Mar", soilMoisture: 52, rainfall: 12, temperature: 29 },
      { month: "Apr", soilMoisture: 48, rainfall: 8, temperature: 31 },
      { month: "May", soilMoisture: 45, rainfall: 5, temperature: 32 },
    ],
    infrastructure: {
      waterTreatmentPlants: 12,
      reservoirs: 8,
      distributionPoints: 245,
      emergencyTankers: 18,
    },
    environmentalData: {
      humidity: 68,
      windSpeed: 12,
      uvIndex: 8,
      airQuality: 85,
      evapotranspiration: 4.2,
      groundwaterLevel: 72,
      streamFlow: 65,
      vegetationHealth: 78,
      soilMoistureIndex: 42, // New: Soil moisture index (ความชื้นในดิน)
      vegetationStress: 65, // New: Vegetation stress (ความเครียดพืช)
    },
    demographics: {
      urbanPopulation: 1150,
      ruralPopulation: 150,
      elderlyPopulation: 100,
      childrenUnder5: 60,
      householdsWithoutPipedWater: 1000,
      agricultureDependentJobs: 500,
    },
    economicSectors: {
      agriculture: 0.8, // billion PHP
      manufacturing: 1.2,
      services: 0.5,
    },
    waterInfrastructureDetails: {
      pipelineLength: 8500, // km
      pumpingStations: 45,
      storageTanks: 180,
      treatmentCapacity: 5200, // ML/day
      distributionEfficiency: 82, // %
      leakageRate: 18, // %
    },
    monthlyForecast: {
      week2: { risk: "watch", soilMoisture: 42, vegStress: "moderate", waterReserves: 75, economicImpact: 3.2 },
      month1: { risk: "warning", soilMoisture: 35, vegStress: "high", waterReserves: 68, economicImpact: 5.8 },
      month2: { risk: "warning", soilMoisture: 28, vegStress: "high", waterReserves: 58, economicImpact: 8.4 },
    },
  },
  {
    id: 2,
    name: "#125",
    longitude: 100.550,
    latitude: 13.805,
    risk: "warning",
    soilMoisture: 25,
    vegStress: "high",
    daysToRisk: 8,
    recommendation: "Implement water conservation measures",
    waterReserves: 52,
    agriculturalImpact: "moderate",
    population: 700,
    waterDemand: 1850,
    coordinates: { lat: 14.2691, lng: 121.1947 },
    economicImpact: 4.2,
    vulnerablePopulation: 52,
    waterSources: ["Laguna Lake", "Caliraya Lake", "Lumot Lake"],
    emergencyContacts: [
      { name: "Provincial Disaster Office", phone: "(049) 536-6644" },
      { name: "Water Authority", phone: "(049) 502-3456" },
    ],
    historicalData: [
      { month: "Jan", soilMoisture: 72, rainfall: 35, temperature: 25 },
      { month: "Feb", soilMoisture: 65, rainfall: 28, temperature: 26 },
      { month: "Mar", soilMoisture: 45, rainfall: 15, temperature: 28 },
      { month: "Apr", soilMoisture: 32, rainfall: 8, temperature: 30 },
      { month: "May", soilMoisture: 25, rainfall: 3, temperature: 31 },
    ],
    infrastructure: {
      waterTreatmentPlants: 8,
      reservoirs: 15,
      distributionPoints: 180,
      emergencyTankers: 12,
    },
    environmentalData: {
      humidity: 58,
      windSpeed: 15,
      uvIndex: 9,
      airQuality: 78,
      evapotranspiration: 5.8,
      groundwaterLevel: 45,
      streamFlow: 38,
      vegetationHealth: 52,
      soilMoistureIndex: 25, // New: Soil moisture index (ความชื้นในดิน)
      vegetationStress: 75, // New: Vegetation stress (ความเครียดพืช)
    },
    demographics: {
      urbanPopulation: 180,
      ruralPopulation: 100,
      elderlyPopulation: 25,
      childrenUnder5: 17,
      householdsWithoutPipedWater: 200,
      agricultureDependentJobs: 65,
    },
    economicSectors: {
      agriculture: 2.8,
      manufacturing: 1.0,
      services: 0.4,
    },
    waterInfrastructureDetails: {
      pipelineLength: 3200,
      pumpingStations: 28,
      storageTanks: 95,
      treatmentCapacity: 2100,
      distributionEfficiency: 75,
      leakageRate: 25,
    },
    monthlyForecast: {
      week2: { risk: "emergency", soilMoisture: 18, vegStress: "severe", waterReserves: 45, economicImpact: 6.8 },
      month1: { risk: "emergency", soilMoisture: 12, vegStress: "severe", waterReserves: 35, economicImpact: 12.5 },
      month2: { risk: "emergency", soilMoisture: 8, vegStress: "critical", waterReserves: 22, economicImpact: 18.2 },
    },
  },
  {
    id: 3,
    name: "#152",
    longitude: 13.800,
    latitude: 100.561,
    risk: "safe",
    soilMoisture: 65,
    vegStress: "low",
    daysToRisk: 30,
    recommendation: "Continue regular monitoring",
    waterReserves: 89,
    agriculturalImpact: "none",
    population: 438,
    waterDemand: 2100,
    coordinates: { lat: 14.4791, lng: 120.897 },
    economicImpact: 0.8,
    vulnerablePopulation: 12,
    waterSources: ["Ternate River", "Maragondon River", "Cañas River"],
    emergencyContacts: [
      { name: "Provincial Emergency", phone: "(046) 481-1033" },
      { name: "Water Services", phone: "(046) 434-2211" },
    ],
    historicalData: [
      { month: "Jan", soilMoisture: 78, rainfall: 45, temperature: 24 },
      { month: "Feb", soilMoisture: 75, rainfall: 38, temperature: 25 },
      { month: "Mar", soilMoisture: 72, rainfall: 32, temperature: 27 },
      { month: "Apr", soilMoisture: 68, rainfall: 25, temperature: 29 },
      { month: "May", soilMoisture: 65, rainfall: 18, temperature: 30 },
    ],
    infrastructure: {
      waterTreatmentPlants: 10,
      reservoirs: 12,
      distributionPoints: 220,
      emergencyTankers: 15,
    },
    environmentalData: {
      humidity: 75,
      windSpeed: 8,
      uvIndex: 6,
      airQuality: 92,
      evapotranspiration: 3.2,
      groundwaterLevel: 88,
      streamFlow: 85,
      vegetationHealth: 92,
      soilMoistureIndex: 65, // New: Soil moisture index (ความชื้นในดิน)
      vegetationStress: 35, // New: Vegetation stress (ความเครียดพืช)
    },
    demographics: {
      urbanPopulation: 280,
      ruralPopulation: 154,
      elderlyPopulation: 50,
      childrenUnder5: 22,
      householdsWithoutPipedWater: 250,
      agricultureDependentJobs: 100,
    },
    economicSectors: {
      agriculture: 0.5,
      manufacturing: 0.2,
      services: 0.1,
    },
    waterInfrastructureDetails: {
      pipelineLength: 4100,
      pumpingStations: 32,
      storageTanks: 125,
      treatmentCapacity: 2800,
      distributionEfficiency: 88,
      leakageRate: 12,
    },
    monthlyForecast: {
      week2: { risk: "safe", soilMoisture: 62, vegStress: "low", waterReserves: 86, economicImpact: 1.2 },
      month1: { risk: "watch", soilMoisture: 55, vegStress: "moderate", waterReserves: 78, economicImpact: 2.8 },
      month2: { risk: "watch", soilMoisture: 48, vegStress: "moderate", waterReserves: 68, economicImpact: 4.5 },
    },
  },
  {
    id: 4,
    name: "#111",
    longitude: 124.5,
    latitude: 125.55,
    risk: "emergency",
    soilMoisture: 15,
    vegStress: "severe",
    daysToRisk: 3,
    recommendation: "Activate emergency water distribution",
    waterReserves: 28,
    agriculturalImpact: "severe",
    population: 333,
    waterDemand: 1650,
    coordinates: { lat: 14.6037, lng: 121.3084 },
    economicImpact: 8.5,
    vulnerablePopulation: 32,
    waterSources: ["Wawa Dam", "Kaliwa Dam", "Kanan River"],
    emergencyContacts: [
      { name: "Emergency Response", phone: "(02) 8647-3877" },
      { name: "Water Crisis Hotline", phone: "(02) 8941-1234" },
    ],
    historicalData: [
      { month: "Jan", soilMoisture: 58, rainfall: 22, temperature: 25 },
      { month: "Feb", soilMoisture: 45, rainfall: 15, temperature: 27 },
      { month: "Mar", soilMoisture: 32, rainfall: 8, temperature: 29 },
      { month: "Apr", soilMoisture: 22, rainfall: 4, temperature: 32 },
      { month: "May", soilMoisture: 15, rainfall: 1, temperature: 34 },
    ],
    infrastructure: {
      waterTreatmentPlants: 6,
      reservoirs: 9,
      distributionPoints: 150,
      emergencyTankers: 8,
    },
    environmentalData: {
      humidity: 45,
      windSpeed: 18,
      uvIndex: 11,
      airQuality: 65,
      evapotranspiration: 7.2,
      groundwaterLevel: 25,
      streamFlow: 18,
      vegetationHealth: 28,
      soilMoistureIndex: 15, // New: Soil moisture index (ความชื้นในดิน)
      vegetationStress: 85, // New: Vegetation stress (ความเครียดพืช)
    },
    demographics: {
      urbanPopulation: 210,
      ruralPopulation: 123,
      elderlyPopulation: 20,
      childrenUnder5: 16,
      householdsWithoutPipedWater: 18,
      agricultureDependentJobs: 32,
    },
    economicSectors: {
      agriculture: 5.2,
      manufacturing: 2.8,
      services: 0.5,
    },
    waterInfrastructureDetails: {
      pipelineLength: 2800,
      pumpingStations: 18,
      storageTanks: 65,
      treatmentCapacity: 1800,
      distributionEfficiency: 68,
      leakageRate: 32,
    },
    monthlyForecast: {
      week2: { risk: "emergency", soilMoisture: 10, vegStress: "critical", waterReserves: 18, economicImpact: 12.8 },
      month1: { risk: "emergency", soilMoisture: 6, vegStress: "critical", waterReserves: 12, economicImpact: 22.5 },
      month2: { risk: "emergency", soilMoisture: 4, vegStress: "critical", waterReserves: 8, economicImpact: 35.2 },
    },
  },
]

const criticalSupplyData = [
  { name: "Pipe Sections (Large)", currentStock: 45, minimumStock: 30, leadTimeDays: 7, unit: "units", color: 'blue' },
  { name: "Water Quality Chemicals", currentStock: 12, minimumStock: 20, leadTimeDays: 3, unit: "days supply", color: 'green' }, // Understocked
  { name: "High-Capacity Pumps", currentStock: 8, minimumStock: 5, leadTimeDays: 14, unit: "units", color: 'orange' },
];

const heavyEquipmentData = [
  { name: "Emergency Water Tankers", total: 15, inService: 13, required: 10, icon: Truck, color: 'blue' },
  { name: "Field Excavators", total: 8, inService: 6, required: 5, icon: Wrench, color: 'orange' },
  { name: "Mobile Treatment Units", total: 4, inService: 4, required: 3, icon: Droplet, color: 'green' },
];

// --- Utility Functions ---
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Urgent':
      return 'text-white bg-red-600 border-red-700';
    case 'High':
    case 'Urgent Action': // Include status from old data just in case
      return 'text-white bg-orange-500 border-orange-600';
    case 'Medium':
      return 'text-white bg-yellow-500 border-yellow-600';
    default:
      return 'bg-gray-200 text-gray-800 border-gray-300';
  }
};

const parseCost = (costStr) => {
    // Allows parsing strings like "$150k" or "1,200,000"
    const normalized = costStr.toLowerCase().replace(/[$,]/g, '').trim();
    if (normalized.endsWith('k')) {
      return parseFloat(normalized.slice(0, -1)) * 1000;
    }
    return parseFloat(normalized) || 0;
};

// Function to determine capacity status based on emergency tankers
const getCapacityStatus = (tankers) => {
    if (tankers > 10) {
        return { label: "Sufficient", color: "bg-green-100 text-green-800 border-green-300" };
    } else if (tankers >= 5) {
        return { label: "Stressed", color: "bg-yellow-100 text-yellow-800 border-yellow-300" };
    } else {
        return { label: "Alert", color: "bg-red-100 text-red-800 border-red-300" };
    }
};

// Function to determine stock level color
const getStockLevelColor = (current, min) => {
    if (current < min) {
        return 'bg-red-500';
    } else if (current < min * 1.5) {
        return 'bg-yellow-500';
    } else {
        return 'bg-green-500';
    }
};

const waterManagementActions = [
  {
    id: 1,
    action: "Emergency Water Distribution",
    location: "Rizal Province",
    status: "active",
    priority: "high",
    resources: "12 water trucks deployed",
    startDate: "2024-05-15",
    estimatedCost: "$2.5K",
    beneficiaries: 45000,
    progress: 75,
    coordinator: "Engr. Maria Santos",
    contact: "(02) 8647-3877",
  },
  {
    id: 2,
    action: "Agricultural Support Program",
    location: "Laguna Province",
    status: "planned",
    priority: "medium",
    resources: "Drought-resistant seeds distribution",
    startDate: "2024-05-20",
    estimatedCost: "$1.8K",
    beneficiaries: 12500,
    progress: 25,
    coordinator: "Dr. Juan Dela Cruz",
    contact: "(049) 536-6644",
  },
  {
    id: 3,
    action: "Water Conservation Campaign",
    location: "Metro Manila",
    status: "ongoing",
    priority: "low",
    resources: "Public awareness program",
    startDate: "2024-05-10",
    estimatedCost: "$8K",
    beneficiaries: 2500000,
    progress: 60,
    coordinator: "Ms. Ana Reyes",
    contact: "(02) 8917-7777",
  },
  {
    id: 4,
    action: "Deep Well Drilling",
    location: "Rizal Province",
    status: "planned",
    priority: "high",
    resources: "5 drilling rigs, geological survey",
    startDate: "2024-05-25",
    estimatedCost: "$15K",
    beneficiaries: 85000,
    progress: 10,
    coordinator: "Engr. Roberto Cruz",
    contact: "(02) 8941-1234",
  },
]

const getReservoirColorClass = (percent) => {
    if (percent < 30) return 'bg-red-500';
    if (percent < 60) return 'bg-yellow-500';
    return 'bg-blue-500';
};

const ClimateIndicatorItem = ({ indicator }) => {
  const isIncreasing = indicator.trend === "increasing";
  const isHighSeverity = indicator.severity === "high";

  // Determine icon and color based on trend
  const TrendIcon = isIncreasing ? TrendingUp : TrendingDown;
  const trendColorClass = isIncreasing ? "text-red-500" : "text-cyan-500";
  
  // Line color for the sparkline
  const lineColorClass = isHighSeverity ? "stroke-red-500" : "stroke-green-500"; 

  // Determine the sign for positive numbers
  const sign = indicator.current > 0 ? "+" : "";

  // --------------------------------------------------------
  // Sparkline Generation Logic
  // --------------------------------------------------------
  const data = indicator.historicalData;
  
  // Calculate Min/Max for scaling Y-axis
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;
  
  // ViewBox dimensions: 100 wide, 32 high (to match h-8)
  const viewBoxWidth = 100;
  const viewBoxHeight = 32;

  // Generate the points string for the SVG polyline
  const points = data.map((value, index) => {
    // X position: distributed evenly across the width (0 to 100)
    const x = (index / (data.length - 1)) * viewBoxWidth;
    
    let y;
    if (range === 0) {
        // If all values are the same, plot them in the middle
        y = viewBoxHeight / 2;
    } else {
        // Y position: scaled to fit height (0 to 32). Inverted so higher values are lower Y (top of graph).
        y = viewBoxHeight - ((value - minValue) / range) * viewBoxHeight;
    }
    
    return `${x},${y.toFixed(2)}`;
  }).join(' ');

  // --------------------------------------------------------

  return (
    <div className="space-y-2 p-3 border border-gray-100 rounded-lg bg-white shadow-sm transition hover:shadow-md">
      {/* Name and Current Value/Trend */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">{indicator.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-gray-800">
            {sign}
            {indicator.current.toFixed(1)}
            {indicator.unit}
          </span>
          {/* Trend Icon */}
          <TrendIcon className={`h-5 w-5 ${trendColorClass}`} />
        </div>
      </div>

      {/* Description */}
      <div className="text-xs text-gray-500">{indicator.description}</div>

      {/* Historical Data Sparkline (Line Graph) */}
      <div className="h-8 mt-2 pt-2 border-t border-gray-100 flex items-center justify-center">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none" // Ensure it stretches fully to fill the div
        >
          {/* Polyline: The actual line graph */}
          <polyline
            fill="none"
            className={`${lineColorClass}`}
            strokeWidth="1.5"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
};

const climateIndicators = [
  {
    name: "Rainfall Deficit",
    current: -35,
    trend: "decreasing",
    unit: "%",
    description: "Below 30-year average",
    severity: "high",
    historicalData: [-15, -22, -28, -32, -35],
  },
  {
    name: "Temperature Anomaly",
    current: 2.8,
    trend: "increasing",
    unit: "°C",
    description: "Above normal temperature",
    severity: "medium",
    historicalData: [1.2, 1.8, 2.1, 2.5, 2.8],
  },
  {
    name: "Soil Moisture Index",
    current: 42,
    trend: "decreasing",
    unit: "%",
    description: "Critical low levels",
    severity: "high",
    historicalData: [65, 58, 52, 47, 42],
  },
  {
    name: "Vegetation Stress",
    current: 0.7,
    trend: "increasing",
    unit: "Index",
    description: "Moderate stress levels",
    severity: "medium",
    historicalData: [45, 52, 58, 62, 65],
  },
  {
    name: "Humidity Levels",
    current: -12,
    trend: "decreasing",
    unit: "%",
    description: "Below optimal range",
    severity: "medium",
    historicalData: [-5, -7, -9, -11, -12],
  },
  {
    name: "Evapotranspiration",
    current: 25,
    trend: "increasing",
    unit: "%",
    description: "Above normal water loss",
    severity: "high",
    historicalData: [8, 12, 18, 22, 25],
  },
]

const getDroughtColor = (risk: string) => {
  switch (risk) {
    case "safe":
      return "bg-[var(--color-drought-safe)]"
    case "watch":
      return "bg-[var(--color-drought-watch)]"
    case "warning":
      return "bg-[var(--color-drought-warning)]"
    case "emergency":
      return "bg-[var(--color-drought-emergency)]"
    default:
      return "bg-muted"
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "none":
      return "text-green-500"
    case "low":
      return "text-yellow-500"
    case "moderate":
      return "text-orange-500"
    case "severe":
      return "text-red-500"
    default:
      return "text-muted-foreground"
  }
}

export default function DroughtDashboard() {
  const [droughtPeriod, setDroughtPeriod] = useState("current")
  const [selectedRegion, setSelectedRegion] = useState<any>(null)
  const [viewMode, setViewMode] = useState("risk")
  const [activeTab, setActiveTab] = useState("overview")

  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [impactFilter, setImpactFilter] = useState("all")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const getDroughtDataForPeriod = (period: string) => {
    return droughtData.map((area) => {
      if (period === "current") {
        return area
      } else {
        const forecast = area.monthlyForecast[period as keyof typeof area.monthlyForecast]
        return {
          ...area,
          risk: forecast.risk,
          soilMoisture: forecast.soilMoisture,
          vegStress: forecast.vegStress,
          waterReserves: forecast.waterReserves,
          economicImpact: forecast.economicImpact,
          daysToRisk: period === "week2" ? 14 : period === "month1" ? 30 : 60,
        }
      }
    })
  }

const reservoirLevelData = [
    { name: "Reservoir A (Main)", capacityPercent: 42, status: "Critical", maxVolumeGL: 500, currentVolumeGL: 210, color: 'red' },
    { name: "Reservoir B (Coastal)", capacityPercent: 78, status: "Healthy", maxVolumeGL: 300, currentVolumeGL: 234, color: 'green' },
    { name: "Holding Pond C", capacityPercent: 65, status: "Normal", maxVolumeGL: 150, currentVolumeGL: 97.5, color: 'yellow' },
];


  const getFilteredAndSortedData = () => {
    let filtered = currentDroughtData

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (area) =>
          area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.risk.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.agriculturalImpact.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.recommendation.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply risk filter
    if (riskFilter !== "all") {
      filtered = filtered.filter((area) => area.risk === riskFilter)
    }

    // Apply impact filter
    if (impactFilter !== "all") {
      filtered = filtered.filter((area) => area.agriculturalImpact === impactFilter)
    }

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortField as keyof typeof a]
        let bValue = b[sortField as keyof typeof b]

        // Handle string values
        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }

        if (sortDirection === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        }
      })
    }

    return filtered
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
  }

  const exportToCSV = () => {
    const data = getFilteredAndSortedData()
    const headers = [
      "Region",
      "Longitude",
      "Latitude",
      "Risk Level",
      "Soil Moisture (%)",
      "Water Reserves (%)",
      "Population",
      "Vulnerable Population",
      "Economic Impact ($K)",
      "Agricultural Impact",
      "Days to Risk",
      "Humidity (%)",
      "Groundwater Level (%)",
      "Vegetation Health (%)",
      "UV Index",
      "Treatment Plants",
      "Reservoirs",
      "Emergency Tankers",
      "Distribution Efficiency (%)",
    ]

    const csvContent = [
      headers.join(","),
      ...data.map((area) =>
        [
          area.name,
          area.longitude,
          area.latitude,
          area.risk,
          area.soilMoisture,
          area.waterReserves,
          area.population,
          area.vulnerablePopulation,
          area.economicImpact,
          area.agriculturalImpact,
          area.daysToRisk,
          area.environmentalData.humidity,
          area.environmentalData.groundwaterLevel,
          area.environmentalData.vegetationHealth,
          area.environmentalData.uvIndex,
          area.infrastructure.waterTreatmentPlants,
          area.infrastructure.reservoirs,
          area.infrastructure.emergencyTankers,
          area.waterInfrastructureDetails.distributionEfficiency,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `drought-analytics-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = () => {
    // For Excel export, we'll create a more detailed CSV that can be opened in Excel
    const data = getFilteredAndSortedData()
    const headers = [
      "Region Name",
      "Risk Level",
      "Soil Moisture (%)",
      "Water Reserves (%)",
      "Total Population",
      "Urban Population",
      "Rural Population",
      "Vulnerable Population",
      "Elderly Population",
      "Children Under 5",
      "Households Without Piped Water",
      "Agriculture Dependent Jobs",
      "Economic Impact ($K)",
      "Agriculture Sector Impact ($K)",
      "Manufacturing Sector Impact ($K)",
      "Services Sector Impact ($K)",
      "Agricultural Impact Level",
      "Days to Risk Threshold",
      "Water Demand (ML/day)",
      "Humidity (%)",
      "Wind Speed (km/h)",
      "UV Index",
      "Air Quality",
      "Evapotranspiration (mm)",
      "Groundwater Level (%)",
      "Stream Flow (%)",
      "Vegetation Health (%)",
      "Water Treatment Plants",
      "Reservoirs",
      "Distribution Points",
      "Emergency Tankers",
      "Pipeline Length (km)",
      "Pumping Stations",
      "Storage Tanks",
      "Treatment Capacity (ML/day)",
      "Distribution Efficiency (%)",
      "Leakage Rate (%)",
      "Recommendation",
    ]

    const csvContent = [
      headers.join(","),
      ...data.map((area) =>
        [
          `"${area.name}"`,
          area.risk,
          area.soilMoisture,
          area.waterReserves,
          area.population,
          area.demographics.urbanPopulation,
          area.demographics.ruralPopulation,
          area.vulnerablePopulation,
          area.demographics.elderlyPopulation,
          area.demographics.childrenUnder5,
          area.demographics.householdsWithoutPipedWater,
          area.demographics.agricultureDependentJobs,
          area.economicImpact,
          area.economicSectors.agriculture,
          area.economicSectors.manufacturing,
          area.economicSectors.services,
          area.agriculturalImpact,
          area.daysToRisk,
          area.waterDemand,
          area.environmentalData.humidity,
          area.environmentalData.windSpeed,
          area.environmentalData.uvIndex,
          area.environmentalData.airQuality,
          area.environmentalData.evapotranspiration,
          area.environmentalData.groundwaterLevel,
          area.environmentalData.streamFlow,
          area.environmentalData.vegetationHealth,
          area.infrastructure.waterTreatmentPlants,
          area.infrastructure.reservoirs,
          area.infrastructure.distributionPoints,
          area.infrastructure.emergencyTankers,
          area.waterInfrastructureDetails.pipelineLength,
          area.waterInfrastructureDetails.pumpingStations,
          area.waterInfrastructureDetails.storageTanks,
          area.waterInfrastructureDetails.treatmentCapacity,
          area.waterInfrastructureDetails.distributionEfficiency,
          area.waterInfrastructureDetails.leakageRate,
          `"${area.recommendation}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `drought-detailed-analytics-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateRegionReport = (area: any) => {
    // Generate a detailed report for a specific region
    const reportContent = `
DROUGHT RISK ASSESSMENT REPORT
Region: ${area.name}
Generated: ${new Date().toLocaleDateString()}

CURRENT STATUS:
- Risk Level: ${area.risk.toUpperCase()}
- Soil Moisture: ${area.soilMoisture}%
- Water Reserves: ${area.waterReserves}%
- Days to Risk Threshold: ${area.daysToRisk}

POPULATION DATA:
- Total Population: ${area.population.toLocaleString()}
- Urban Population: ${area.demographics.urbanPopulation.toLocaleString()}
- Rural Population: ${area.demographics.ruralPopulation.toLocaleString()}
- Vulnerable Population: ${area.vulnerablePopulation.toLocaleString()}
- Elderly Population: ${area.demographics.elderlyPopulation.toLocaleString()}
- Children Under 5: ${area.demographics.childrenUnder5.toLocaleString()}

ECONOMIC IMPACT:
- Total Economic Impact: $${area.economicImpact}K
- Agriculture Sector: $${area.economicSectors.agriculture}K
- Manufacturing Sector: $${area.economicSectors.manufacturing}K
- Services Sector: $${area.economicSectors.services}K

ENVIRONMENTAL CONDITIONS:
- Humidity: ${area.environmentalData.humidity}%
- Wind Speed: ${area.environmentalData.windSpeed} km/h
- UV Index: ${area.environmentalData.uvIndex}
- Air Quality: ${area.environmentalData.airQuality}
- Groundwater Level: ${area.environmentalData.groundwaterLevel}%
- Stream Flow: ${area.environmentalData.streamFlow}%
- Vegetation Health: ${area.environmentalData.vegetationHealth}%

INFRASTRUCTURE:
- Water Treatment Plants: ${area.infrastructure.waterTreatmentPlants}
- Reservoirs: ${area.infrastructure.reservoirs}
- Distribution Points: ${area.infrastructure.distributionPoints}
- Emergency Tankers: ${area.infrastructure.emergencyTankers}
- Treatment Capacity: ${area.waterInfrastructureDetails.treatmentCapacity} ML/day
- Distribution Efficiency: ${area.waterInfrastructureDetails.distributionEfficiency}%

RECOMMENDATION:
${area.recommendation}

EMERGENCY CONTACTS:
${area.emergencyContacts.map((contact: any) => `- ${contact.name}: ${contact.phone}`).join("\n")}
    `

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `${area.name.replace(/\s+/g, "-").toLowerCase()}-drought-report-${new Date().toISOString().split("T")[0]}.txt`,
    )
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
const currentDroughtData = getDroughtDataForPeriod(droughtPeriod)
// Handler for action buttons
const handleActionClick = (action) => {
    setMessage(`Action triggered: ${action}. This would initiate a system task.`);
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
};

    // This is a placeholder for the Tabs container styling
const tabsContainerStyle = "p-6 min-h-screen bg-gray-50 dark:bg-gray-900 font-inter";
    
  // Filter and sort data based on the selected filter
  const filteredDroughtData = useMemo(() => {
    let data = currentDroughtData;

    if (riskFilter !== 'all') {
      data = data.filter(d => d.risk === riskFilter);
    }
    // Sorting for Regional Comparison is by soilMoisture
    return data.sort((a, b) => a.soilMoisture - b.soilMoisture);
  }, [riskFilter]);

  // Calculate overall metrics
  const totalEconomicImpact = useMemo(() => {
    return currentDroughtData.reduce((sum, area) => sum + area.economicImpact, 0).toFixed(1);
  }, []);

  const averageSoilMoisture = useMemo(() => {
      const sum = currentDroughtData.reduce((sum, area) => sum + area.soilMoisture, 0);
      return (sum / currentDroughtData.length).toFixed(0);
  }, []);

  const highestRiskArea = useMemo(() => {
    const sorted = [...currentDroughtData].sort((a, b) => {
      const riskOrder = { 'emergency': 3, 'warning': 2, 'low': 1 };
      return riskOrder[b.risk] - riskOrder[a.risk];
    });
    return sorted[0];
  }, []);

    // Calculate the current (week2) risk distribution
    const [selectedDay, setSelectedDay] = useState([0])
    const days = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
const week2Risks = droughtData.map(d => d.monthlyForecast.week2.risk);
const riskCounts = week2Risks.reduce((acc, risk) => {
  acc[risk] = (acc[risk] || 0) + 1;
  return acc;
}, {});
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance flex items-center gap-3">
            <Droplets className="h-8 w-8 text-blue-500" />
            Drought Monitoring & Management
          </h1>
          <p className="text-muted-foreground text-balance">
            Comprehensive drought forecasting, resource management, and emergency response coordination
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="risk">Risk Assessment</SelectItem>
              <SelectItem value="water">Water Resources</SelectItem>
              <SelectItem value="agriculture">Agricultural Impact</SelectItem>
              <SelectItem value="economic">Economic Impact</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview & Maps</TabsTrigger>
          <TabsTrigger value="analytics">Detailed Analytics</TabsTrigger>
          <TabsTrigger value="management">Resource Management</TabsTrigger>
          <TabsTrigger value="forecasting">Extended Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Map Panel */}
            <div className="lg:col-span-2">
              <Card className="h-[1100px]">


                <CardHeader className="border-b border-border">
                              <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                  <MapPin className="h-5 w-5 text-primary" />
                                  Interactive Drought Risk Map
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
                  <div className="h-2/3 relative bg-muted/20">
                    <div className="absolute inset-4 bg-card rounded border border-border overflow-hidden">
                      {/* NEW: Background Image Layer */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20" 
                style={{ 
                    backgroundImage: `url('/images/map2.png')`, 
                }}
            />

            {/* Map Labels and Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Grid lines for reference */}
                <svg className="w-full h-full opacity-10 text-primary-foreground">
                    <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

            </div>
                      {/* Geographic Map Visualization */}
                      <div className="relative w-full h-full bg-gradient-to-br from-muted/30 to-muted/10">
                        {currentDroughtData.map((area, index) => (
                          <div
                            key={area.id}
                            className={`absolute cursor-pointer transition-all hover:opacity-80 ${getDroughtColor(area.risk)} opacity-70 hover:scale-105`}
                            style={{
                              left: `${15 + (index % 2) * 40}%`,
                              top: `${20 + Math.floor(index / 2) * 35}%`,
                              width: `${30 + area.soilMoisture / 5}%`,
                              height: `${25 + area.soilMoisture / 8}%`,
                              clipPath:
                                index % 2 === 0
                                  ? "polygon(0% 20%, 60% 20%, 100% 0%, 100% 80%, 40% 100%, 0% 80%)"
                                  : "polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)",
                            }}
                            onClick={() => setSelectedRegion(area)}
                            title={`${area.name} - ${area.risk.toUpperCase()}`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-xs font-bold text-background drop-shadow-sm">
                                  {area.name.split(" ")[0]}
                                </div>
                                <div className="text-xs text-background/90 drop-shadow-sm">
                                  {viewMode === "risk" && `${area.soilMoisture}%`}
                                  {viewMode === "water" && `${area.waterReserves}%`}
                                  {viewMode === "agriculture" && area.agriculturalImpact}
                                  {viewMode === "economic" && `$${area.economicImpact}K`}
                                </div>
                              </div>
                            </div>

                            {/* Risk indicator dot */}
                            <div
                              className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-background ${getDroughtColor(area.risk)}`}
                            >
                              {area.risk === "emergency" && (
                                <AlertTriangle className="w-2 h-2 text-background absolute inset-0.5" />
                              )}
                            </div>

                            {/* Trend indicators */}
                            {droughtPeriod !== "current" && (
                              <div className="absolute bottom-1 left-1">
                                {area.soilMoisture < 30 ? (
                                  <TrendingDown className="w-3 h-3 text-red-500" />
                                ) : (
                                  <TrendingUp className="w-3 h-3 text-green-500" />
                                )}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Map Labels and Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Grid lines for reference */}
                          <svg className="w-full h-full opacity-20">
                            <defs>
                              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                          </svg>

                          {/* Compass */}
                          <div className="absolute top-4 right-4 bg-card/80 rounded-full p-2 border border-border">
                            <div className="w-6 h-6 relative">
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                N
                              </div>
                              <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-primary transform -translate-x-0.5"></div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {viewMode === "risk" && "Drought Risk Assessment"}
                              {viewMode === "water" && "Water Reserve Levels"}
                              {viewMode === "agriculture" && "Agricultural Impact"}
                              {viewMode === "economic" && "Economic Impact"}
                              {" - "}
                              {droughtPeriod === "current"
                                ? "Current"
                                : droughtPeriod === "week2"
                                  ? "2 Week Forecast"
                                  : droughtPeriod === "month1"
                                    ? "1 Month Forecast"
                                    : "2 Month Forecast"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    

                    {/* Enhanced Legend */}
                    <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-3">
                      <h4 className="text-sm font-medium mb-2">
                        {viewMode === "risk" && "Drought Risk Levels"}
                        {viewMode === "water" && "Water Reserve Status"}
                        {viewMode === "agriculture" && "Agricultural Impact"}
                        {viewMode === "economic" && "Economic Impact ($K)"}
                      </h4>
                      <div className="space-y-1">
                        {viewMode === "risk" &&
                          [
                            { level: "Safe", color: "bg-[var(--color-drought-safe)]", range: "> 60% moisture" },
                            { level: "Watch", color: "bg-[var(--color-drought-watch)]", range: "40-60% moisture" },
                            { level: "Warning", color: "bg-[var(--color-drought-warning)]", range: "20-40% moisture" },
                            {
                              level: "Emergency",
                              color: "bg-[var(--color-drought-emergency)]",
                              range: "< 20% moisture",
                            },
                          ].map((item) => (
                            <div key={item.level} className="flex items-center gap-2 text-xs">
                              <div className={`w-3 h-3 rounded ${item.color}`} />
                              <span className="font-medium">{item.level}</span>
                              <span className="text-muted-foreground">({item.range})</span>
                            </div>
                          ))}

                        {viewMode === "water" &&
                          [
                            { level: "Adequate", color: "bg-green-500", range: "> 80%" },
                            { level: "Moderate", color: "bg-yellow-500", range: "50-80%" },
                            { level: "Low", color: "bg-orange-500", range: "30-50%" },
                            { level: "Critical", color: "bg-red-500", range: "< 30%" },
                          ].map((item) => (
                            <div key={item.level} className="flex items-center gap-2 text-xs">
                              <div className={`w-3 h-3 rounded ${item.color}`} />
                              <span className="font-medium">{item.level}</span>
                              <span className="text-muted-foreground">({item.range})</span>
                            </div>
                          ))}

                        {viewMode === "agriculture" &&
                          [
                            { level: "None", color: "bg-green-500" },
                            { level: "Low", color: "bg-yellow-500" },
                            { level: "Moderate", color: "bg-orange-500" },
                            { level: "Severe", color: "bg-red-500" },
                          ].map((item) => (
                            <div key={item.level} className="flex items-center gap-2 text-xs">
                              <div className={`w-3 h-3 rounded ${item.color}`} />
                              <span className="font-medium">{item.level}</span>
                            </div>
                          ))}

                        {viewMode === "economic" &&
                          [
                            { level: "Low", color: "bg-green-500", range: "< $2K" },
                            { level: "Moderate", color: "bg-yellow-500", range: "$2K - $5K" },
                            { level: "High", color: "bg-orange-500", range: "$5K - $10K" },
                            { level: "Severe", color: "bg-red-500", range: "> $10K" },
                          ].map((item) => (
                            <div key={item.level} className="flex items-center gap-2 text-xs">
                              <div className={`w-3 h-3 rounded ${item.color}`} />
                              <span className="font-medium">{item.level}</span>
                              <span className="text-muted-foreground">({item.range})</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                            
                  <div className="h-1/3 p-4 overflow-y-auto border-t border-border">
                    <div className="space-y-3">
                      
                      {currentDroughtData.map((area) => (
                        <div
                          key={area.id}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setSelectedRegion(area)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${getDroughtColor(area.risk)}`} />
                            <div>
                              <div className="font-medium text-sm flex items-center gap-2">
                                {area.name}
                                {droughtPeriod !== "current" && <TrendingDown className="h-3 w-3 text-orange-500" />}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-3">
                                <span>
                                  {area.risk === "safe"
                                    ? `Next assessment in ${area.daysToRisk} days`
                                    : `Risk in ${area.daysToRisk} days`}
                                </span>
                                <span>•</span>
                                <span>Pop: {area.population}</span>
                                <span>•</span>
                                <span>Vulnerable: {area.vulnerablePopulation}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium flex items-center gap-2">
                              <span>{area.soilMoisture}%</span>
                              <div className="w-12 h-2 bg-muted rounded">
                                <div
                                  className={`h-full rounded ${
                                    area.soilMoisture > 60
                                      ? "bg-green-500"
                                      : area.soilMoisture > 40
                                        ? "bg-yellow-500"
                                        : area.soilMoisture > 20
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                  }`}
                                  style={{ width: `${area.soilMoisture}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground capitalize flex items-center gap-2">
                              <span>{area.vegStress}</span>
                              <span>•</span>
                              <span>${area.economicImpact}K</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                        
                  {selectedRegion && (
                    <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-4 max-w-md shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-lg">{selectedRegion.name}</h4>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedRegion(null)}>
                          ×
                        </Button>
                      </div>

                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="overview" className="text-xs">
                            Overview
                          </TabsTrigger>
                          <TabsTrigger value="environment" className="text-xs">
                            Environment
                          </TabsTrigger>
                          <TabsTrigger value="demographics" className="text-xs">
                            Demographics
                          </TabsTrigger>
                          <TabsTrigger value="infrastructure" className="text-xs">
                            Infrastructure
                          </TabsTrigger>
                          <TabsTrigger value="response" className="text-xs">
                            Response
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Soil Moisture</span>
                                <span className="font-medium">{selectedRegion.soilMoisture}%</span>
                              </div>
                              <Progress value={selectedRegion.soilMoisture} className="h-2" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Water Reserves</span>
                                <span className="font-medium">{selectedRegion.waterReserves}%</span>
                              </div>
                              <Progress value={selectedRegion.waterReserves} className="h-2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3 text-blue-500" />
                              <span>Pop: {selectedRegion.population}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                              <span>Vulnerable: {selectedRegion.vulnerablePopulation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Sprout className="h-3 w-3 text-green-500" />
                              <span>Veg Stress: {selectedRegion.vegStress}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-3 w-3 text-red-500" />
                              <span>Economic: ${selectedRegion.economicImpact}K</span>
                            </div>
                          </div>

                          {/* Historical trend mini-chart */}
                          <div className="mt-3 p-2 bg-muted/30 rounded">
                            <h5 className="text-xs font-medium mb-2">5-Month Soil Moisture Trend</h5>
                            <div className="flex items-end gap-1 h-8">
                              {selectedRegion.historicalData.map((data: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex-1 bg-blue-500/30 rounded-t"
                                  style={{ height: `${(data.soilMoisture / 80) * 100}%` }}
                                  title={`${data.month}: ${data.soilMoisture}%`}
                                ></div>
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              {selectedRegion.historicalData.map((data: any) => (
                                <span key={data.month}>{data.month}</span>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="environment" className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <Droplets className="h-3 w-3 text-blue-500" />
                                  Humidity
                                </span>
                                <span className="font-medium">{selectedRegion.environmentalData.humidity}%</span>
                              </div>
                              <Progress value={selectedRegion.environmentalData.humidity} className="h-2" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <Waves className="h-3 w-3 text-blue-500" />
                                  Groundwater
                                </span>
                                <span className="font-medium">
                                  {selectedRegion.environmentalData.groundwaterLevel}%
                                </span>
                              </div>
                              <Progress value={selectedRegion.environmentalData.groundwaterLevel} className="h-2" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <Activity className="h-3 w-3 text-green-500" />
                                  Vegetation
                                </span>
                                <span className="font-medium">
                                  {selectedRegion.environmentalData.vegetationHealth}%
                                </span>
                              </div>
                              <Progress value={selectedRegion.environmentalData.vegetationHealth} className="h-2" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <CloudRain className="h-3 w-3 text-blue-500" />
                                  Stream Flow
                                </span>
                                <span className="font-medium">{selectedRegion.environmentalData.streamFlow}%</span>
                              </div>
                              <Progress value={selectedRegion.environmentalData.streamFlow} className="h-2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-3 w-3 text-red-500" />
                              <span>UV Index: {selectedRegion.environmentalData.uvIndex}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-yellow-500" />
                              <span>Wind: {selectedRegion.environmentalData.windSpeed} km/h</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-3 w-3 text-green-500" />
                              <span>Air Quality: {selectedRegion.environmentalData.airQuality}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-3 w-3 text-orange-500" />
                              <span>Evapotranspiration: {selectedRegion.environmentalData.evapotranspiration}mm</span>
                            </div>
                          </div>

                          {/* Environmental trend chart */}
                          <div className="mt-3 p-2 bg-muted/30 rounded">
                            <h5 className="text-xs font-medium mb-2">Environmental Indicators</h5>
                            <div className="space-y-1">
                              {[
                                {
                                  name: "Humidity",
                                  value: selectedRegion.environmentalData.humidity,
                                  color: "bg-blue-500",
                                },
                                {
                                  name: "Soil Moisture",
                                  value: selectedRegion.environmentalData.soilMoistureIndex,
                                  color: "bg-amber-600",
                                },
                                {
                                  name: "Vegetation Stress",
                                  value: selectedRegion.environmentalData.vegetationStress,
                                  color: "bg-red-500",
                                },
                                {
                                  name: "Groundwater",
                                  value: selectedRegion.environmentalData.groundwaterLevel,
                                  color: "bg-cyan-500",
                                },
                                {
                                  name: "Vegetation Health",
                                  value: selectedRegion.environmentalData.vegetationHealth,
                                  color: "bg-green-500",
                                },
                                {
                                  name: "Stream Flow",
                                  value: selectedRegion.environmentalData.streamFlow,
                                  color: "bg-blue-400",
                                },
                              ].map((indicator) => (
                                <div key={indicator.name} className="flex items-center gap-2">
                                  <span className="text-xs w-16">{indicator.name}</span>
                                  <div className="flex-1 h-2 bg-muted rounded">
                                    <div
                                      className={`h-full rounded ${indicator.color}`}
                                      style={{ width: `${indicator.value}%` }}
                                    />
                                  </div>
                                  <span className="text-xs w-8">{indicator.value}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="demographics" className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 bg-blue-500/10 rounded">
                              <div className="text-lg font-bold text-blue-500">
                                {selectedRegion.demographics.urbanPopulation}
                              </div>
                              <div className="text-xs text-muted-foreground">Urban Population</div>
                            </div>
                            <div className="text-center p-2 bg-green-500/10 rounded">
                              <div className="text-lg font-bold text-green-500">
                                {selectedRegion.demographics.ruralPopulation}
                              </div>
                              <div className="text-xs text-muted-foreground">Rural Population</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-xs font-medium">Vulnerable Groups</h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3 text-orange-500" />
                                <span>
                                  Elderly: {selectedRegion.demographics.elderlyPopulation}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3 text-pink-500" />
                                <span>
                                  {"Children <5: "}
                                  {selectedRegion.demographics.childrenUnder5}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Home className="h-3 w-3 text-red-500" />
                                <span>
                                  No Piped Water:{" "}
                                  {selectedRegion.demographics.householdsWithoutPipedWater}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Sprout className="h-3 w-3 text-green-500" />
                                <span>
                                  Agri Jobs: {selectedRegion.demographics.agricultureDependentJobs}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-xs font-medium">Economic Sectors Impact ($K)</h5>
                            <div className="space-y-1">
                              {Object.entries(selectedRegion.economicSectors).map(([sector, impact]) => (
                                <div key={sector} className="flex items-center justify-between">
                                  <span className="text-xs capitalize">{sector}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-muted rounded">
                                      <div
                                        className="h-full bg-red-500 rounded"
                                        style={{ width: `${(impact / 6) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-medium">${impact}K</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Population distribution chart */}
                          <div className="mt-3 p-2 bg-muted/30 rounded">
                            <h5 className="text-xs font-medium mb-2">Population Distribution</h5>
                            <div className="flex h-4 rounded overflow-hidden">
                              <div
                                className="bg-blue-500"
                                style={{
                                  width: `${(selectedRegion.demographics.urbanPopulation / selectedRegion.population) * 100}%`,
                                }}
                                title="Urban Population"
                              />
                              <div
                                className="bg-green-500"
                                style={{
                                  width: `${(selectedRegion.demographics.ruralPopulation / selectedRegion.population) * 100}%`,
                                }}
                                title="Rural Population"
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>
                                Urban (
                                {(
                                  (selectedRegion.demographics.urbanPopulation / selectedRegion.population) *
                                  100
                                ).toFixed(0)}
                                %)
                              </span>
                              <span>
                                Rural (
                                {(
                                  (selectedRegion.demographics.ruralPopulation / selectedRegion.population) *
                                  100
                                ).toFixed(0)}
                                %)
                              </span>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="infrastructure" className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 bg-blue-500/10 rounded">
                              <div className="text-lg font-bold text-blue-500">
                                {selectedRegion.waterInfrastructureDetails.treatmentCapacity}
                              </div>
                              <div className="text-xs text-muted-foreground">ML/day Capacity</div>
                            </div>
                            <div className="text-center p-2 bg-green-500/10 rounded">
                              <div className="text-lg font-bold text-green-500">
                                {selectedRegion.waterInfrastructureDetails.distributionEfficiency}%
                              </div>
                              <div className="text-xs text-muted-foreground">Distribution Efficiency</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-xs font-medium">Water Infrastructure</h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <Factory className="h-3 w-3 text-blue-500" />
                                <span>Treatment Plants: {selectedRegion.infrastructure.waterTreatmentPlants}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Database className="h-3 w-3 text-cyan-500" />
                                <span>Reservoirs: {selectedRegion.infrastructure.reservoirs}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-green-500" />
                                <span>Distribution Points: {selectedRegion.infrastructure.distributionPoints}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Truck className="h-3 w-3 text-orange-500" />
                                <span>Emergency Tankers: {selectedRegion.infrastructure.emergencyTankers}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-xs font-medium">System Details</h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <Activity className="h-3 w-3 text-purple-500" />
                                <span>Pipeline: {selectedRegion.waterInfrastructureDetails.pipelineLength}km</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                <span>
                                  Pumping Stations: {selectedRegion.waterInfrastructureDetails.pumpingStations}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Database className="h-3 w-3 text-blue-500" />
                                <span>Storage Tanks: {selectedRegion.waterInfrastructureDetails.storageTanks}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                <span>Leakage Rate: {selectedRegion.waterInfrastructureDetails.leakageRate}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-xs font-medium">Water Sources</h5>
                            <div className="space-y-1">
                              {selectedRegion.waterSources.map((source: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                  <Droplets className="h-3 w-3 text-blue-500" />
                                  <span>{source}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Infrastructure efficiency chart */}
                          <div className="mt-3 p-2 bg-muted/30 rounded">
                            <h5 className="text-xs font-medium mb-2">System Performance</h5>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Distribution Efficiency</span>
                                <span className="text-xs font-medium">
                                  {selectedRegion.waterInfrastructureDetails.distributionEfficiency}%
                                </span>
                              </div>
                              <Progress
                                value={selectedRegion.waterInfrastructureDetails.distributionEfficiency}
                                className="h-2"
                              />

                              <div className="flex items-center justify-between">
                                <span className="text-xs">Water Loss (Leakage)</span>
                                <span className="text-xs font-medium text-red-500">
                                  {selectedRegion.waterInfrastructureDetails.leakageRate}%
                                </span>
                              </div>
                              <Progress value={selectedRegion.waterInfrastructureDetails.leakageRate} className="h-2" />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="response" className="space-y-2 text-sm">
                          <div className="space-y-2">
                            <h5 className="text-xs font-medium mb-2">Emergency Contacts</h5>
                            {selectedRegion.emergencyContacts.map((contact: any, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <Phone className="h-3 w-3 text-green-500" />
                                <span>
                                  {contact.name}: {contact.phone}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-3">
                            <h5 className="text-xs font-medium mb-2">Active Response Measures</h5>
                            <div className="space-y-1 text-xs">
                              {waterManagementActions
                                .filter((action) => action.location.includes(selectedRegion.name.split(" ")[0]))
                                .map((action) => (
                                  <div key={action.id} className="p-2 bg-muted/30 rounded">
                                    <div className="font-medium">{action.action}</div>
                                    <div className="text-muted-foreground">Status: {action.status}</div>
                                    <div className="text-muted-foreground">Progress: {action.progress}%</div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="mt-3">
                            <h5 className="text-xs font-medium mb-2">Quick Actions</h5>
                            <div className="space-y-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start text-xs bg-transparent"
                              >
                                <Truck className="h-3 w-3 mr-2" />
                                Deploy Water Trucks
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start text-xs bg-transparent"
                              >
                                <Shield className="h-3 w-3 mr-2" />
                                Activate Emergency Protocol
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Management and Actions */}
            <div className="space-y-6">
              {/* Water Management Actions */}
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-500" />
                    Water Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {waterManagementActions.map((action) => (
                    <div key={action.id} className="p-3 bg-muted/30 border border-border/50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{action.action}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            action.status === "active"
                              ? "bg-green-500/20 text-green-500"
                              : action.status === "planned"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-blue-500/20 text-blue-500"
                          }`}
                        >
                          {action.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{action.location}</p>
                      <p className="text-xs">{action.resources}</p>
                    </div>
                  ))}
                </CardContent>
              </Card> 
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Deploy Water Trucks
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                    <Sprout className="h-4 w-4 mr-2" />
                    Agricultural Support
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                    <Droplets className="h-4 w-4 mr-2" />
                    Water Conservation Alert
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Main Stats Grid - Refactored to use CardHeader and CardContent */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                        <Card>
                                          <CardHeader>
                                            <p className="text-sm font-medium text-gray-500">Avg. Soil Moisture</p>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="flex justify-between items-center">
                                                <p className="text-4xl font-bold text-blue-600">{averageSoilMoisture}%</p>
                                                <Droplet className="h-10 w-10 text-blue-500 p-1 bg-blue-100 rounded-full" />
                                            </div>
                                            <div className="text-xs text-gray-400 mt-3">Target: {'>'} 60%</div>
                                          </CardContent>
                                        </Card>
                                        <Card>
                                          <CardHeader>
                                            <p className="text-sm font-medium text-gray-500">Highest Risk Area</p>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xl font-bold text-gray-800">{highestRiskArea.name}</p>
                                                <Zap className="h-10 w-10 text-red-500 p-1 bg-red-100 rounded-full" />
                                            </div>
                                            <Badge className={getPriorityColor(highestRiskArea.risk === 'emergency' ? "high" : highestRiskArea.risk === "warning" ? "medium" : "low") + " mt-3"}>
                                                {highestRiskArea.risk.toUpperCase()}
                                            </Badge>
                                          </CardContent>
                                        </Card>
                                        <Card>
                                          <CardHeader>
                                            <p className="text-sm font-medium text-gray-500">Total Economic Impact</p>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="flex justify-between items-center">
                                                <p className="text-4xl font-bold text-red-500">${totalEconomicImpact}K</p>
                                                <Target className="h-10 w-10 text-orange-500 p-1 bg-orange-100 rounded-full" />
                                            </div>
                                            <div className="text-xs text-gray-400 mt-3">Losses Q3 YTD</div>
                                          </CardContent>
                                        </Card>
                                        <Card>
                                          <CardHeader>
                                            <p className="text-sm font-medium text-gray-500">Monitoring Date</p>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xl font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
                                                <Clock className="h-10 w-10 text-green-500 p-1 bg-green-100 rounded-full" />
                                            </div>
                                            <div className="text-xs text-gray-400 mt-3">Data refresh: 30 min ago</div>
                                          </CardContent>
                                        </Card>
                                      </div>
          <div className="grid grid-cols-1 gap-6">
            {/* Data Table with Advanced Features */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Comprehensive Drought Analytics
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => exportToCSV()}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportToExcel()}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by region name, risk level, or impact..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger className="w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Risk Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risks</SelectItem>
                        <SelectItem value="safe">Safe</SelectItem>
                        <SelectItem value="watch">Watch</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={impactFilter} onValueChange={setImpactFilter}>
                      <SelectTrigger className="w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Impact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Impact</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setRiskFilter("all")
                        setImpactFilter("all")
                        setSortField("")
                        setSortDirection("asc")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>

                {/* Advanced Data Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[200px]">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("name")}
                          >
                            Region
                            {getSortIcon("name")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("longitude")}
                          >
                            Longitude
                            {getSortIcon("longitude")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("latitude")}
                          >
                            Latitude
                            {getSortIcon("latitude")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("risk")}
                          >
                            Risk Level
                            {getSortIcon("risk")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("soilMoisture")}
                          >
                            Soil Moisture
                            {getSortIcon("soilMoisture")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("waterReserves")}
                          >
                            Water Reserves
                            {getSortIcon("waterReserves")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("population")}
                          >
                            Population
                            {getSortIcon("population")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("vulnerablePopulation")}
                          >
                            Vulnerable Pop.
                            {getSortIcon("vulnerablePopulation")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("economicImpact")}
                          >
                            Economic Impact
                            {getSortIcon("economicImpact")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("agriculturalImpact")}
                          >
                            Agricultural Impact
                            {getSortIcon("agriculturalImpact")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 font-medium"
                            onClick={() => handleSort("daysToRisk")}
                          >
                            Days to Risk
                            {getSortIcon("daysToRisk")}
                          </Button>
                        </TableHead>
                        <TableHead>Environmental Data</TableHead>
                        <TableHead>Infrastructure</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredAndSortedData().map((area) => (
                        <TableRow key={area.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded ${getDroughtColor(area.risk)}`} />
                              {area.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className={`font-medium`}>
                                {area.longitude}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className={`font-medium`}>
                                {area.latitude}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getPriorityColor(
                                area.risk === "emergency" ? "high" : area.risk === "warning" ? "medium" : "low",
                              )}
                            >
                              {area.risk.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded">
                                <div
                                  className={`h-full rounded ${
                                    area.soilMoisture > 60
                                      ? "bg-green-500"
                                      : area.soilMoisture > 40
                                        ? "bg-yellow-500"
                                        : area.soilMoisture > 20
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                  }`}
                                  style={{ width: `${area.soilMoisture}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{area.soilMoisture}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded">
                                <div
                                  className={`h-full rounded ${
                                    area.waterReserves > 80
                                      ? "bg-green-500"
                                      : area.waterReserves > 50
                                        ? "bg-yellow-500"
                                        : area.waterReserves > 30
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                  }`}
                                  style={{ width: `${area.waterReserves}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{area.waterReserves}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{area.population}</div>
                              <div className="text-xs text-muted-foreground">
                                Urban: {area.demographics.urbanPopulation}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Rural: {area.demographics.ruralPopulation}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium text-orange-500">
                                {area.vulnerablePopulation}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Elderly: {area.demographics.elderlyPopulation}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {"Children <5: "}
                                {area.demographics.childrenUnder}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium text-red-500">${area.economicImpact}K</div>
                              <div className="text-xs text-muted-foreground">
                                Agri: ${area.economicSectors.agriculture}K
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Mfg: ${area.economicSectors.manufacturing}K
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getImpactColor(area.agriculturalImpact)}>
                              {area.agriculturalImpact.toUpperCase()}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              Jobs: {area.demographics.agricultureDependentJobs}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div
                                className={`font-medium ${area.daysToRisk <= 7 ? "text-red-500" : area.daysToRisk <= 14 ? "text-orange-500" : "text-green-500"}`}
                              >
                                {area.daysToRisk} days
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {area.risk === "safe" ? "Next assessment" : "Risk threshold"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-1">
                                <Droplets className="h-3 w-3 text-blue-500" />
                                <span>Humidity: {area.environmentalData.humidity}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Waves className="h-3 w-3 text-cyan-500" />
                                <span>Groundwater: {area.environmentalData.groundwaterLevel}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Activity className="h-3 w-3 text-green-500" />
                                <span>Vegetation: {area.environmentalData.vegetationHealth}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-3 w-3 text-red-500" />
                                <span>UV: {area.environmentalData.uvIndex}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-1">
                                <Factory className="h-3 w-3 text-blue-500" />
                                <span>Plants: {area.infrastructure.waterTreatmentPlants}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Database className="h-3 w-3 text-cyan-500" />
                                <span>Reservoirs: {area.infrastructure.reservoirs}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Truck className="h-3 w-3 text-orange-500" />
                                <span>Tankers: {area.infrastructure.emergencyTankers}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                <span>Efficiency: {area.waterInfrastructureDetails.distributionEfficiency}%</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs bg-transparent"
                                onClick={() => setSelectedRegion(area)}
                              >
                                View Details
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs bg-transparent"
                                onClick={() => generateRegionReport(area)}
                              >
                                Generate Report
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Table Summary */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    Showing {getFilteredAndSortedData().length} of {currentDroughtData.length} regions
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      Total Population:{" "}
                      {(getFilteredAndSortedData().reduce((sum, area) => sum + area.population, 0) / 1000000).toFixed(
                        1,
                      )}
                      M
                    </div>
                    <div>
                      Total Economic Impact: $
                      {getFilteredAndSortedData()
                        .reduce((sum, area) => sum + area.economicImpact, 0)
                        .toFixed(1)}
                      B
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Climate Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Climate Indicators
                  </CardTitle>
                </CardHeader>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {climateIndicators.map((indicator, index) => (
            <ClimateIndicatorItem key={index} indicator={indicator} />
          ))}
        </div>
              </Card>

              {/* Regional Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Regional Risk Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentDroughtData
                      .sort((a, b) => a.soilMoisture - b.soilMoisture)
                      .map((area) => (
                        <div key={area.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{area.name}</span>
                            <div className="flex items-center gap-2">
                              <span>{area.soilMoisture}%</span>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(
                                  area.risk === "emergency" ? "high" : area.risk === "warning" ? "medium" : "low",
                                )}
                              >
                                {area.risk}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={area.soilMoisture} className="flex-1 h-2" />
                            <span className="text-xs text-muted-foreground w-16">${area.economicImpact}B</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Water Resource Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5 text-blue-500" />
                    Water Resource Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentDroughtData.map((area) => (
                      <div key={area.id} className="p-3 border border-border rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{area.name}</span>
                          <span className="text-sm">{area.waterReserves}%</span>
                        </div>
                        <Progress value={area.waterReserves} className="h-2 mb-2" />
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>Demand: {area.waterDemand}ML/day</div>
                          <div>Population: {(area.population / 1000000).toFixed(1)}M</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Economic Impact Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    Economic Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-muted/30 rounded">
                      <div className="text-2xl font-bold text-red-500">
                        ${currentDroughtData.reduce((sum, area) => sum + area.economicImpact, 0).toFixed(1)}B
                      </div>
                      <div className="text-sm text-muted-foreground">Total Economic Impact</div>
                    </div>

                    <div className="space-y-2">
                      {currentDroughtData
                        .sort((a, b) => b.economicImpact - a.economicImpact)
                        .map((area) => (
                          <div key={area.id} className="flex items-center justify-between text-sm">
                            <span>{area.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">${area.economicImpact}B</span>
                              <div className="w-16 h-2 bg-muted rounded">
                                <div
                                  className="h-full bg-red-500 rounded"
                                  style={{
                                    width: `${(area.economicImpact / Math.max(...currentDroughtData.map((d) => d.economicImpact))) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Operations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Active Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {waterManagementActions.map((action) => (
                  <div key={action.id} className="p-4 border border-border rounded space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{action.action}</span>
                      <Badge variant="outline" className={getPriorityColor(action.priority)}>
                        {action.priority}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>Location: {action.location}</div>
                      <div>Status: {action.status}</div>
                      <div>Start: {action.startDate}</div>
                      <div>Cost: {action.estimatedCost}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{action.progress}%</span>
                      </div>
                      <Progress value={action.progress} className="h-2" />
                    </div>

                    <div className="text-sm">
                      <div className="font-medium">Resources: {action.resources}</div>
                      <div className="text-muted-foreground">
                        Beneficiaries: {action.beneficiaries.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">
                        Coordinator: {action.coordinator} ({action.contact})
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between w-full">
                    <span className='flex items-center gap-2'>
                        <Box className="h-5 w-5 text-purple-600" />
                        Critical Supply Chain Readiness
                    </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Critical Material Inventory */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-lg border-b pb-2 text-gray-700 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Critical Material Inventory
                  </h5>
                  {criticalSupplyData.map((item) => {
                    const stockPercent = (item.currentStock / item.minimumStock) * 50 + 50; // Scale to show relative fullness, max 100%
                    const stockColor = getStockLevelColor(item.currentStock, item.minimumStock);
                    const isAlert = item.currentStock < item.minimumStock;

                    return (
                        <div key={item.name} className={`p-3 bg-white border rounded-lg shadow-sm ${isAlert ? 'border-red-400' : ''}`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 font-bold text-gray-800">
                                    <Box className={`h-5 w-5 text-${item.color}-600`} />
                                    {item.name}
                                </div>
                                {/* Status Badge */}
                                <Badge variant="outline" className={`${stockColor.replace('-500', '-100')} ${stockColor.replace('500', '800')} border-2 border-current shadow-md`}>
                                    {isAlert ? 'Reorder Needed' : 'Adequate Stock'}
                                </Badge>
                            </div>

                            {/* Stock and Lead Time Row */}
                            <div className="flex justify-between text-xs font-medium mb-1">
                                <div className="flex items-center gap-1 text-gray-600">
                                    Current Stock: <span className='font-bold text-gray-800'>{item.currentStock} {item.unit}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                    Min Stock: <span className='font-bold'>{item.minimumStock} {item.unit}</span>
                                </div>
                                <div className="flex items-center gap-1 text-blue-600">
                                    Lead Time: <span className='font-bold'>{item.leadTimeDays} days</span>
                                </div>
                            </div>

                            {/* Stock Level Progress Bar */}
                            <div className="relative h-2 w-full rounded-full bg-gray-200 mt-2">
                                <div 
                                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${stockColor}`} 
                                    style={{ width: `${Math.min(stockPercent, 100)}%` }}
                                ></div>
                                {/* Minimum Stock Marker (50% of the bar represents min stock) */}
                                <div 
                                    className="absolute top-0 h-2 w-0.5 bg-gray-900 border-l border-white" 
                                    style={{ left: `50%` }}
                                    title={`Minimum Stock Threshold`}
                                ></div>
                            </div>
                        </div>
                    );
                  })}
                </div>

                {/* Heavy Equipment Readiness */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-lg border-b pb-2 text-gray-700 flex items-center gap-2">
                    <HardHat className="h-4 w-4" />
                    Heavy Equipment Readiness
                  </h5>
                  {heavyEquipmentData.map((item) => {
                    const Icon = item.icon;
                    const readinessRate = (item.inService / item.total) * 100;
                    const isCritical = readinessRate < 80;

                    return (
                        <div key={item.name} className="p-3 bg-white border rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 font-bold text-gray-800">
                                    <Icon className={`h-5 w-5 text-${item.color}-600`} />
                                    {item.name}
                                </div>
                                {/* Readiness Badge */}
                                <Badge variant="secondary" className={`${isCritical ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} font-bold`}>
                                    {isCritical ? 'Critical Downtime' : 'High Readiness'}
                                </Badge>
                            </div>

                            {/* Status Summary Row */}
                            <div className="flex justify-between text-xs font-medium mb-1 text-gray-600">
                                <div>Total: <span className='font-bold'>{item.total}</span></div>
                                <div>In Service: <span className='font-bold text-green-700'>{item.inService}</span></div>
                                <div>Required Min: <span className='font-bold text-orange-700'>{item.required}</span></div>
                                <div>Readiness: <span className='font-bold text-blue-700'>{readinessRate.toFixed(0)}%</span></div>
                            </div>

                            {/* Readiness Progress Bar */}
                            <div className="relative h-2 w-full rounded-full bg-gray-200 mt-2">
                                <div 
                                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${isCritical ? 'bg-red-500' : 'bg-green-500'}`} 
                                    style={{ width: `${readinessRate}%` }}
                                ></div>
                                {/* Required Min Marker */}
                                <div 
                                    className="absolute top-0 h-2 w-0.5 bg-gray-900 border-l border-white" 
                                    style={{ left: `${(item.required / item.total) * 100}%` }}
                                    title={`Minimum Required: ${item.required}`}
                                ></div>
                            </div>
                        </div>
                    );
                  })}
                </div>

               
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Extended Forecast Timeline */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Extended Drought Forecast (2 Months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["week2", "month1", "month2"].map((period) => (
                    <div key={period} className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {period === "week2"
                          ? "2 Weeks Ahead"
                          : period === "month1"
                            ? "1 Month Ahead"
                            : "2 Months Ahead"}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {droughtData.map((area) => {
                          const forecast = area.monthlyForecast[period as keyof typeof area.monthlyForecast]
                          return (
                            <div key={area.id} className="p-3 border border-border rounded">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{area.name}</span>
                                <Badge
                                  variant="outline"
                                  className={getPriorityColor(
                                    forecast.risk === "emergency"
                                      ? "high"
                                      : forecast.risk === "warning"
                                        ? "medium"
                                        : "low",
                                  )}
                                >
                                  {forecast.risk}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span>Soil Moisture</span>
                                  <span>{forecast.soilMoisture}%</span>
                                </div>
                                <Progress value={forecast.soilMoisture} className="h-1" />

                                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                  <div>Water: {forecast.waterReserves}%</div>
                                  <div>Impact: ${forecast.economicImpact}K</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forecast Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    Forecast Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    {/* Updated Metric Box 1: Emergency Areas with context */}
                                    <div className="text-center p-4 rounded-xl border border-red-500/50 bg-red-500/10 shadow-lg">
                                        <div className="text-3xl font-extrabold text-red-600 mb-1">3</div>
                                        <div className="text-sm font-semibold text-red-500">Areas at Emergency Risk</div>
                                        <div className="text-xs text-muted-foreground mt-1 font-medium">
                                            (Rizal, Laguna, and Metro Manila are projected to have water reserves below 50% by Month 2)
                                        </div>
                                    </div>

                                    {/* Updated Metric Box 2: Economic Impact with breakdown */}
                                    <div className="text-center p-4 rounded-xl border border-orange-500/50 bg-orange-500/10 shadow-lg">
                                        <div className="text-3xl font-extrabold text-orange-600 mb-1">$7K</div>
                                        <div className="text-sm font-semibold text-orange-500">Projected Economic Impact</div>
                                        <div className="text-xs text-muted-foreground mt-1 font-medium">
                                            (Worst case scenario: 55% Agriculture loss, 30% Industrial impact, 15% utilities)
                                        </div>
                                    </div>

                                    {/* Updated Metric Box 3: People at Risk with explanation */}
                                    <div className="text-center p-4 rounded-xl border border-blue-500/50 bg-blue-500/10 shadow-lg">
                                        <div className="text-3xl font-extrabold text-blue-600 mb-1">2.5K</div>
                                        <div className="text-sm font-semibold text-blue-500">People at Risk</div>
                                        <div className="text-xs text-muted-foreground mt-1 font-medium">
                                            (Vulnerable population residing in the 3 highest risk provinces, requiring aid mobilization)
                                        </div>
                                    </div>
                                </div>
                                
                                {/* NEW SECTION: Risk Distribution Breakdown */}
                                <div className="space-y-3">
                                    <h5 className="font-bold text-lg border-b pb-1">Current Risk Distribution (Week 2)</h5>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm items-center">
                                            <span className="flex items-center gap-2 font-medium text-red-700 dark:text-red-500">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Emergency (SM &lt; 30%)
                                            </span>
                                            <Badge className={getPriorityColor('high')}>{riskCounts.emergency || 0} Areas</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm items-center">
                                            <span className="flex items-center gap-2 font-medium text-orange-700 dark:text-orange-500">
                                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Warning (SM &lt; 50%)
                                            </span>
                                            <Badge className={getPriorityColor('medium')}>{riskCounts.warning || 0} Area</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm items-center">
                                            <span className="flex items-center gap-2 font-medium text-yellow-700 dark:text-yellow-500">
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div> Watch (SM &lt; 70%)
                                            </span>
                                            <Badge className={getPriorityColor('low')}>{riskCounts.watch || 0} Area</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm items-center text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Monitoring
                                            </span>
                                            <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">{riskCounts.monitoring || 0} Area</Badge>
                                        </div>
                                    </div>
                                </div>
                              
                                <div className="space-y-3">
                                    <h5 className="font-bold text-lg border-b pb-1">Critical Milestones</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0" />
                                            <span>**Day 3**: Rizal emergency threshold breach</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full flex-shrink-0" />
                                            <span>**Day 8**: Laguna moves to warning level</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full flex-shrink-0" />
                                            <span>**Day 15**: Metro Manila upgraded to watch</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0" />
                                            <span>**Day 30**: Cavite needs enhanced monitoring</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-bold text-lg border-b pb-1">Recommended Actions</h5>
                                    <div className="space-y-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="w-full justify-start bg-transparent border-red-400 text-red-600 hover:bg-red-50"
                                            onClick={() => handleActionClick('Emergency Protocols')}
                                        >
                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                            Activate Emergency Protocols
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="w-full justify-start bg-transparent border-orange-400 text-orange-600 hover:bg-orange-50"
                                            onClick={() => handleActionClick('Pre-position Resources')}
                                        >
                                            <Truck className="h-4 w-4 mr-2" />
                                            Pre-position Resources
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="w-full justify-start bg-transparent border-blue-400 text-blue-600 hover:bg-blue-50"
                                            onClick={() => handleActionClick('Public Awareness Campaign')}
                                        >
                                            <Users className="h-4 w-4 mr-2" />
                                            Public Awareness Campaign
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="w-full justify-start bg-transparent border-gray-400 text-gray-600 hover:bg-gray-50"
                                            onClick={() => handleActionClick('Detailed Report Generation')}
                                        >
                                            <FileText className="h-4 w-4 mr-2" />
                                            Generate Detailed Report
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
