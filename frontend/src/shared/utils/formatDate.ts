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

      hour: "2-digit",
      minute: "2-digit"

    }
  );

}