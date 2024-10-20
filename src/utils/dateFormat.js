// Formats a date object into a string 'YYYYMMDD'
export function dateFormat(date) {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
}

// Handles both date objects and strings
export function dateRangeFormat(date) {
  if (!date) return;

  // If it's a Date object, use dateFormat
  if (date instanceof Date) {
    return dateFormat(date);
  }

  // If it's a string, split and remove hyphens
  if (typeof date === "string") {
    return date.split("-").join("");
  }

  return null;
}
