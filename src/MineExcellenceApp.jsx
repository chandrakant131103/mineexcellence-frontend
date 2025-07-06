import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, AlertTriangle, DollarSign, Settings, Home, BarChart3, FileText, Menu, X, Shield, Target, Zap, Phone, Mail, Moon, Sun } from 'lucide-react';
import { jsPDF } from 'jspdf';

// Replace with your actual logo URL (e.g., hosted on AWS S3, Cloudinary, etc.)
const logo = 'https://res.cloudinary.com/dmrd3bjiw/image/upload/v1751824182/27104_27104_mineexcellencelogo_incfkc.webp' // Placeholder; update with public URL

// Header Component
const Header = ({ sidebarOpen, setSidebarOpen, theme, toggleTheme }) => (
  <header className={`border-b ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700' : 'bg-gradient-to-r from-blue-900 to-indigo-800 border-indigo-500'}`}>
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-md ${theme === 'dark' ? 'text-gray-300 hover:text-gray-200 hover:bg-gray-700' : 'text-indigo-300 hover:text-indigo-200 hover:bg-indigo-700'} lg:hidden`}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="flex items-center ml-4 lg:ml-0">
            <img src={logo} alt="Mine Excellence Logo" className="h-8 w-8" />
            <div className="ml-3">
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-indigo-400'}`}>Mine Excellence</h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>Drilling & Blast Optimization</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Safety First</span>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
            <Target className="h-4 w-4" />
            <span>Precision Mining</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md ${theme === 'dark' ? 'text-gray-300 hover:text-gray-200 hover:bg-gray-700' : 'text-indigo-300 hover:text-indigo-200 hover:bg-indigo-700'}`}
          >
            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  </header>
);

// Sidebar Component (App Navigation)
const AppSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, theme }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Analytics' },
    { id: 'blast-design', label: 'Blast Design', icon: Settings, description: 'Pattern & Parameters' },
    { id: 'optimization', label: 'Optimization', icon: Zap, description: 'AI-Powered Results' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Performance Charts' },
    { id: 'reports', label: 'Reports', icon: FileText, description: 'Detailed Analysis' },
    { id: 'contact', label: 'Contact Us', icon: Phone, description: 'Get in Touch' },
    { id: 'about', label: 'About Us', icon: Mail, description: 'Learn More About Us' },
    {
      id: 'more-info',
      label: 'More Info',
      icon: Mail,
      description: 'Additional Resources',
      subTabs: [
        { id: 'home', label: 'Home', url: 'https://www.mineexcellence.com/', description: 'Visit Homepage' },
        { id: 'products', label: 'Our Products', url: 'https://www.mineexcellence.com/products', description: 'Explore Products' },
        { id: 'news', label: 'News', url: 'https://www.mineexcellence.com/mining-blasting-software-news/', description: 'Latest News' },
        { id: 'blog', label: 'Blog', url: 'https://www.mineexcellence.com/blog', description: 'Read Blog' },
        { id: 'case-study', label: 'Case Study', url: 'https://www.mineexcellence.com/blasting-software-case-study/', description: 'View Case Studies' },
        { id: 'partners', label: 'Our Partners', url: 'https://www.mineexcellence.com/partners', description: 'Meet Partners' },
        { id: 'about-us', label: 'About Us', url: 'https://www.mineexcellence.com/about', description: 'Company Info' },
        { id: 'contact-us', label: 'Contact Us', url: 'https://www.mineexcellence.com/contact', description: 'Get in Touch' },
        { id: 'demo', label: 'Schedule a Demo', url: 'https://www.mineexcellence.com/demo', description: 'Book a Demo' }
      ]
    }
  ];

  return (
    <>
      {sidebarOpen && (
        <div 
          className={`fixed inset-0 bg-opacity-50 z-20 lg:hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 px-2 space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <div key={tab.id}>
                    {tab.id !== 'more-info' ? (
                      <button
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSidebarOpen(false);
                        }}
                        className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full text-left transition-colors ${
                          activeTab === tab.id
                            ? `${theme === 'dark' ? 'bg-blue-600 text-white border-r-2 border-blue-400' : 'bg-blue-500 text-white border-r-2 border-blue-700'}`
                            : `${theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-300'}`
                        }`}
                      >
                        <Icon className={`mr-3 h-5 w-5 ${
                          activeTab === tab.id ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600')
                        }`} />
                        <div>
                          <div className="font-medium">{tab.label}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{tab.description}</div>
                        </div>
                      </button>
                    ) : (
                      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-md p-2 mb-2`}>
                        <div className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} px-2 py-1`}>More Info</div>
                        {tab.subTabs.map(subTab => (
                          <a
                            key={subTab.id}
                            href={subTab.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'} rounded-md transition-colors`}
                          >
                            <span className="ml-3">{subTab.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className={`flex-shrink-0 p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center`}>
              <div>Mine Excellence v2.0</div>
              <div>Professional Mining Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



// Dashboard Component
const Dashboard = ({ results, theme }) => {
  const metrics = [
    {
      title: 'Total Blast Cost',
      value: results?.current?.engineered?.total_blast_cost
        ? `₹${Math.round(results.current.engineered.total_blast_cost).toLocaleString()}`
        : '₹0',
      icon: DollarSign,
      color: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      title: 'Fragmentation Quality',
      value: results?.current?.predictions?.frag_in_range
        ? `${results.current.predictions.frag_in_range.toFixed(1)}%`
        : '0%',
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-white'
    },
    {
      title: 'Peak Particle Velocity',
      value: results?.current?.predictions?.ppv
        ? `${results.current.predictions.ppv.toFixed(1)} mm/s`
        : '0 mm/s',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-white'
    },
    {
      title: 'Safety Rating',
      value: results?.current?.safety_rating || 'Unknown',
      icon: Shield,
      color: 'bg-purple-500',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-6">
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-blue-500 text-white'} rounded-lg p-6`}>
        <h2 className="text-2xl font-bold mb-2">Welcome to Mine Excellence</h2>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-200'}`}>Advanced drilling and blast pattern optimization for maximum efficiency and safety</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`${metric.color} rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={metric.textColor}>{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Icon className="h-8 w-8 opacity-80" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={`p-4 border-2 border-dashed rounded-lg transition-colors ${theme === 'dark' ? 'border-blue-400 hover:border-blue-300 hover:bg-gray-700' : 'border-blue-500 hover:border-blue-600 hover:bg-gray-100'}`}>
            <Settings className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>New Blast Design</p>
          </button>
          <button className={`p-4 border-2 border-dashed rounded-lg transition-colors ${theme === 'dark' ? 'border-green-400 hover:border-green-300 hover:bg-gray-700' : 'border-green-500 hover:border-green-600 hover:bg-gray-100'}`}>
            <Zap className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Run Optimization</p>
          </button>
          <button className={`p-4 border-2 border-dashed rounded-lg transition-colors ${theme === 'dark' ? 'border-purple-400 hover:border-purple-300 hover:bg-gray-700' : 'border-purple-500 hover:border-purple-600 hover:bg-gray-100'}`}>
            <FileText className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Generate Report</p>
          </button>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Recent Activity</h3>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Blast pattern optimized for Sector A</span>
            </div>
            <span className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>2 hours ago</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Safety analysis completed</span>
            </div>
            <span className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>4 hours ago</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Cost optimization report generated</span>
            </div>
            <span className={`text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>6 hours ago</span>
          </div>
        </div>
      </div>
      <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        All Rights Reserved By MineExcellence 2018 - 2025
      </footer>
    </div>
  );
};

// Blast Design Component
const BlastDesign = ({ inputData, setInputData, optimizationMode, setOptimizationMode, loading, onCalculate, theme }) => {
  const handleInputChange = (field, value) => {
    setInputData(prev => ({
      ...prev,
      [field]: value === '' ? '' : parseFloat(value) || 0
    }));
  };

  const inputFields = [
    { key: 'burden', label: 'Burden (m)', step: 0.1, category: 'geometry', min: 0.1 },
    { key: 'spacing', label: 'Spacing (m)', step: 0.1, category: 'geometry', min: 0.1 },
    { key: 'hole_depth', label: 'Hole Depth (m)', step: 0.1, category: 'geometry', min: 0.1 },
    { key: 'bench_height', label: 'Bench Height (m)', step: 0.1, category: 'geometry', min: 0.1 },
    { key: 'hole_diameter', label: 'Hole Diameter (mm)', step: 1, category: 'drilling', min: 1 },
    { key: 'stemming_length', label: 'Stemming Length (m)', step: 0.1, category: 'drilling', min: 0 },
    { key: 'hole_angle', label: 'Hole Angle (°)', step: 1, category: 'drilling', min: 0 },
    { key: 'total_rows', label: 'Total Rows', step: 1, category: 'pattern', min: 1 },
    { key: 'holes_blasted', label: 'Holes Blasted', step: 1, category: 'pattern', min: 1 },
    { key: 'column_charge_density', label: 'Column Charge Density (kg/m)', step: 0.01, category: 'explosive', min: 0 },
    { key: 'avg_column_charge_length', label: 'Avg Column Charge Length (m)', step: 0.1, category: 'explosive', min: 0 },
    { key: 'avg_column_weight', label: 'Avg Column Weight (kg)', step: 1, category: 'explosive', min: 0 },
    { key: 'total_explosive_kg', label: 'Total Explosive (kg)', step: 1, category: 'explosive', min: 0 },
    { key: 'rock_density', label: 'Rock Density (t/m³)', step: 0.01, category: 'material', min: 0.1 }
  ];

  const categories = {
    geometry: { title: 'Blast Geometry', color: 'blue' },
    drilling: { title: 'Drilling Parameters', color: 'green' },
    pattern: { title: 'Pattern Design', color: 'orange' },
    explosive: { title: 'Explosive Configuration', color: 'purple' },
    material: { title: 'Material Properties', color: 'blue' }
  };

  const groupedFields = Object.entries(categories).map(([key, config]) => ({
    ...config,
    key,
    fields: inputFields.filter(field => field.category === key)
  }));

  return (
    <div className="space-y-6">
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Blast Design Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h4 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Pattern Area</h4>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {(inputData.burden * inputData.spacing * inputData.holes_blasted).toFixed(0)} m²
            </p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h4 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Powder Factor</h4>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              {(inputData.total_explosive_kg / (inputData.burden * inputData.spacing * inputData.bench_height * inputData.rock_density)).toFixed(2)} kg/m³
            </p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h4 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Explosive per Hole</h4>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
              {(inputData.total_explosive_kg / (inputData.holes_blasted || 1)).toFixed(1)} kg
            </p>
          </div>
        </div>
      </div>
      {groupedFields.map(category => (
        <div key={category.key} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            <div className={`w-3 h-3 bg-${category.color}-500 rounded-full mr-3`}></div>
            {category.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.fields.map(field => (
              <div key={field.key}>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {field.label}
                </label>
                <input
                  type="number"
                  step={field.step}
                  min={field.min}
                  value={inputData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-800'}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Optimization Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'cost', label: 'Cost Optimization', description: 'Minimize total blast cost', icon: DollarSign },
            { value: 'fragmentation', label: 'Fragmentation Optimization', description: 'Maximize fragmentation quality', icon: TrendingUp },
            { value: 'safety', label: 'Safety Optimization', description: 'Minimize vibration and safety risks', icon: Shield }
          ].map(option => {
            const Icon = option.icon;
            return (
              <label key={option.value} className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                optimizationMode === option.value 
                  ? (theme === 'dark' ? 'border-blue-400 bg-gray-700' : 'border-blue-500 bg-blue-100') 
                  : (theme === 'dark' ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-700' : 'border-gray-300 hover:border-blue-500 hover:bg-gray-100')
              }`}>
                <input
                  type="radio"
                  name="optimization"
                  value={option.value}
                  checked={optimizationMode === option.value}
                  onChange={(e) => setOptimizationMode(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center mb-2">
                  <Icon className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{option.label}</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{option.description}</p>
              </label>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onCalculate}
          disabled={loading}
          className={`px-12 py-4 rounded-lg font-semibold flex items-center gap-3 text-lg ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Calculating Optimization...
            </>
          ) : (
            <>
              <Calculator className="h-6 w-6" />
              Calculate Optimization
            </>
          )}
        </button>
      </div>
      <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        All Rights Reserved By MineExcellence 2018 - 2025
      </footer>
    </div>
  );
};

// Optimization Component
const Optimization = ({ results, theme }) => {
  if (!results) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>AI-Powered Optimization Results</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Run an optimization from the Blast Design tab to see results.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Optimization Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Current Parameters</h4>
            <div className="space-y-2">
              <p><strong>Fragmentation In Range:</strong> {results.current.predictions.frag_in_range.toFixed(1)}%</p>
              <p><strong>Fragmentation Over Size:</strong> {results.current.predictions.frag_over_size.toFixed(1)}%</p>
              <p><strong>PPV:</strong> {results.current.predictions.ppv.toFixed(1)} mm/s</p>
              <p><strong>Total Cost:</strong> ₹{Math.round(results.current.engineered.total_blast_cost).toLocaleString()}</p>
              <p><strong>Burden x Spacing:</strong> {results.current.engineered.burden_spacing.toFixed(2)} m²</p>
              <p><strong>Explosive per Hole:</strong> {results.current.engineered.explosive_per_hole.toFixed(1)} kg</p>
              <p><strong>Number of Holes:</strong> {results.current.engineered.holes_blasted.toFixed(0)}</p>
              <p><strong>Safety Rating:</strong> {results.current.safety_rating}</p>
              <p><strong>Unsafe Blasts:</strong> {results.current.unsafe_blasts}</p>
            </div>
          </div>
          <div>
            <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Optimized Parameters</h4>
            <div className="space-y-2">
              <p><strong>Fragmentation In Range:</strong> {results.optimized.predictions.frag_in_range.toFixed(1)}%</p>
              <p><strong>PPV:</strong> {results.optimized.predictions.ppv.toFixed(1)} mm/s</p>
              <p><strong>Total Cost:</strong> ₹{Math.round(results.optimized.engineered.total_blast_cost).toLocaleString()}</p>
              <p><strong>Burden:</strong> {results.optimized.engineered.burden.toFixed(2)} m</p>
              <p><strong>Spacing:</strong> {results.optimized.engineered.spacing.toFixed(2)} m</p>
              <p><strong>Hole Depth:</strong> {results.optimized.engineered.hole_depth.toFixed(2)} m</p>
              <p><strong>Total Explosive:</strong> {results.optimized.engineered.total_explosive_kg.toFixed(1)} kg</p>
              <p><strong>Number of Holes:</strong> {results.optimized.engineered.holes_blasted.toFixed(0)}</p>
              <p><strong>Safety Rating:</strong> {results.optimized.safety_rating}</p>
              <p><strong>Unsafe Blasts:</strong> {results.optimized.unsafe_blasts}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Improvements</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Cost Savings</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              ₹{Math.round(results.improvements.cost_savings).toLocaleString()}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {results.improvements.cost_savings_percentage.toFixed(1)}% reduction
            </p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Fragmentation</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              {results.improvements.fragmentation_improvement.toFixed(1)}%
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>Improvement</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Safety (PPV)</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
              {results.improvements.safety_improvement.toFixed(1)} mm/s
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>Reduction</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Holes Reduction</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              {results.improvements.holes_reduction.toFixed(0)}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>Reduction</p>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Recommendations</h4>
        <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {results.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        All Rights Reserved By MineExcellence 2018 - 2025
      </footer>
    </div>
  );
};

// Analytics Component
const Analytics = ({ results, theme }) => {
  const [plotTimestamps, setPlotTimestamps] = useState({});

  useEffect(() => {
    if (results?.plot_urls) {
      const newTimestamps = {};
      results.plot_urls.forEach(url => {
        newTimestamps[url] = Date.now();
      });
      setPlotTimestamps(newTimestamps);
    }
  }, [results]);

  const plotTitles = {
    'fragmentation_in_range.png': 'Fragmentation In Range: Actual vs Predicted',
    'fragmentation_over_size.png': 'Fragmentation Over Size: Actual vs Predicted',
    'ppv_plot.png': 'Peak Particle Velocity: Actual vs Predicted',
    'cost_plot.png': 'Actual vs Optimized Cost',
    'safety_plot.png': 'Safety: Actual vs Predicted PPV Alert',
    'correlation_heatmap.png': 'Correlation Heatmap',
    'optimization_results.png': 'Optimization Results',
    'holes_plot.png': 'Actual vs Optimized Number of Holes',
    'dynamic_prediction_plot': 'Current vs Optimized Results',
    'dynamic_holes_plot': 'Actual vs Optimized Number of Holes (Current Run)',
    'dynamic_impact_plot': 'Parameter Impact Analysis'
  };

  return (
    <div className="space-y-6">
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Performance Analytics</h3>
        {results?.plot_urls && results.plot_urls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.plot_urls.map((url, index) => {
              const filename = url.split('/').pop().split('_').slice(0, -1).join('_') + '.png';
              const title = plotTitles[filename] || filename.replace('.png', '').replace('_', ' ').replace('dynamic', 'Current').replace(/\b\w/g, c => c.toUpperCase());
              return (
                <div key={index} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} rounded-lg p-4 border`}>
                  <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{title}</h4>
                  <img
                    src={`https://blast-backend.onrender.com${url}?t=${plotTimestamps[url] || Date.now()}`}
                    alt={title}
                    className={`w-full rounded-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    style={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff' }}
                    onError={(e) => {
                      console.error(`Failed to load chart: ${url}`, e);
                      e.target.src = 'https://via.placeholder.com/300x200?text=Chart+Not+Found';
                    }}
                    onLoad={() => console.log(`Loaded chart: ${url}`)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Run an optimization from the Blast Design tab to see analytics.</p>
        )}
      </div>
      {results?.parameter_impact && (
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Parameter Impact Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.parameter_impact).map(([param, data]) => (
              <div key={param} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{param.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</h4>
                <div className="space-y-2">
                  <p><strong>Fragmentation Range:</strong> {Math.min(...data.fragmentation).toFixed(1)}% to {Math.max(...data.fragmentation).toFixed(1)}%</p>
                  <p><strong>PPV Range:</strong> {Math.min(...data.ppv).toFixed(1)} mm/s to {Math.max(...data.ppv).toFixed(1)} mm/s</p>
                  <p><strong>Cost Range:</strong> ₹{Math.round(Math.min(...data.cost)).toLocaleString()} to ₹{Math.round(Math.max(...data.cost)).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        All Rights Reserved By MineExcellence 2018 - 2025
      </footer>
    </div>
  );
};

// Reports Component
const Reports = ({ results, theme }) => {
  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Mine Excellence Blast Optimization Report', 20, 20);
    
    doc.setFontSize(14);
    doc.text('Current Parameters', 20, 40);
    doc.setFontSize(12);
    let y = 50;
    doc.text(`Fragmentation In Range: ${results.current.predictions.frag_in_range.toFixed(1)}%`, 20, y);
    y += 10;
    doc.text(`Fragmentation Over Size: ${results.current.predictions.frag_over_size.toFixed(1)}%`, 20, y);
    y += 10;
    doc.text(`PPV: ${results.current.predictions.ppv.toFixed(1)} mm/s`, 20, y);
    y += 10;
    doc.text(`Total Cost: ₹${Math.round(results.current.engineered.total_blast_cost).toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Burden x Spacing: ${results.current.engineered.burden_spacing.toFixed(2)} m²`, 20, y);
    y += 10;
    doc.text(`Explosive per Hole: ${results.current.engineered.explosive_per_hole.toFixed(1)} kg`, 20, y);
    y += 10;
    doc.text(`Number of Holes: ${results.current.engineered.holes_blasted.toFixed(0)}`, 20, y);
    y += 10;
    doc.text(`Safety Rating: ${results.current.safety_rating}`, 20, y);
    y += 10;
    doc.text(`Unsafe Blasts: ${results.current.unsafe_blasts}`, 20, y);

    y += 20;
    doc.setFontSize(14);
    doc.text('Optimized Parameters', 20, y);
    doc.setFontSize(12);
    y += 10;
    doc.text(`Fragmentation In Range: ${results.optimized.predictions.frag_in_range.toFixed(1)}%`, 20, y);
    y += 10;
    doc.text(`PPV: ${results.optimized.predictions.ppv.toFixed(1)} mm/s`, 20, y);
    y += 10;
    doc.text(`Total Cost: ₹${Math.round(results.optimized.engineered.total_blast_cost).toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Burden: ${results.optimized.engineered.burden.toFixed(2)} m`, 20, y);
    y += 10;
    doc.text(`Spacing: ${results.optimized.engineered.spacing.toFixed(2)} m`, 20, y);
    y += 10;
    doc.text(`Hole Depth: ${results.optimized.engineered.hole_depth.toFixed(2)} m`, 20, y);
    y += 10;
    doc.text(`Total Explosive: ${results.optimized.engineered.total_explosive_kg.toFixed(1)} kg`, 20, y);
    y += 10;
    doc.text(`Number of Holes: ${results.optimized.engineered.holes_blasted.toFixed(0)}`, 20, y);
    y += 10;
    doc.text(`Safety Rating: ${results.optimized.safety_rating}`, 20, y);
    y += 10;
    doc.text(`Unsafe Blasts: ${results.optimized.unsafe_blasts}`, 20, y);

    y += 20;
    doc.setFontSize(14);
    doc.text('Improvements', 20, y);
    doc.setFontSize(12);
    y += 10;
    doc.text(`Cost Savings: ₹${Math.round(results.improvements.cost_savings).toLocaleString()} (${results.improvements.cost_savings_percentage.toFixed(1)}% reduction)`, 20, y);
    y += 10;
    doc.text(`Fragmentation Improvement: ${results.improvements.fragmentation_improvement.toFixed(1)}%`, 20, y);
    y += 10;
    doc.text(`Safety (PPV) Reduction: ${results.improvements.safety_improvement.toFixed(1)} mm/s`, 20, y);
    y += 10;
    doc.text(`Holes Reduction: ${results.improvements.holes_reduction.toFixed(0)}`, 20, y);

    y += 20;
    doc.setFontSize(14);
    doc.text('Recommendations', 20, y);
    doc.setFontSize(12);
    y += 10;
    results.recommendations.forEach((rec, index) => {
      doc.text(`- ${rec}`, 20, y);
      y += 10;
    });

    doc.save('MineExcellence_Blast_Optimization_Report.pdf');
  };

  if (!results) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Detailed Reports</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Generate comprehensive reports for stakeholders, regulatory compliance, and performance tracking.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Detailed Reports</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Generate comprehensive reports for stakeholders, regulatory compliance, and performance tracking.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Current Parameters</h4>
            <div className="space-y-2">
              <p><strong>Fragmentation In Range:</strong> {results.current.predictions.frag_in_range.toFixed(1)}%</p>
              <p><strong>Fragmentation Over Size:</strong> {results.current.predictions.frag_over_size.toFixed(1)}%</p>
              <p><strong>PPV:</strong> {results.current.predictions.ppv.toFixed(1)} mm/s</p>
              <p><strong>Total Cost:</strong> ₹{Math.round(results.current.engineered.total_blast_cost).toLocaleString()}</p>
              <p><strong>Burden x Spacing:</strong> {results.current.engineered.burden_spacing.toFixed(2)} m²</p>
              <p><strong>Explosive per Hole:</strong> {results.current.engineered.explosive_per_hole.toFixed(1)} kg</p>
              <p><strong>Number of Holes:</strong> {results.current.engineered.holes_blasted.toFixed(0)}</p>
              <p><strong>Safety Rating:</strong> {results.current.safety_rating}</p>
              <p><strong>Unsafe Blasts:</strong> {results.current.unsafe_blasts}</p>
            </div>
          </div>
          <div>
            <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Optimized Parameters</h4>
            <div className="space-y-2">
              <p><strong>Fragmentation In Range:</strong> {results.optimized.predictions.frag_in_range.toFixed(1)}%</p>
              <p><strong>PPV:</strong> {results.optimized.predictions.ppv.toFixed(1)} mm/s</p>
              <p><strong>Total Cost:</strong> ₹{Math.round(results.optimized.engineered.total_blast_cost).toLocaleString()}</p>
              <p><strong>Burden:</strong> {results.optimized.engineered.burden.toFixed(2)} m</p>
              <p><strong>Spacing:</strong> {results.optimized.engineered.spacing.toFixed(2)} m</p>
              <p><strong>Hole Depth:</strong> {results.optimized.engineered.hole_depth.toFixed(2)} m</p>
              <p><strong>Total Explosive:</strong> {results.optimized.engineered.total_explosive_kg.toFixed(1)} kg</p>
              <p><strong>Number of Holes:</strong> {results.optimized.engineered.holes_blasted.toFixed(0)}</p>
              <p><strong>Safety Rating:</strong> {results.optimized.safety_rating}</p>
              <p><strong>Unsafe Blasts:</strong> {results.optimized.unsafe_blasts}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Improvements</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Cost Savings</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              ₹{Math.round(results.improvements.cost_savings).toLocaleString()}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {results.improvements.cost_savings_percentage.toFixed(1)}% reduction
            </p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Fragmentation</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              {results.improvements.fragmentation_improvement.toFixed(1)}%
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>Improvement</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Safety (PPV)</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
              {results.improvements.safety_improvement.toFixed(1)} mm/s
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>Reduction</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h5 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Holes Reduction</h5>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              {results.improvements.holes_reduction.toFixed(0)}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>Reduction</p>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Recommendations</h4>
        <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {results.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
        <h4 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Download Report</h4>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Export the optimization results as a PDF for reporting.</p>
        <button
          onClick={generatePDF}
          disabled={!results}
          className={`px-6 py-2 rounded-lg font-semibold ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Generate PDF Report
        </button>
      </div>
      <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        All Rights Reserved By MineExcellence 2018 - 2025
      </footer>
    </div>
  );
};

// Contact Component
const Contact = ({ theme }) => (
  <div className="space-y-6">
    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Contact Us</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        <strong>ACN:</strong> 616 105 330<br />
        <strong>Australia Head Office - Melbourne</strong><br />
        34 Gleeson Drive, Bundoora, Victoria 3083, +61 39444 7454<br />
        <strong>India Office</strong><br />
        Sukiran, New Pali Road, Jodhpur, Rajasthan - 342001, 0291 3591883
      </p>
    </div>
    <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
      All Rights Reserved By MineExcellence 2018 - 2025
    </footer>
  </div>
);

// About Us Component
const AboutUs = ({ theme }) => (
  <div className="space-y-6">
    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>About Our Company</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Making high-quality blasting intelligence and optimization available to anyone, anywhere, anytime. MineExcellence is a leading technology provider in the end-to-end blasting technology space globally. Our solution helps in designing, optimizing, and analyzing how blasts are performing. Our SaaS and mobile-based platforms are designed specifically to benefit the mining industry so that business intelligence is provided in the hands of the average blaster, blast supervisor, and even senior mine management. Our solutions are capable of estimating blast parameters and predicting harmful impacts like fly-rocks and air/ground vibrations. It helps designers improve and optimize blasting, which can result in significant operational benefits and eliminate potential risks during blasting. Our software is being used by small mines, large tier-1 mining companies, and mining service providers across countries and mines.
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4`}>
        We at MineExcellence believe that mining and blasting processes can be met with sophisticated optimization techniques combined with better training. And so, we also provide a Blasters Management Portal (suitable for use across mines by senior mine management) and online learning and training for blasters.
      </p>
    </div>
    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Our Management</h3>
      <div className="space-y-4">
        <div>
          <h4 className={`text-md font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Dr. Sushil Bhandari</h4>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Co-Founder, MineExcellence</p>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Dr. Sushil Bhandari is the subject matter expert and co-founder of MineExcellence. He is globally recognized for his research in blasting. Dr. Bhandari has published over 100 papers in international journals and is the author of many books in blasting technology. Dr. Bhandari brings extensive experience from both industry and academia. He holds a Ph.D. from the University of New South Wales. He was also a member of the Advisory Board of the Indian Bureau of Mines and the Standing Committee of Science and Research, Ministry of Coal, Government of India. He has received the National Mineral Award 2001 from the Government of India for his contribution to Mining Technology.
          </p>
        </div>
        <div>
          <h4 className={`text-md font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Amit Bhandari</h4>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Managing Director, MineExcellence</p>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Amit Bhandari is a co-founder in MineExcellence. He has been instrumental in product technology upgrades for MineExcellence and ensuring it is built on the latest and greatest digital platform. He has extensive experience in technology entrepreneurship and has built successful technology services and product firms. Prior to his entrepreneurial career, Mr. Bhandari has previously worked in executive positions in leading IT consulting companies such as Accenture, PwC Consulting, and IBM in Melbourne. He did his master's from Melbourne University with first-class honors and was awarded an APA scholarship.
          </p>
        </div>
      </div>
    </div>
    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Our Advisory Board</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Our Advisory Board has senior industry practitioners (Former CEOs, etc.). They are mentors, advisers, and well-wishers to MineExcellence.
      </p>
      <div className="space-y-4 mt-4">
        <div>
          <h4 className={`text-md font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Peter McCarthy</h4>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Chairman Emeritus / Principal Mining Consultant</p>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Peter McCarthy is the Chairman Emeritus of AMC Consultants, a prominent mining consultancy group employing 150 staff and providing services exclusively to the minerals industry. Previously, he served as Managing Director for AMC Consultants. He has also served as a Director of the Victorian Chamber of Mines and the Australian Gold Council. Peter was the president of the Australasian Institute of Mining and Metallurgy for 2007 and 2008 and is also a Director of Castlemaine Gold Fields Limited. He is Chairman of the Heritage Committee of the AusIMM and a Life Member of the Sovereign Hill Museums Association. Peter McCarthy did his Bachelor of Science (Mining Engineering) from the University of NSW. He also did a Master of Geoscience (Mineral Economics) at Macquarie University.
          </p>
        </div>
        <div>
          <h4 className={`text-md font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Josephine Too</h4>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Chief Growth Catalyst, Sofos Advisory</p>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Josephine Too is the Chief Growth Catalyst of Sofos Advisory, which helps growth-stage companies scale sustainably. She is passionate about business growth and scaling companies through a systematic approach or by creating new markets through category design. Her growth experiences include building a Fortune 50 account from 0 to 32 Mn in 2 years with Infosys (NASDAQ:INFY) while it scaled from 100 Million to 1 Bn within 5 years. She started Infosys Singapore and Germany offices, headed up Sales & Marketing for China, and drove complex 100 Million deals in Australia. In her last role as Executive Vice President, Head of Asia Pacific for Aurionpro (NSE: AURIONPRO), she doubled the ANZ business for consecutive 2 years. With more than 20 years of experience in strategy consulting, general management, and growing technology businesses across APAC and Europe, she brings clarity in strategy and focus in execution to all her ventures. Currently, she serves as Executive Advisor, Non-Executive Director, and Advisory Board member to several SMEs. She holds a Bachelor in Civil & Structural Engineering from Nanyang Technological University in Singapore, sat on the State Board of the Australia Computer Society (2013-2015), created the Entrepreneurship & Innovation Special Interest Group for Victoria, and was a frequent Judge of the Premier iAwards for ICT innovations (2012-2015).
          </p>
        </div>
      </div>
    </div>
    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Our Technology and Mining Team</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        We have a large technology development team of 40+ people. This includes mining engineers, software developers, testers, business analysts, etc. We also have people who specialize in UI/UX and mobile application development. We have created a high-quality technology team with deep domain expertise and the ability to create technology innovation. We aim to be the leading technology provider to the mining industry in the next 2 years.
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4`}>MineExcellence Development Team</p>
    </div>
    <footer className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
      All Rights Reserved By MineExcellence 2018 - 2025
    </footer>
  </div>
);

// Main App Component
const MineExcellenceApp = () => {
  const [activeTab, setActiveTab] = useState('blast-design');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [inputData, setInputData] = useState({
    burden: 8.0,
    spacing: 9.0,
    hole_depth: 17.0,
    bench_height: 15.0,
    hole_diameter: 270,
    stemming_length: 4.0,
    hole_angle: 15,
    total_rows: 5,
    holes_blasted: 18,
    column_charge_density: 1.2,
    avg_column_charge_length: 10.0,
    avg_column_weight: 100,
    total_explosive_kg: 900.0,
    rock_density: 2.35
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [optimizationMode, setOptimizationMode] = useState('cost');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const calculateOptimization = async () => {
    setLoading(true);
    setError(null);
    try {
      const requiredFields = [
        'burden', 'spacing', 'hole_depth', 'bench_height', 'hole_diameter',
        'stememing_length', 'hole_angle', 'total_rows', 'holes_blasted',
        'column_charge_density', 'avg_column_charge_length', 'avg_column_weight',
        'total_explosive_kg', 'rock_density'
      ];
      const invalidFields = requiredFields.filter(
        field => !inputData[field] || isNaN(inputData[field]) || (field !== 'hole_angle' && inputData[field] <= 0)
      );
      if (invalidFields.length > 0) {
        throw new Error(`Invalid or missing values for: ${invalidFields.join(', ')}`);
      }

      const response = await fetch('https://blast-backend.onrender.com/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optimization_type: optimizationMode,
          parameters: inputData,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Optimization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard results={results} theme={theme} />;
      case 'blast-design':
        return (
          <BlastDesign
            inputData={inputData}
            setInputData={setInputData}
            optimizationMode={optimizationMode}
            setOptimizationMode={setOptimizationMode}
            loading={loading}
            onCalculate={calculateOptimization}
            theme={theme}
          />
        );
      case 'optimization':
        return <Optimization results={results} theme={theme} />;
      case 'analytics':
        return <Analytics results={results} theme={theme} />;
      case 'reports':
        return <Reports results={results} theme={theme} />;
      case 'contact':
        return <Contact theme={theme} />;
      case 'about':
        return <AboutUs theme={theme} />;
      default:
        return <Dashboard results={results} theme={theme} />;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-blue-50 to-gray-100'}`}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} theme={theme} toggleTheme={toggleTheme} />
      <div className="flex">
        <AppSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64">
          {error && (
            <div className={`mb-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
              Error: {error}
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};


// src/api.js or similar
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Fallback for local dev
export const fetchData = async () => {
  const response = await fetch(`${apiUrl}/api/endpoint`);
  return response.json();
};



import axios from 'axios';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});


export default MineExcellenceApp;
