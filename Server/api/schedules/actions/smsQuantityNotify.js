const SslWaireless = require("./sslwireless");
const SlackMessage = require("./slackNotify");
async function sendSmsInfo() {
  try {
    let checkBalance = new SslWaireless();
    const sidSoroBindu = await checkBalance.checkBalance({
      sid: process.env.SSLWAIRELESS_SID1,
    });
    const sidSoroBinduNon = await checkBalance.checkBalance({
      sid: process.env.SSLWAIRELESS_SID2,
    });

    if (sidSoroBindu.data.status_code) {
      if (sidSoroBindu.data.balance <= 500) {
        let notification = new SlackMessage({
          text: `Hello, currently we have ${sidSoroBindu.data.balance} sms balance in SOROBINDU SID and ${sidSoroBinduNon.data.balance} in SOROBINDUNON SID`,
        });
        notification.toRidam().toJillur();
      }
    }
  } catch (err) {
    let notification = new SlackMessage({
      text: `Hello, I think I am in trouble. Please contact with my Developer with this ${err}`,
    });
    notification.toRidam().toJillur();
  }
}

module.exports = sendSmsInfo;
