export function getToday() {
  // 한국 시간(KST)으로 현재 날짜를 구하기
  const koreaTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Seoul',
  })
  const today = new Date(koreaTime)

  // 자정 기준으로 오늘 날짜를 설정 (시간을 00:00:00으로 설정)
  today.setHours(0, 0, 0, 0)

  // ISO 형식으로 변환하여 날짜만 비교
  return today.toISOString()
}
