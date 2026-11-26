export const formateDateTime = (date: string): string => {
  const formatter = new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return formatter.format(new Date(date))
}
