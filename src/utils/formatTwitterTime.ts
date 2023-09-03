export function formatTwitterTime (createdDate: any) {
  const now = new Date() as any
  const timeDiff = (now - createdDate) / 1000 // Diferencia de tiempo en segundos

  if (timeDiff < 60) {
    return `${Math.floor(timeDiff)}s`
  } else if (timeDiff < 3600) {
    return `${Math.floor(timeDiff / 60)}m`
  } else if (timeDiff < 86400 && createdDate.getDate() === now.getDate()) {
    return `${Math.floor(timeDiff / 3600)}h`
  } else if (createdDate.getFullYear() === now.getFullYear()) {
    const monthNames = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ]
    return `${createdDate.getDate()} ${monthNames[createdDate.getMonth()]}.`
  } else {
    return `${createdDate.getDate()} ${createdDate.toLocaleString('default', { month: 'short' })} ${createdDate.getFullYear()}`
  }
}
