import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function formatDate(date) {
  return dayjs(date).format('dddd, DD MMMM');
}

export function isWeekend(productDeliveryDate, orderCreatedAtTime) {
  let productDate = dayjs(productDeliveryDate);
  let orderTime = dayjs(orderCreatedAtTime);

  let daysBetween = Math.abs(orderTime.diff(productDate, 'day'));

  const weekends = [0, 6]

  for (let i = 0; i < daysBetween;) {
    orderTime = orderTime.add(1,'day');

    if (weekends.includes(orderTime.day())) {
      productDate = productDate.add(1, 'day');
    }
    else {
      i++;
    }
  }
  return productDate;
}