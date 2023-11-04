import React from "react";
import { useSelector } from "react-redux";

const AdmitionReport = () => {
  const { dashbord } = useSelector((state) => state);

  return (
    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
      <div className="col">
        <div className="card rounded-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="">
                <p className="mb-1">Total Orders</p>
                <h4 className="mb-0">
                  {dashbord.data?.orderReport?.getAllOrderInfo?.total}
                </h4>
                <p className="mb-0 mt-2 font-13">Students</p>
              </div>
              <div className="ms-auto widget-icon bg-primary text-white">
                <i className="bi bi-basket2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card rounded-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="">
                <p className="mb-1">Pending Order</p>
                <h4 className="mb-0">
                  {dashbord.data?.orderReport?.getAllOrderInfo?.pending}
                </h4>
                <p className="mb-0 mt-2 font-13">
                  <span>Students</span>
                </p>
              </div>
              <div className="ms-auto widget-icon bg-warning text-orange text-white">
                <i className="bi bi-heart-half"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card rounded-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="">
                <p className="mb-1">Cancled Order</p>
                <h4 className="mb-0">
                  {dashbord.data?.orderReport?.getAllOrderInfo?.cancled}
                </h4>
                <p className="mb-0 mt-2 font-13">
                  <span>Students</span>
                </p>
              </div>
              <div className="ms-auto widget-icon bg-danger text-white">
                <i className="bi bi-heartbreak"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card rounded-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="">
                <p className="mb-1">Complete Order</p>
                <h4 className="mb-0">
                  {dashbord.data?.orderReport?.getAllOrderInfo?.complete}
                </h4>
                <p className="mb-0 mt-2 font-13">
                  <span>Students</span>
                </p>
              </div>
              <div className="ms-auto widget-icon bg-info text-white">
                <i className="bi bi-people-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitionReport;
