import * as Notifications from "expo-notifications"

export async function schedulePushNotification({ title = "", body = "" }) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,

    }),
  })

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  })
}