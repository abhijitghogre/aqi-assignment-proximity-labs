import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider, Flex, Text, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink,
} from 'react-router-dom';
import moment from 'moment';
import Dashboard from './containers/Dashboard';
import Comparison from './containers/Comparison';
import { getChartLimit } from './utils';

function App() {

  const [citiesData, setCityData] = useState({});

  const updateData = (newData_) => {
    const newData = JSON.parse(newData_);
    newData.map((newCityData) => {
      setCityData(citiesData_ => ({
        ...citiesData_,
        [newCityData.city]: {
          isExpanded: citiesData_[newCityData.city] ? citiesData_[newCityData.city].isExpanded : false,
          latestAqi: newCityData.aqi.toFixed(2),
          latestUpdatedAt: moment(),
          aqi: citiesData_[newCityData.city] ?
            [...citiesData_[newCityData.city].aqi, newCityData.aqi.toFixed(2)].slice(-1 * getChartLimit()) :
            [newCityData.aqi.toFixed(2)],
          updatedAt: citiesData_[newCityData.city] ?
            [...citiesData_[newCityData.city].updatedAt, moment()].slice(-1 * getChartLimit()) :
            [moment()],
        },
      }));
      return newCityData;
    });
  };

  useEffect(() => {
    const socket = new WebSocket('ws://city-ws.herokuapp.com');
    socket.onmessage = function(event) {
      updateData(event.data);
    };
    // updateData(JSON.stringify([{ city: 'Test', aqi: 99 }]));
  }, []);

  const toggleExpanded = (city) => {
    setCityData(citiesData_ => {
      return ({
        ...citiesData_,
        [city]: {
          ...citiesData_[city],
          isExpanded: !citiesData_[city].isExpanded,
        },
      });
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Box backgroundColor='black' color='white' p={4}>
            <Flex maxW='1020px' m='auto' justify='space-between'>
              <Text>AQI monitor</Text>
              <Flex justify='flex-end'>
                <Box>
                  <NavLink exact to='/' activeStyle={{
                    fontWeight: 'bold',
                    color: 'tomato',
                  }}>Dashboard</NavLink>
                </Box>
                <Box ml={4}>
                  <NavLink exact to='/comparison' activeStyle={{
                    fontWeight: 'bold',
                    color: 'tomato',
                  }}>Compare</NavLink>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Switch>
            <Route path='/comparison'>
              <Comparison citiesData={citiesData} />
            </Route>
            <Route path='/'>
              <Dashboard citiesData={citiesData} toggleExpanded={toggleExpanded} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
