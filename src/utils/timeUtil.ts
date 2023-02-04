const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: 24 * 60 * 60 * 1000 * 365 / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export const getRelativeTime = (d1: Date, d2: Date = new Date()): string => {
  const elapsed = d1.getTime() - d2.getTime()

  for (let u in units) {
    const uKey = u as keyof typeof units
    const unit = units[uKey]
    if (Math.abs(elapsed) > unit || u === 'second') {
      return rtf.format(Math.round(elapsed / unit), uKey)
    }
  }
  return ''
}
