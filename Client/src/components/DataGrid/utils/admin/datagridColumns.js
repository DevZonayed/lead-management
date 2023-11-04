export const adminDataCulmn = [
  {
    headerName: "#",
    valueGetter: "node.rowIndex + 1",
    pinned: "left",
    width: "70px",
    filter: false,
  },
  {
    field: "name",
    pinned: "left",
    filter: true,
    headerCheckboxSelection: true,
  },
  { field: "phone", pinned: "left", filter: true },
  { field: "email", filter: true },
  {
    field: "agents",
    filter: true,
  },
  {
    field: "assignDate",
    filter: true,
  },
  {
    field: "dateLine",
    headerName: "DeadLine",
    filter: true,
  },
  {
    field: "session",
    headerName: "Sub-Session",
    filter: true,
  },
  {
    field: "batch",
    filter: true,
  },
  {
    field: "isAdmitted",
    headerName: "Admitted",
    filter: true,
  },
  {
    field: "runningSessionAdmit",
    headerName: "R S Admitted",
    filter: true,
  },
  {
    field: "userProfile",
    filter: true,
  },
  {
    field: "followUpDate",
    filter: true,
  },
  {
    field: "folloUpAgent",
    filter: true,
  },
  {
    field: "callStatus",
    filter: true,
  },
  {
    field: "bulkIds",
    filter: true,
  },
  {
    field: "tags",
    filter: true,
  },
  {
    field: "regDate",
    filter: true,
  },
  {
    field: "leadFrom",
    filter: true,
  },
  {
    field: "interest",
    filter: true,
  },
  {
    field: "skillStatus",
    filter: true,
  },
  {
    field: "comments",
    width: "250px",
    filter: false,
  },
];
export const agentDataCulmn = [
  {
    field: "name",
    pinned: "left",
    filter: true,
    headerCheckboxSelection: true,
  },
  { field: "phone", pinned: "left", filter: true },
  { field: "email", filter: true },
  {
    field: "userProfile",
    filter: false,
  },
  {
    field: "assignDate",
    filter: false,
  },
  {
    field: "dateLine",
    filter: false,
  },
  {
    field: "session",
    headerName: "Sub-Session",
    filter: false,
  },
  {
    field: "batch",
    filter: true,
  },
  {
    field: "isAdmitted",
    headerName: "Admitted",
    filter: true,
  },
  {
    field: "runningSessionAdmit",
    headerName: "R S Admitted",
    filter: true,
  },
  {
    field: "followUpDate",
    filter: false,
  },
  {
    field: "folloUpAgent",
    filter: false,
  },

  {
    field: "callStatus",
    filter: true,
  },
  {
    field: "leadFrom",
    filter: false,
  },
  {
    field: "interest",
    filter: true,
  },
  {
    field: "skillStatus",
    filter: true,
  },
];
