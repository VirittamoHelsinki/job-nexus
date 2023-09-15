const getColorClass = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  const timeDifference = deadlineDate - today;
  const daysUntilDeadline = timeDifference / (1000 * 3600 * 24);

  if (daysUntilDeadline < 0) {
    return 'gray';
  }
  if (daysUntilDeadline <= 1) {
    return 'alert';
  } else if (daysUntilDeadline <= 3) {
    return 'warning';
  }

  return '';
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

export { formatDate, getColorClass };