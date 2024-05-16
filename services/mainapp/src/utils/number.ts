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


export function filterDates(value: string): string {
  const today = new Date(); // Ngày hôm nay
  const dayOfWeek = today.getDay();

  switch (value) {
    case 'd':
      return `Filter today ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    case 'w':
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Tính toán ngày đầu tiên của tuần
      return `Filter from ${firstDayOfWeek.getDate()}/${firstDayOfWeek.getMonth() + 1}/${firstDayOfWeek.getFullYear()} to ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    case 'M':
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return `Filter from ${firstDayOfMonth.getDate()}/${firstDayOfMonth.getMonth() + 1}/${firstDayOfMonth.getFullYear()} to ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    case 'y':
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      return `Filter from ${firstDayOfYear.getDate()}/${firstDayOfYear.getMonth() + 1}/${firstDayOfYear.getFullYear()} to ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    default:
      return 'Invalid value';
  }
}


export function getFirstDateFilter(value: string): String {
  const today = new Date();
  const dayOfWeek = today.getDay();
  var result : any;
  switch (value) {
    case 'd':
      result = today;
      break;
    case 'w':
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      result = firstDayOfWeek;
      break;
    case 'M':
      result = new Date(today.getFullYear(), today.getMonth(), 1)
      break;
    case 'y':
      result = new Date(today.getFullYear(), 0, 1)
      break;
  }
  return `${result.getFullYear()}-${result.getMonth()+1}-${result.getDate()}T00:00:00`
}

export function getLastTime(){
  const day = new Date();
  return `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}T23:59:59`

}