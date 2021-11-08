export const locationName = [
  { name: 'Edison', index: 1 },
  { name: 'Rahway', index: 2 },
  { name: 'SouthPlainfield', index: 3 },
  { name: 'Bakers Basin', index: 4 },
  { name: 'Bayonne', index: 5 },
  { name: 'Camden', index: 6 },
  { name: 'Cardiff', index: 7 },
  { name: 'Delanco', index: 8 },
  { name: 'Eatontown', index: 9 },
  // { name: 'Elizabeth', index: 10 },
  // { name: 'Flemington', index: 11 },
  // { name: 'Freehold', index: 12 },
  { name: 'Lodi', index: 13 },
  { name: 'Newark', index: 14 },
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
