import React, { useEffect } from "react";

const DocumentTitle = ({ title }) => {
  useEffect(() => {
    let existingTitle = document.title;
    document.title = title;

    return () => (document.title = existingTitle);
  }, [title]);
  return <></>;
};

export default DocumentTitle;
