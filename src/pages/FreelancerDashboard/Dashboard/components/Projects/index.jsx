import { useState } from 'react';

import { Card } from '@mui/material';
import { BsCheckCircleFill } from 'react-icons/bs';

import VuiBox from '~/components/VuiBox';
import VuiTypography from '~/components/VuiTypography';

// Vision UI Dashboard Materail-UI example components
import Table from '~/components/Tables/Table';

// Data
import data from '../Projects/data';

function Projects({ title }) {
  const { columns, rows } = data();

  return (
    <Card
      sx={{
        height: '100% !important',
      }}
    >
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="32px"
      >
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            {title}
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              ml="5px"
            >
              &nbsp;<strong>Latest 5</strong> assignments
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox
        sx={{
          '& th': {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          '& .MuiTableRow-root:not(:last-child)': {
            '& td': {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </VuiBox>
    </Card>
  );
}

export default Projects;
