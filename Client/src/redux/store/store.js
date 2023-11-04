import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/events/eventsSlice";
import leadReducer from "../features/lead/leadSlice";
import subjectReducer from "../features/subjects/subjectSlice";
import myDataReducer from "../features/user/meSlice";
import mailTempReducer from "../features/Email/templateSlice";
import userReducer from "../features/user/userSlice";
import sessionReducer from "../features/sessions/sessionSlice";
import settingsReducer from "../features/settings/settingsSlice";
import bulkEntryReducer from "../features/BulkEntry/bulkEntrySlice";
import dashbordReducer from "../features/dashbord/dashbordSlice";

export const store = configureStore({
  reducer: {
    myData: myDataReducer,
    lead: leadReducer,
    subjects: subjectReducer,
    sessions: sessionReducer,
    events: eventReducer,
    mailTemp: mailTempReducer,
    alluser: userReducer,
    settings: settingsReducer,
    bulkEntry: bulkEntryReducer,
    dashbord: dashbordReducer,
  },
});
