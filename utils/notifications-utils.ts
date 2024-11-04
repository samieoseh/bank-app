import * as Notifications from "expo-notifications";

async function schedulePushSendTransactionNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Transaction Successful",
      body: `You have successfully sent ₦${data.transactionAmount} to ${data.receiver.fullName}`,
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { seconds: 2 },
  });
}

async function schedulePushReceiveTransactionNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Transaction Successful",
      body: `You have successfully received ₦${data.transactionAmount} from ${data.sender.fullName}`,
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { seconds: 2 },
  });
}

export {
  schedulePushSendTransactionNotification,
  schedulePushReceiveTransactionNotification,
};
