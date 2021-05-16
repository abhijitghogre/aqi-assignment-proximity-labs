import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { getColorByAqi } from '../utils';

const chartOptions = {
  animation: {
    duration: 0,
  },
  hover: {
    animationDuration: 0,
  },
  responsiveAnimationDuration: 0,
  scales: {
  },
};

const getChartData = (labels, data) => {
  return {
    labels: labels.map(label => label.format('LTS')),
    datasets: [
      {
        label: 'AQI',
        data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: '#fff',
      },
    ],
  };
};

function Dashboard(props) {
  const { citiesData, toggleExpanded } = props;
  return (
    <Box maxW='1020px' m='auto'>
      {Object.keys(citiesData).map(cityName => (
        <Box transition='all 0.5s' backgroundColor={getColorByAqi(citiesData[cityName].latestAqi)} p={2}
             key={cityName} overflow='hidden' onClick={e => toggleExpanded(cityName)} cursor='pointer'
             border='1px solid #676767' borderTop={0} height={citiesData[cityName].isExpanded ? 'auto' : '68px'}>
          <Flex justify='space-between' align='center'>
            <Text fontSize='25px'>{cityName}</Text>
            <Box textAlign='right'>
              <Text fontSize='14px'>{citiesData[cityName].latestUpdatedAt.fromNow()}</Text>
              <Text fontSize='20px' fontWeight='bold'>{citiesData[cityName].latestAqi}</Text>
            </Box>
          </Flex>
          <Line data={getChartData(citiesData[cityName].updatedAt, citiesData[cityName].aqi)}
                options={chartOptions} />
        </Box>
      ))}
    </Box>
  );
}

Dashboard.propTypes = {
  citiesData: PropTypes.object,
  toggleExpanded: PropTypes.func,
};

export default Dashboard;
