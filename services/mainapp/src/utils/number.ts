export function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function calculateTimeAgo(targetDate: Date): string {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - targetDate.getTime();

  // Tính số milliseconds, giây, phút và giờ
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
      return `${hours} giờ trước`;
  } else if (minutes > 0) {
      return `${minutes} phút trước`;
  } else if (seconds > 0) {
      return `${seconds} giây trước`;
  } else {
      return 'Vừa mới';
  }
}