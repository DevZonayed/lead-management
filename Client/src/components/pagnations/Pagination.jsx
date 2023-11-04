import React, { memo } from "react";
import ReactPaginate from "react-paginate";
import "./style/paginate.css";

function PaginatedItems({ itemsPerPage, itemCount, setPaginateInfo }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0);
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  // const endOffset = itemOffset + itemsPerPage;
  // const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(itemCount / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % itemCount;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
    setPaginateInfo((prev) => {
      return {
        ...prev,
        pageNo: event.selected,
      };
    });
  };

  return (
    <div
      className="pagination"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "15px",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
      }}
    >
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        activeClassName={"item active "}
        breakClassName={"item break-me "}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        pageClassName={"item pagination-page "}
        nextClassName={"item next "}
        previousClassName={"item previous"}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default memo(PaginatedItems);
