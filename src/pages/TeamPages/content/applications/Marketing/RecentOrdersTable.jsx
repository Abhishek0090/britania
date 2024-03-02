import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';
import {
  Divider,
  Box,
  FormControl,
  Card,
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
  InputAdornment,
  OutlinedInput,
  styled,
} from '@mui/material';

import Label from '~/pages/TeamPages/components/Label';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import StarsIcon from '@mui/icons-material/Stars';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

export default function RecentOrdersTable({ cryptoOrders }) {
  const navigate = useNavigate();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState('name');
  const [selectedFilterOption, setSelectedFilterOption] = useState('source');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [marketingSource, setMarketingSource] = useState([]);
  const [marketingMedium, setMarketingMedium] = useState([]);
  const [marketingCampaign, setMarketingCampaign] = useState([]);
  const [searchParam, setSearchParam] = useState({
    search: null,
  });

  const [filters, setFilters] = useState({
    status: null,
  });
  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      if (selectedSearchOption === 'name') {
        if (
          filters?.search &&
          !cryptoOrder?.name
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === 'message') {
        if (
          filters?.search &&
          !cryptoOrder?.message
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === 'email') {
        if (
          filters?.search &&
          !cryptoOrder?.email
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      }
      return matches;
    });
  };

  const handleSearch = (event) => {
    let value = null;
    if (event.target.value !== '') {
      value = event.target.value;
    }

    if (event.target.value === '') {
      value = null;
    }

    setSearchParam((prevFilters) => ({
      ...prevFilters,
      search: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const filteredCryptoOrdersBySearch = applyFilters(cryptoOrders, searchParam);
  const filteredCryptoOrders = applyFilters(
    filteredCryptoOrdersBySearch,
    filters
  );

  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  useEffect(() => {
    let source = [];
    let medium = [];
    let campaign = [];

    cryptoOrders?.map((cryptoOrder) => {
      if (cryptoOrder?.data?.utm_data?.utm_source) {
        source.push(cryptoOrder?.data?.utm_data?.utm_source);
      }
      if (cryptoOrder?.data?.utm_data?.utm_medium) {
        medium.push(cryptoOrder?.data?.utm_data?.utm_medium);
      }
      if (cryptoOrder?.data?.utm_data?.utm_campaign) {
        campaign.push(cryptoOrder?.data?.utm_data?.utm_campaign);
      }
    });

    setMarketingSource([...new Set(source)]);
    setMarketingMedium([...new Set(medium)]);
    setMarketingCampaign([...new Set(campaign)]);
  }, [cryptoOrders]);

  return (
    <>
      {cryptoOrders?.length > 0 ? (
        <Card>
          <div className="flex flex-col md:flex-row items-center justify-between p-4 md:px-6">
            <FormControl
              variant="outlined"
              sx={{
                p: 2,
              }}
            >
              <Select
                value={''}
                // onChange={handleStatusChange}
                autoWidth
                startAdornment={
                  <InputAdornment position="start">
                    <StarsIcon color="primary" />
                    <div className="flex gap-2 ml-2">
                      <Label
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedFilterOption('source');
                        }}
                        color={
                          selectedFilterOption === 'source' ? 'success' : 'info'
                        }
                      >
                        Source
                      </Label>
                      <Label
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedFilterOption('medium');
                        }}
                        color={
                          selectedFilterOption === 'medium' ? 'success' : 'info'
                        }
                      >
                        Medium
                      </Label>
                      <Label
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedFilterOption('campaign');
                        }}
                        color={
                          selectedFilterOption === 'campaign'
                            ? 'success'
                            : 'info'
                        }
                      >
                        Campaign
                      </Label>
                    </div>
                  </InputAdornment>
                }
              >
                {/* {statusOptions.map((statusOption) => (
            <MenuItem key={statusOption?.id} value={statusOption?.id}>
              {statusOption?.name}
            </MenuItem>
          ))} */}
                {selectedFilterOption === 'source' &&
                  marketingSource?.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                {selectedFilterOption === 'medium' &&
                  marketingMedium?.map((medium) => (
                    <MenuItem key={medium} value={medium}>
                      {medium}
                    </MenuItem>
                  ))}
                {selectedFilterOption === 'campaign' &&
                  marketingCampaign?.map((campaign) => (
                    <MenuItem key={campaign} value={campaign}>
                      {campaign}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Medium</TableCell>
                  <TableCell>Campaign</TableCell>
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
                          sx={{
                            cursor: 'pointer',
                          }}
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          noWrap
                          onClick={() =>
                            navigate(
                              `/team/management/assignments/details/${cryptoOrder?.id}`
                            )
                          }
                          color="#3f51b5"
                        >
                          {cryptoOrder?.id}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {moment(cryptoOrder?.submitted_on).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
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
                        >
                          {cryptoOrder?.data?.utm_data?.utm_source ||
                            'Source not found'}
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
                          {cryptoOrder?.data?.utm_data?.utm_medium ||
                            'Medium not found'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Typography variant="body2" color="text.secondary">
                            {cryptoOrder?.data?.utm_data?.utm_campaign ||
                              'Campaign not found'}
                          </Typography>
                        </div>
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
}
