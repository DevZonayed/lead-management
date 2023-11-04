const cron = require("node-cron");
const mapOrder = require("../controller/OrderController");
const getAdmitionStatus = require("../controller/subController/AdmitionStatus");
const ErrorLog = require("../model/ErrorLog");
const SlackMessage = require("./actions/slackNotify");
const sendSmsInfo = require("./actions/smsQuantityNotify");

function scheduleJobs() {
  cron.schedule("*/59 * * * *", () => {
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();
    if (hours === 0 && minute === 0) {
      // Something to rub in evey 0
    } else if (hours === 1 && minute === 0) {
      // Something to run in 1
    } else if (hours === 2 && minute === 0) {
      // Something to run in 2
    } else if (hours === 3 && minute === 0) {
      // Something to run in 3
    } else if (hours === 4 && minute === 0) {
      // Something to run in 4
    } else if (hours === 5 && minute === 0) {
      // Something to run in 5
    } else if (hours === 6 && minute === 0) {
      // Something to run in 6
    } else if (hours === 7 && minute === 0) {
      // Something to run in 7
    } else if (hours === 8 && minute === 0) {
      // Something to run in 8
    } else if (hours === 9 && minute === 0) {
      // Something to run in 9
    } else if (hours === 10 && minute === 0) {
      // Something to run in 10
    } else if (hours === 11 && minute === 0) {
      // Something to run in 11
    } else if (hours === 12 && minute === 0) {
      // Something to run in 12
    } else if (hours === 13 && minute === 0) {
      // Something to run in 13
    } else if (hours === 14 && minute === 0) {
      // Something to run in 14
    } else if (hours === 15 && minute === 0) {
      // Something to run in 15
    } else if (hours === 16 && minute === 0) {
      // Something to run in 16
      mapOrder(); // Mapping Order from sorobindu.com
    } else if (hours === 17 && minute === 0) {
      // Something to run in 17
    } else if (hours === 18 && minute === 0) {
      // Something to run in 18
    } else if (hours === 19 && minute === 0) {
      // Something to run in 19
    } else if (hours === 20 && minute === 0) {
      // Something to run in 20
      sendSmsInfo();
    } else if (hours === 21 && minute === 0) {
      // Something to run in 21

      sendAdmitionStatus();
    } else if (hours === 22 && minute === 0) {
      // Something to run in 22
    } else if (hours === 23 && minute === 0) {
      // Something to run in 23
    } else if (hours === 24 && minute === 0) {
      // Something to run in 24
    }
  });
}

module.exports = scheduleJobs;

// Send Slack Notification about order info function
async function sendAdmitionStatus() {
  try {
    let orders = await getAdmitionStatus();

    if (orders.getAllOrderInfo.total === 0) {
      return false;
    }

    let notify = new SlackMessage({
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `${orders.message}`,
            emoji: true,
          },
        },

        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Type:*\nTodays Order Report`, // Editet
            },
            {
              type: "mrkdwn",
              text: `*TimeRange:*\n${orders.todaysOrderReport.timeRange}`,
            },
            {
              type: "mrkdwn",
              text: `*Total:*\n${orders.todaysOrderReport.total} Order`,
            },
            {
              type: "mrkdwn",
              text: `*Admitted:*\n${orders.todaysOrderReport.complete} Student`,
            },
            {
              type: "mrkdwn",
              text: `*Pending:*\n${orders.todaysOrderReport.pending} Student`,
            },
            {
              type: "mrkdwn",
              text: `*Cancled:*\n${orders.todaysOrderReport.cancled} Student`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Type:*\nYesterday Order Report`, // Editet
            },
            {
              type: "mrkdwn",
              text: `*TimeRange:*\n${orders.yesterDayOrderReport.timeRange}`,
            },
            {
              type: "mrkdwn",
              text: `*Total:*\n${orders.yesterDayOrderReport.total} Order`,
            },
            {
              type: "mrkdwn",
              text: `*Admitted:*\n${orders.yesterDayOrderReport.complete} Student`,
            },
            {
              type: "mrkdwn",
              text: `*Pending:*\n${orders.yesterDayOrderReport.pending} Student`,
            },
            {
              type: "mrkdwn",
              text: `*Cancled:*\n${orders.yesterDayOrderReport.cancled} Student`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Type:*\nAll Order`, // Editet
            },
            {
              type: "mrkdwn",
              text: `*TimeRange:*\n${orders.getAllOrderInfo.timeRange}`,
            },
            {
              type: "mrkdwn",
              text: `*Total:*\n${orders.getAllOrderInfo.total} Order`,
            },
            {
              type: "mrkdwn",
              text: `*Admitted:*\n${orders.getAllOrderInfo.complete} Student`,
            },
            {
              type: "mrkdwn",
              text: `*Pending:*\n${orders.getAllOrderInfo.pending} Student`,
            },
            {
              type: "mrkdwn",
              text: `*Cancled:*\n${orders.getAllOrderInfo.cancled} Student`,
            },
          ],
        },
        {
          type: "divider",
        },
      ],
    });
    notify.toDynamicManagementReport();
  } catch (err) {
    await ErrorLog.create({
      time: new Date(),
      from: "Send Admition Status",
      error: err,
    });
  }
}
