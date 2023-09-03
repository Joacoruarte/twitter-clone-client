export const toCapitalizeCase = (text: string): string => {
  if (text === undefined || text === null || text === '') return ''
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}
