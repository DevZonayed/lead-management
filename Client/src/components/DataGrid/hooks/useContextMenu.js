import { useSelector } from "react-redux";
import useDrawer from "../../Drawer/hook/useDrawer";
import SendMessageDrawer from "../subComponents/DrawerComponents/SendMessageDrawer";
import SendMailDrawer from "../subComponents/DrawerComponents/SendMailDrawer";
import mailImage from "../../../assets/ContextMenuIcons/mail.svg";
import agentImage from "../../../assets/ContextMenuIcons/agent.svg";
import tagsImage from "../../../assets/ContextMenuIcons/tags.svg";
import AssignAgent from "../subComponents/DrawerComponents/AssignAgent";
const useContextMenu = () => {
  const userInfo = useSelector((state) => state.myData);
  const drawer = useDrawer();

  const contextMenu = (params) => {
    var result = [
      {
        name: "Send Message",
        icon: `<img width="20px" src=${mailImage}/>`,
        disabled: userInfo.data.role !== "admin",
        tooltip:
          userInfo.data.role !== "admin"
            ? `Sorry ${userInfo.data.firstName} we have permission shortage!`
            : "Click Me to Send Message",
        action: () => {
          drawer.show(
            <SendMessageDrawer data={params.api.getSelectedRows()} />
          );
        },
      },
      {
        name: "Send Mail",
        icon: `<img width="20px" src=${mailImage}/>`,
        disabled: userInfo.data.role !== "admin",
        tooltip:
          userInfo.data.role !== "admin"
            ? `Sorry ${userInfo.data.firstName} we have permission shortage!`
            : "Click Me to Send Message",
        action: () => {
          drawer.show(<SendMailDrawer data={params.api.getSelectedRows()} />);
        },
      },
      {
        name: "Assign Agent",
        icon: `<img width="20px" src=${agentImage}/>`,
        disabled: userInfo.data.role !== "admin",
        tooltip:
          userInfo.data.role !== "admin"
            ? `Sorry ${userInfo.data.firstName} we have permission shortage!`
            : "Click Me to Send Message",
        action: () => {
          drawer.show(
            <AssignAgent data={params.api.getSelectedRows()} params={params} />
          );
        },
      },
      {
        name: "Add Tags",
        icon: `<img width="20px" src=${tagsImage}/>`,
        disabled: userInfo.data.role !== "admin",
        tooltip:
          userInfo.data.role !== "admin"
            ? `Sorry ${userInfo.data.firstName} we have permission shortage!`
            : "Click Me to Send Message",
        action: () => {
          drawer.show(
            <>
              <h3>Adding Tags</h3>
            </>
          );
        },
      },

      "separator",
      "copy",
      "export",
    ];
    return result;
  };

  return { contextMenu };
};

export default useContextMenu;
