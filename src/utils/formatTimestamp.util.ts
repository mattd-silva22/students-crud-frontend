export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return timestamp;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  return `${formattedDate} `;
}
