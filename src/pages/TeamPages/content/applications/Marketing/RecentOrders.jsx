import { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders({ allAssignmentsData }) {
  return (
    <Card>
      {allAssignmentsData?.length > 0 && (
        <RecentOrdersTable cryptoOrders={allAssignmentsData} />
      )}
    </Card>
  );
}

export default RecentOrders;
