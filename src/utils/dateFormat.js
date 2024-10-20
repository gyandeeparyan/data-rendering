export function dateFormat(date) {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
}

export function dateRangeFormat(date) {
  if (!date) return;
  return date.split("-").join("");
}
