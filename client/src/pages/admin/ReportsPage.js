import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Tooltip,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import AdminNavbar from '../../components/admin/AdminNavbar';

// Sample data - replace with actual data from your backend
const sampleData = {
  totalRevenue: 125000,
  totalProfit: 45000,
  totalInvestment: 80000,
  totalOrders: 450,
  averageOrderValue: 278,
  profitMargin: 36,

  categorySales: [
    { name: 'Milk', sales: 45000, profit: 15000, orders: 200 },
    { name: 'Curd', sales: 30000, profit: 12000, orders: 150 },
    { name: 'Butter', sales: 25000, profit: 10000, orders: 100 },
    { name: 'Cheese', sales: 15000, profit: 5000, orders: 50 },
    { name: 'Yogurt', sales: 10000, profit: 3000, orders: 40 },
  ],

  productPerformance: [
    { 
      name: 'Fresh Milk 500ml',
      category: 'Milk',
      sales: 25000,
      profit: 8000,
      orders: 120,
      stock: 50,
      trend: 'up',
    },
    { 
      name: 'Premium Curd 400g',
      category: 'Curd',
      sales: 20000,
      profit: 7000,
      orders: 90,
      stock: 30,
      trend: 'up',
    },
    { 
      name: 'Butter 100g',
      category: 'Butter',
      sales: 15000,
      profit: 5000,
      orders: 60,
      stock: 25,
      trend: 'down',
    },
    { 
      name: 'Cheese Block 200g',
      category: 'Cheese',
      sales: 12000,
      profit: 4000,
      orders: 40,
      stock: 20,
      trend: 'up',
    },
  ],

  monthlyRevenue: [
    { month: 'Jan', revenue: 15000, profit: 5000 },
    { month: 'Feb', revenue: 18000, profit: 6000 },
    { month: 'Mar', revenue: 22000, profit: 7500 },
    { month: 'Apr', revenue: 20000, profit: 7000 },
    { month: 'May', revenue: 25000, profit: 9000 },
    { month: 'Jun', revenue: 25000, profit: 10500 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ReportsPage = () => {
  const [timeFilter, setTimeFilter] = useState('6months');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('sales');

  const handleExportData = () => {
    // Implementation for exporting data
    console.log('Exporting data...');
  };

  const getPerformanceColor = (trend) => {
    return trend === 'up' ? '#4CAF50' : '#f44336';
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const sortedProducts = [...sampleData.productPerformance].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <AdminNavbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Reports & Analytics
          </Typography>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportData}
            sx={{
              fontFamily: 'cursive',
              borderColor: '#90EE90',
              color: 'black',
              '&:hover': {
                borderColor: '#7BC47F',
                bgcolor: 'rgba(144, 238, 144, 0.1)',
              }
            }}
          >
            Export Data
          </Button>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary', mb: 1 }}>
                  Total Revenue
                </Typography>
                <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold', mb: 1 }}>
                  {formatCurrency(sampleData.totalRevenue)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ color: '#4CAF50' }} />
                  <Typography sx={{ fontFamily: 'cursive', color: '#4CAF50' }}>
                    +12% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary', mb: 1 }}>
                  Total Profit
                </Typography>
                <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold', mb: 1 }}>
                  {formatCurrency(sampleData.totalProfit)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ color: '#4CAF50' }} />
                  <Typography sx={{ fontFamily: 'cursive', color: '#4CAF50' }}>
                    Margin: {sampleData.profitMargin}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary', mb: 1 }}>
                  Total Orders
                </Typography>
                <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold', mb: 1 }}>
                  {sampleData.totalOrders}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                    Avg. Order Value: {formatCurrency(sampleData.averageOrderValue)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Revenue Chart */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'cursive' }}>
              Revenue & Profit Trends
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                sx={{ fontFamily: 'cursive' }}
              >
                <MenuItem value="7days" sx={{ fontFamily: 'cursive' }}>Last 7 Days</MenuItem>
                <MenuItem value="1month" sx={{ fontFamily: 'cursive' }}>Last Month</MenuItem>
                <MenuItem value="6months" sx={{ fontFamily: 'cursive' }}>Last 6 Months</MenuItem>
                <MenuItem value="1year" sx={{ fontFamily: 'cursive' }}>Last Year</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
              <Bar dataKey="profit" name="Profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Category Performance */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
          <Typography variant="h5" sx={{ fontFamily: 'cursive', mb: 3 }}>
            Category Performance
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                      <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Sales</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Profit</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Orders</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sampleData.categorySales.map((category, index) => (
                      <TableRow key={category.name} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                        <TableCell sx={{ fontFamily: 'cursive' }}>{category.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'cursive' }}>{formatCurrency(category.sales)}</TableCell>
                        <TableCell sx={{ fontFamily: 'cursive' }}>{formatCurrency(category.profit)}</TableCell>
                        <TableCell sx={{ fontFamily: 'cursive' }}>{category.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sampleData.categorySales}
                    dataKey="sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {sampleData.categorySales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Paper>

        {/* Product Performance */}
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'cursive' }}>
              Product Performance
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ fontFamily: 'cursive' }}>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                  sx={{ fontFamily: 'cursive' }}
                >
                  <MenuItem value="all" sx={{ fontFamily: 'cursive' }}>All Categories</MenuItem>
                  <MenuItem value="milk" sx={{ fontFamily: 'cursive' }}>Milk</MenuItem>
                  <MenuItem value="curd" sx={{ fontFamily: 'cursive' }}>Curd</MenuItem>
                  <MenuItem value="butter" sx={{ fontFamily: 'cursive' }}>Butter</MenuItem>
                  <MenuItem value="cheese" sx={{ fontFamily: 'cursive' }}>Cheese</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ fontFamily: 'cursive' }}>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                  sx={{ fontFamily: 'cursive' }}
                >
                  <MenuItem value="sales" sx={{ fontFamily: 'cursive' }}>Sales</MenuItem>
                  <MenuItem value="profit" sx={{ fontFamily: 'cursive' }}>Profit</MenuItem>
                  <MenuItem value="orders" sx={{ fontFamily: 'cursive' }}>Orders</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Sales</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Profit</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Orders</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Stock</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow key={product.name} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{product.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{product.category}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{formatCurrency(product.sales)}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{formatCurrency(product.profit)}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{product.orders}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(product.stock / 100) * 100}
                          sx={{
                            width: 100,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: product.stock < 20 ? '#f44336' : '#4CAF50',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography sx={{ fontFamily: 'cursive' }}>{product.stock}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {product.trend === 'up' ? (
                        <TrendingUpIcon sx={{ color: '#4CAF50' }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: '#f44336' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReportsPage; 