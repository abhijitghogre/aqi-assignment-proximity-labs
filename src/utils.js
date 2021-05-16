export const getChartLimit = () => 20;

export const getColorByAqi = (value, hex) => {
  if (value > 0 && value <= 50) {
    return hex ? '#48BB78' : 'green.400';
  }
  if (value > 50 && value <= 100) {
    return hex ? '#9AE6B4' : 'green.200';
  }
  if (value > 100 && value <= 200) {
    return hex ? '#F6E05E' : 'yellow.300';
  }
  if (value > 200 && value <= 300) {
    return hex ? '#F6AD55' : 'orange.300';
  }
  if (value > 300 && value <= 400) {
    return hex ? '#F56565' : 'red.400';
  }
  if (value > 400 && value <= 500) {
    return hex ? '#C53030' : 'red.600';
  }
  if (value > 500) {
    return hex ? '#521B41' : 'pink.900';
  }
};
