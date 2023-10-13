export function formatDateToDDMMYYYY(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getUTCFullYear()); // Get the last 2 digits of the year

  return `${day}/${month}/${year}`;
}
export function formatDate(inputDate: any) {
  const date = new Date(inputDate);

  // Define month names for formatting
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get date components
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine if it's AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format minutes with leading zero if needed
  const formattedMinutes = String(minutes).padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${day} ${month} at ${formattedHours}:${formattedMinutes} ${amOrPm}`;

  return formattedDate;
}

export function timeAgo(date: any) {
  const currentDate = new Date();
  const timestamp = new Date(date).getTime();
  const currentTimestamp = currentDate.getTime();
  const secondsAgo = Math.floor((currentTimestamp - timestamp) / 1000);

  if (secondsAgo < 60) {
    return secondsAgo + ` second${secondsAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return minutesAgo + ` min${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return hoursAgo + ` hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 604800) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return daysAgo + ` day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2419200) {
    const weeksAgo = Math.floor(secondsAgo / 604800);
    return weeksAgo + ` week${weeksAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 29030400) {
    const monthsAgo = Math.floor(secondsAgo / 2419200);
    return monthsAgo + `month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 29030400);
    return yearsAgo + ` year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}
