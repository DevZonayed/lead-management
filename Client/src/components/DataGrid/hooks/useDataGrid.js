import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useDrawer from "../../Drawer/hook/useDrawer";
import EditLeadDrawer from "../subComponents/DrawerComponents/EditLeadDrawer";
import { adminDataCulmn, agentDataCulmn } from "../utils/admin/datagridColumns";
import useContextMenu from "../hooks/useContextMenu";
import isDate from "../../../helper/dateValidatior";
import { toast } from "react-toastify";
export const useDataGrid = () => {
  const gridRef = useRef();
  const { contextMenu } = useContextMenu();

  const allStoreData = useSelector((state) => state);
  const { myData: userData, lead } = allStoreData;
  const [search, setSearch] = useState("");
  const searchKey = useDeferredValue(search);
  const drawer = useDrawer();
  const defaultColumnData = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  useEffect(() => {
    if (gridRef.current.api !== undefined) {
      if (lead.isLoading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [lead]);

  const columnData = useMemo(() => {
    // set column based on user role
    if (userData.data.role === "admin") {
      return adminDataCulmn;
    } else {
      return agentDataCulmn;
    }
  }, [userData]);

  // Apperiencing Grid Rows
  const handleRowStyle = useMemo(() => {
    return {
      admitted_lead: (params) => {
        return params.data.runningSessionAdmit;
      },
      expaired_lead: (params) => {
        if (!isDate(params.data.dateLine)) {
          return false;
        }
        return (
          new Date(params.data.dateLine) < new Date() &&
          !params.data.runningSessionAdmit &&
          !isDate(params.data.followUpDate) &&
          /^Not Found!$/i.test(params.data.callStatus)
        );
      },
      expaired_followup: (params) => {
        if (!isDate(params.data.followUpDate)) {
          return false;
        }
        return new Date(params.data.followUpDate) < new Date();
      },
      todays_lead: (params) => {
        if (!isDate(params.data.dateLine)) {
          return false;
        }
        return (
          new Date(params.data.dateLine).toDateString("en", {
            dateStyle: "medium",
          }) ===
          new Date(Date.now()).toDateString("en", {
            dateStyle: "medium",
          })
        );
      },
    };
  }, []);

  const handleCellDubbleClick = (event) => {
    // Admition Validation

    if (event.data.runningSessionAdmit) {
      toast.warning("This lead already admitted in this session!");
      return false;
    }

    // Not Assigned lead
    if (event.data.agentId !== userData.data._id) {
      let accessRole = ["admin"];
      if (accessRole.includes(userData.data.role)) {
        if (
          window.confirm(
            "Hello admin Your involvement can be hurmful for the agent reputation!!"
          )
        ) {
          drawer.show(<EditLeadDrawer leadId={event.data.id} event={event} />);
        } else {
          return false;
        }
      } else {
        toast.error("Lead Already assigned to another agent !!");
        return false;
      }
    }
    drawer.show(<EditLeadDrawer leadId={event.data.id} event={event} />);
  };

  return {
    gridRef,
    setSearch,
    columnData,
    defaultColumnData,
    contextMenu,
    handleCellDubbleClick,
    handleRowStyle,
  };
};
