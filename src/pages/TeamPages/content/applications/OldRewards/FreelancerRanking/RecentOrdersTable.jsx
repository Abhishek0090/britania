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

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BulkActions from './BulkActions';
const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

const RecentOrdersTable = ({ cryptoOrders }) => {
  const navigate = useNavigate();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

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
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Freelancer Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Assignment Completed</TableCell>
                  <TableCell>Assignment Ongoing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCryptoOrders?.map((cryptoOrder) => {
                  const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                    cryptoOrder?.id
                  );
                  return (
                    <TableRow
                      hover
                      key={cryptoOrder?.id}
                      selected={isCryptoOrderSelected}
                    >
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder?.firstname} {cryptoOrder?.lastname}
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
                              `/team/management/profile/details/${cryptoOrder?.id}`
                            );
                          }}
                        >
                          ID: {cryptoOrder?.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          component="a"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          href={`tel: ${cryptoOrder?.number}`}
                        >
                          <LocalPhoneIcon sx={{ mr: 1 }} />
                          {cryptoOrder?.number}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          noWrap
                          color="success.main"
                        >
                          {cryptoOrder?.complete}
                        </Typography>
                      </TableCell>{' '}
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          noWrap
                          color="warning.main"
                        >
                          {cryptoOrder?.ongoing}
                        </Typography>
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
