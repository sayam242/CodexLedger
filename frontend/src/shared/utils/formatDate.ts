// shared/utils/formatDate.ts

export function formatDate(
  dateString: string
) {

  return new Date(
    dateString
  ).toLocaleString(
    "en-IN",
    {

      day: "numeric",
      month: "short",
      year: "numeric",

      hour: "2-digit",
      minute: "2-digit"

    }
  );

}