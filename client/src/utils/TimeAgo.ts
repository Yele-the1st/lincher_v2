export function timeAgo(timestamp?: string): string {
  if (!timestamp) {
    return "Undefined";
  }

  const createdAt: Date = new Date(timestamp);

  if (isNaN(createdAt.getTime())) {
    return "Invalid timestamp format";
  }

  const now: Date = new Date();
  const timeDifference: number = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute: number = 60 * 1000;
  const hour: number = minute * 60;
  const day: number = hour * 24;
  const month: number = day * 30;
  const year: number = day * 365;

  // Calculate time ago
  if (timeDifference < minute) {
    const seconds: number = Math.round(timeDifference / 1000);
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  } else if (timeDifference < hour) {
    const minutes: number = Math.round(timeDifference / minute);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (timeDifference < day) {
    const hours: number = Math.round(timeDifference / hour);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (timeDifference < month) {
    const days: number = Math.round(timeDifference / day);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (timeDifference < year) {
    const months: number = Math.round(timeDifference / month);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  } else {
    const years: number = Math.round(timeDifference / year);
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
}

export const openURLInNewTab = (url: string) =>
  window.open(url, "_blank", "noopener,noreferrer");
