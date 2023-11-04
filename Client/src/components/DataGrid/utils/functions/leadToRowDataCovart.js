import isDate from "../../../../helper/dateValidatior";
import { store } from "../../../../redux/store/store";

let runningSession = [];
store.subscribe(() => {
  let { sessions } = store.getState();
  if (sessions.data && sessions.data.length !== 0) {
    runningSession = store
      .getState()
      .sessions?.data?.filter((item) => new Date(item?.endAt) > Date.now())
      .map((session) => session?._id);
  }
});
function leadToRowData(data, runningSessions) {
  // console.log(runningSession);
  return data.map((item) => {
    let admittedRunningSession =
      runningSession.filter((runningSessions) =>
        item?.admittedSession?.includes(runningSessions)
      ) || [];
    return {
      id: item._id,
      email: [...item.email],
      phone: [...item.phone],
      followUpDate: isDate(item.followUpStatus.callAt)
        ? new Date(item.followUpStatus.callAt).toLocaleString("en", {
            dateStyle: "medium",
            timeStyle: "medium",
          })
        : item.followUpStatus.isCalled
        ? "Folloup Done"
        : "Followup not found!",
      folloUpAgent: item.followUpStatus?.agent?.name || "Folloup not found!",
      userProfile: item.accessories,
      name: item.name,
      callStatus: callStatus(item),
      batch:
        item?.batchStatus?.map((item) => item?.batchNo).length !== 0
          ? item?.batchStatus?.map((item) => item?.batchNo)
          : "Not Found!",
      agents: item.agent !== undefined ? item.agent.name : "Fresh Lead",
      agentId: item.agent !== undefined ? item.agent.id : "Fresh Lead",
      assignDate:
        item.agent !== undefined
          ? new Date(item.agent.AssignAt).toLocaleString("en", {
              dateStyle: "medium",
              timeStyle: "medium",
            })
          : "Not Found!",
      dateLine:
        item.agent !== undefined
          ? new Date(item.agent.dateLine).toLocaleString("en", {
              dateStyle: "medium",
              timeStyle: "medium",
            })
          : "Fresh Lead",
      bulkIds:
        item.entryType.length !== 0 && item.entryType.map((item) => item.id),
      tags: item.tags.length !== 0 ? item.tags : "Tag Not Found!",
      regDate:
        item.leadStatus[item.leadStatus.length - 1].leadAt !== null &&
        new Date(
          +item.leadStatus[item.leadStatus.length - 1].leadAt
        ).toLocaleString("en", { dateStyle: "medium", timeStyle: "medium" }),
      leadFrom: [...new Set([...item.leadStatus.map((item) => item.leadFrom)])],
      interest: item.interest.map(
        (item) => `${item.subject}(${(item.progress * 100).toFixed(0)}%)`
      ),
      skillStatus: item.leadSkill?.map(
        (item) => `${item.subject}(${(item.progress * 100).toFixed(0)}%)`
      ),
      session: [
        ...new Set([
          ...item.leadStatus.map(
            (item) => `${item.subject.title}--${item.session.sessionNo}`
          ),
        ]),
      ],
      comments: [
        ...new Set(item.history.map((history) => history.agent.name)),
      ].map((agent) => {
        const commentCount = item.history.filter(
          (item) => item.agent.name === agent
        ).length;
        return `${agent}(${commentCount})`;
      }),
      isAdmitted: item.admitionStatus.isAdmitted,
      runningSessionAdmit: admittedRunningSession.length !== 0,
    };
  });
}

export default leadToRowData;

/**
 *  Give a appropiate call status based on some condition
 * if any one input a lead from diffrent area after 5 days of assign someone then it will behave like fresh lead
 * @param {lead} lead
 * @returns
 */
function callStatus(lead) {
  let latestHistory = lead.history[lead.history.length - 1];
  if (latestHistory === undefined) {
    return "Not Found!";
  }
  if (
    (new Date(lead?.agent?.AssignAt) >
      new Date(
        new Date(lead.leadStatus[lead.leadStatus.length - 1].leadAt).getTime() -
          864000000
      ) &&
      latestHistory?.callStatus !== "") ||
    new Date(latestHistory.callAt) >
      new Date(lead.leadStatus[lead.leadStatus.length - 1].leadAt)
  ) {
    return latestHistory.callStatus;
  }

  return "Not Found!";
}
