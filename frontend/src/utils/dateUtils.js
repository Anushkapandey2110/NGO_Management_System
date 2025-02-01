// shared/utils/dateUtils.js

export const formatDate = (isoDate) => {
    if (!isoDate) return "Invalid Date";
    return new Date(isoDate).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
};
  