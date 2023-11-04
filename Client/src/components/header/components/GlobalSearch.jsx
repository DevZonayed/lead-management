import React, { useDeferredValue, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useComponentVisible from "../../../hooks/useComponentVisible";
import "../style/header.css";
import useAxios from "../../../hooks/auth/useAxios";
import PrivateLoader from "../../../routes/loaders/PrivateLoader";
import { useNavigate } from "react-router-dom";

const GlobalSearch = () => {
  const { getGlobalSearchResults } = useAxios();
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const deferredSearchVal = useDeferredValue(searchVal);
  const [ref, showResult, setShowResule] = useComponentVisible(false);
  const [searchResults, setSearchResults] = useState({
    isLoading: false,
    leads: [],
    error: null,
  });

  //   All Effects
  useEffect(() => {
    let timer;
    if (deferredSearchVal === "") {
      setShowResule(false);
    } else {
      setShowResule(true);
      //   Req for Data
      setSearchResults((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });

      timer = setInterval(() => {
        getGlobalSearchResults(deferredSearchVal)
          .then((res) => {
            setSearchResults((prev) => {
              return {
                ...prev,
                leads: res.data?.lead,
                isLoading: false,
                error: null,
              };
            });
          })
          .catch((err) => {
            setSearchResults((prev) => {
              return {
                ...prev,
                isLoading: false,
                error: err.message,
              };
            });
          });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [deferredSearchVal]);

  // Navigate to datagrid
  function handleNavigate(data) {
    navigate("/datagrid", {
      state: data,
    });
  }

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      if (searchResults.leads === 0) {
        return;
      }
      handleNavigate({
        leads: searchResults.leads.map((item) => item._id),
        title: `Global Search Result of - ${
          searchVal.length < 20 ? searchVal : searchVal.slice(0, 20) + "... "
        } /-`,
      });
      //   Reseting All Searched Element
      setSearchVal("");
      setShowResule(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      className="global-search searchbar"
    >
      <div>
        <div className="position-absolute top-50 translate-middle-y search-icon ms-3">
          <i className="bi bi-search"></i>
        </div>
        <input
          ref={ref}
          onClick={(event) => {
            event.target.value.trim() !== "" && setShowResule(true);
          }}
          onKeyDown={handlePressEnter}
          onChange={(event) => setSearchVal(event.target.value)}
          value={searchVal}
          className="form-control"
          type="text"
          placeholder="Type here to search"
        />

        <div className="position-absolute top-50 translate-middle-y search-close-icon">
          <BiSearch />
        </div>
      </div>
      {showResult && (
        <div ref={ref} className="search-result">
          {searchResults.isLoading ? (
            <PrivateLoader />
          ) : searchResults.leads?.length === 0 ? (
            <p className="alert alert-danger">Nothing Found!</p>
          ) : (
            <>
              <div className="search-devider">
                <span>Lead</span>
              </div>
              {/* Leads */}
              <div className="list-group">
                {searchResults.leads?.map((item) => {
                  return (
                    <span
                      key={item._id}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="row">
                        <div
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                          className="col"
                          title={item.name}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                          className="col"
                          title={item.phone}
                        >
                          {item.phone[0]}
                        </div>
                        <div
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                          className="col"
                          title={item.email}
                        >
                          {item.email[0]}
                        </div>
                      </div>
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
