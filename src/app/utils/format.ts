export function formatDateToDDMMYYYY(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getUTCFullYear()); // Get the last 2 digits of the year

  return `${day}/${month}/${year}`;
}
