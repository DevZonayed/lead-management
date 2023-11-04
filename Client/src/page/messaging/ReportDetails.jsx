import React from "react";

const ReportDetails = ({ data }) => {
  console.log(data);
  return (
    <div className="p-3">
      <div className="h4">Message Details</div>
      <table style={{ verticalAlign: "middle" }} className="table">
        <thead>
          <tr>
            <td>Number</td>
            <td>Reference</td>
            <td>Status</td>
            <td>Language</td>
            <td>Body</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={"detailsKey" + index}>
                <td>{item?.msisdn}</td>
                <td>{item?.reference_id}</td>
                <td
                  className={`bg-${
                    item?.sms_status === "SUCCESS" ? "success" : "danger"
                  } rounded`}
                >
                  {item?.sms_status}
                </td>
                <td>{item?.sms_type}</td>
                <td>{item?.sms_body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportDetails;
