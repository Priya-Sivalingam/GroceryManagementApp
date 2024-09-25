import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <Typography variant="h4" gutterBottom className="text-center mb-6 font-bold text-gray-800">
          Grocery Store Management Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Sales Overview Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" component="div" className="mb-4 font-semibold">
                  Total Sales
                </Typography>
                <Typography variant="h4" className="text-green-600">
                  $12,345
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Inventory Overview Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" component="div" className="mb-4 font-semibold">
                  Items in Stock
                </Typography>
                <Typography variant="h4" className="text-blue-600">
                  450
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Overview Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" component="div" className="mb-4 font-semibold">
                  Orders Today
                </Typography>
                <Typography variant="h4" className="text-red-600">
                  35
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Button Section */}
          <Grid item xs={12}>
            <div className="flex justify-center space-x-4">
              <Button variant="contained" color="primary">
                Manage Inventory
              </Button>
              <Button variant="contained" color="secondary">
                View Sales Reports
              </Button>
              <Button variant="contained" color="success">
                Add New Product
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
