import { useState } from 'react';
import { useNavigate } from 'react-router';

import numeral from 'numeral';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
} from '@mui/material';

import Label from '~/pages/TeamPages/components/Label';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders?.filter((cryptoOrder) => {
    let matches = true;

    if (filters?.status && cryptoOrder?.status !== filters?.status) {
      matches = false;
    }

    return matches;
  });
};

const RecentOrdersTable = ({ cryptoOrders, handleMakeEligible }) => {
  const navigate = useNavigate();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [filters, setFilters] = useState({
    status: null,
  });
  const statusOptions = [
    {
      id: 'all',
      name: 'All',
    },
    {
      id: 'Make Eligible',
      name: 'Make Eligible',
    },
    {
      id: 'Eligible',
      name: 'Eligible',
    },
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    if (e.target.value === 'all') {
      value = null;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);

  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  const selectedSomeCryptoOrders =
    selectedCryptoOrders?.length > 0 &&
    selectedCryptoOrders?.length < cryptoOrders?.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders?.length === cryptoOrders?.length;
  const theme = useTheme();

  return (
    <>
      {cryptoOrders?.length > 0 ? (
        <Card>
          {!selectedBulkActions && (
            <CardHeader
              action={
                <Box
                  width={200}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* TODO: Status filter */}
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters?.status || 'all'}
                      onChange={handleStatusChange}
                      label="Status"
                      autoWidth
                    >
                      {statusOptions.map((statusOption) => (
                        <MenuItem
                          key={statusOption?.id}
                          value={statusOption?.id}
                        >
                          {statusOption?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              }
              title="Rewards Eligibility"
            />
          )}
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Eligibility ID</TableCell>
                  <TableCell>Freelancer Name</TableCell>
                  <TableCell>No. of Assignments</TableCell>
                  <TableCell>Claim Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCryptoOrders?.map((cryptoOrder) => {
                  const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                    cryptoOrder?.eligible_id
                  );
                  return (
                    <TableRow
                      hover
                      key={cryptoOrder?.eligible_id}
                      selected={isCryptoOrderSelected}
                    >
                      <TableCell>
                        <Typography
                          component="a"
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          noWrap
                          onClick={() => {
                            navigate(
                              `/team/management/profile/details/${cryptoOrder?.eligible_id}`
                            );
                          }}
                          sx={{
                            cursor: 'pointer',
                          }}
                          color="#3f51b5"
                        >
                          {cryptoOrder?.eligible_id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder?.freelancer_name}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            cursor: 'pointer',
                          }}
                          color="#3f51b5"
                          noWrap
                          onClick={() => {
                            navigate(
                              `/team/management/profile/details/${cryptoOrder?.freelancer_id}`
                            );
                          }}
                        >
                          ID: {cryptoOrder?.freelancer_id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder?.number_of_assignments}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          {cryptoOrder?.status === 'Eligible' ? (
                            <Label color="success">Eligible</Label>
                          ) : null}
                          {cryptoOrder?.status === 'Make Eligible' ? (
                            <Label
                              // onClick={() => {
                              //   handleMakeEligible(
                              //     cryptoOrder?.eligible_id,
                              //     cryptoOrder?.number_of_assignments
                              //   );
                              // }}
                              color="warning"
                            >
                              Make Eligible
                            </Label>
                          ) : null}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={cryptoOrders?.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30, 50, 75, 100, 200]}
            />
          </Box>
        </Card>
      ) : (
        <Typography variant="h3" component="h3" gutterBottom>
          No PM Found
        </Typography>
      )}
    </>
  );
};

export default RecentOrdersTable;
