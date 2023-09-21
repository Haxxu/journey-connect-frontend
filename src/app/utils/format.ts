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
  const amOrPm = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format minutes with leading zero if needed
  const formattedMinutes = String(minutes).padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${day} ${month} at ${formattedHours}:${formattedMinutes} ${amOrPm}`;

  return formattedDate;
}
