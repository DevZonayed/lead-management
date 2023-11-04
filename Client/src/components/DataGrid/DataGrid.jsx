import React, { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDataGrid } from "./hooks/useDataGrid";
import { useLocation } from "react-router-dom";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style/conditionalStyle.css";
import useAxios from "../../hooks/auth/useAxios";
import { useSelector } from "react-redux";
import PrivateLoader from "../../routes/loaders/PrivateLoader";

const DataGrid = () => {
  // Req Methods
  const { getLeadForAgent, getLeadsByIds, getAllSessions } = useAxios();
  const { state: locationState } = useLocation();
  const leadArrays = useMemo(() => {
    return locationState?.leads;
  }, [locationState]);
  const { lead, myData } = useSelector((state) => state);
  // Full Screen Handler
  const handleGridFullScreen = useFullScreenHandle();
  // Each Column Definition results in one Column.
  const {
    columnData,
    defaultColumnData,
    contextMenu,
    handleCellDubbleClick,
    handleRowStyle,
    gridRef,
  } = useDataGrid();

  useEffect(() => {
    if (leadArrays !== null && leadArrays !== undefined) {
      gridRef.current?.api?.setRowData([]);
      getLeadsByIds(leadArrays, gridRef);
    } else {
      gridRef.current?.api?.setRowData([]);
      getLeadForAgent(myData.data, gridRef);
    }
  }, [locationState]);

  /**
   * This Handler will work for Selected toas
   * @param {*} params
   */
  const handleSelectionChange = (params) => {
    if (params.api.getSelectedRows().length >= 10) {
      toast.dismiss();
      toast.success(`${params.api.getSelectedRows().length} Lead Selected!`);
    }
  };

  const handleGetLeadAgain = () => {
    if (leadArrays !== null && leadArrays !== undefined) {
      getLeadsByIds(leadArrays, gridRef);
    } else {
      getLeadForAgent(myData.data, gridRef);
    }
  };

  // Full Screen toggle handler
  const gridFullScreenHandler = () => {
    if (!handleGridFullScreen.active) {
      handleGridFullScreen.enter();
      toast.dismiss();
      toast.warning("Press (ALT+TAB) to view other open applications");
    } else {
      handleGridFullScreen.exit();
    }
  };
  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <FullScreen handle={handleGridFullScreen}>
        <div
          className="ag-theme-alpine"
          style={{
            width: "100%",
            height: `${
              handleGridFullScreen.active
                ? "calc(100vh - 30px)"
                : "calc(100vh - 125px)"
            }`,
          }}
        >
          {!lead.isLoading && lead.lead.length === 0 ? (
            <>
              <p className="alert alert-danger">Data Not Found</p>
            </>
          ) : (
            <></>
          )}
          <div className="topActionBar">
            <div
              style={{ alignItems: "center" }}
              className="action-Wrapper d-flex"
            >
              {/* get All Lead Again */}
              <div className="get_lead_again_button">
                <button
                  onClick={() => handleGetLeadAgain()}
                  className="toggleExpand btn btn-sm"
                  style={{ minWidth: "140px" }}
                >
                  Re update Lead
                </button>
              </div>
              <div className="gridTitle">
                <strong>DateGrid : {locationState?.title}</strong>
              </div>
            </div>
            <div onDoubleClick={gridFullScreenHandler} className="toggleExpand">
              Dubble Click me to expand
            </div>
          </div>
          {lead.isLoading && (
            <PrivateLoader>Fatching All Data...</PrivateLoader>
          )}

          <div
            style={
              lead.isLoading
                ? { position: "absolute", opacity: 0 }
                : { height: "100%", width: "100%" }
            }
            className="grid-container"
          >
            <AgGridReact
              onCellDoubleClicked={handleCellDubbleClick}
              pagination={true}
              suppressCopyRowsToClipboard={true}
              onSelectionChanged={handleSelectionChange}
              ref={gridRef}
              // rowData={rowData}
              columnDefs={columnData}
              defaultColDef={defaultColumnData}
              animateRows={true}
              rowSelection="multiple"
              allowContextMenuWithControlKey={true}
              rowClassRules={handleRowStyle}
              getContextMenuItems={contextMenu}
              onSortChanged={(e) => {
                e.api.refreshCells();
              }}
              overlayLoadingTemplate={
                '<span className="ag-overlay-loading-center">Processing All Data...</span>'
              }
            />
          </div>
        </div>
      </FullScreen>

      {/* <GroupGridExample /> */}
    </div>
  );
};

export default DataGrid;
