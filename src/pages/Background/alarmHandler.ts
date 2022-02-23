export const alarmHandler = (alarm: chrome.alarms.Alarm) => {
  console.log(alarm)
  let text: string
  try {
    const dt = new Date(alarm.scheduledTime) // format example: 1645462419031.02
    text = `${dt.getHours()}${dt.getMinutes()}`
  } catch {
    text = 'err'
    console.error('issue with getting badge time: ', alarm)
  }
  return chrome.action.setBadgeText({ text })
}
