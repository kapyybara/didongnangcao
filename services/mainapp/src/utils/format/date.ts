export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  return date.toLocaleDateString('en-US', options as any)
}
