export function getToday() {
  const now = new Date()
  const offset = 9 * 60 * 60 * 1000
  const kstTime = new Date(now.getTime() + offset)
  return kstTime.toISOString().split('T')[0]
}
