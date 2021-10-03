export const locationName = [
  { name: 'Edison', index: 1 },
  { name: 'Rahway', index: 2 },
  { name: 'SouthPlainfield', index: 3 },
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novmeber',
  'December',
];

export const currentThreeMonths = () => {
  let currentMonth = new Date().getMonth();
  let requiredNumberOfMonth = 1;

  let requiredMonth = [];

  while (requiredNumberOfMonth <= 3) {
    requiredMonth.push(months[currentMonth]);
    requiredNumberOfMonth++;
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
    }
  }
  return requiredMonth;
};
