import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { getColorByAqi } from '../utils';

const options = {
  indexAxis: 'y',
  responsive:true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  hover: {
    animationDuration: 0,
  },
  responsiveAnimationDuration: 0,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const getChartData = (labels, data) => {
  return {
    labels,
    datasets: [
      {
        label: 'AQI',
        data: labels.map(label => data[label].latestAqi),
        backgroundColor: labels.map(label => getColorByAqi(data[label].latestAqi, true)),
        borderWidth: 1,
      },
    ],
  };
};


function Comparison(props) {
  const { citiesData } = props;
  return (
    <Box maxW='1020px' m='auto' h="80vh">
      <Bar data={getChartData(Object.keys(citiesData), citiesData)} options={options} />
    </Box>
  );
}

Comparison.propTypes = {
  citiesData: PropTypes.object,
};

export default Comparison;
