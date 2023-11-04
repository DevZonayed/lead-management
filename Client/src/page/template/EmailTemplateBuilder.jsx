import React, { useEffect, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/auth/useAxios";
const EmailTemplate = () => {
  const emailEditorRef = useRef(null);
  const { id } = useParams();
  const { mailTemp } = useSelector((state) => state);
  const { updateEmailTemplate, getAllEmailTemplate } = useAxios();
  const [templateInfo, setTemplateInfo] = useState({
    html: "",
    editableData: "",
  });
  const [isEditorRady, setEditorRady] = useState(false);
  const handleUpdate = () => {
    updateEmailTemplate({ _id: id, ...templateInfo });
  };

  useEffect(() => {
    if (mailTemp.data.length === 0) {
      getAllEmailTemplate();
    }
  }, []);

  // This is for load previous saved template
  useEffect(() => {
    if (mailTemp.data.length !== 0 && isEditorRady) {
      let exactTemplate = mailTemp.data.filter((item) => item._id === id)[0];
      if (exactTemplate.editableData !== undefined) {
        emailEditorRef.current.editor.loadDesign(exactTemplate.editableData);
      }
    }
  }, [mailTemp, isEditorRady]);

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    emailEditorRef.current.addEventListener("design:updated", function () {
      emailEditorRef.current.exportHtml((data) => {
        const { html } = data;
        setTemplateInfo((prev) => {
          return {
            ...prev,
            html,
          };
        });
      });
      emailEditorRef.current.saveDesign((data) => {
        setTemplateInfo((prev) => {
          return {
            ...prev,
            editableData: data,
          };
        });
      });
    });
    setEditorRady(true);
  };

  return (
    <div>
      <div style={{ position: "fixed", bottom: "40px", right: "50px" }}>
        <button className="btn btn-lg btn-success" onClick={handleUpdate}>
          Save Template
        </button>
      </div>

      <EmailEditor
        style={{ minHeight: "90vh" }}
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      />
    </div>
  );
};

export default EmailTemplate;
