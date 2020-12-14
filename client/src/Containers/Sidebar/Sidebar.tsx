import * as React from "react";
import { Formik, FormikProps } from "formik";
import { Modal } from "antd/es";

import { Credential } from "../../Components/Credential/Credential";
import { TagSection } from "../../Components/TagSection/TagSection";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { FormikTextAreaField } from "../../Components/FormikTextArea/FormikTextArea";
import { FileUploader } from "../../Components/FileUploader/FileUploader";
import { EmailPasswordFields } from "../../Components/EmailPasswordFields/EmailPasswordFields";
import { updateUserDataFormValidatioSchema } from "./metaData";
import "./Sidebar.scss";
import { updateUserInfo } from "../../Actions/portfoliosAction";

type FormFieldsType = {
  password: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
  phoneNumber: string;
  degree: string;
  university: string;
  gpa: string;
  skills: string;
  interests: string;
  describeYourSelf: string;
  resumeLink: string;
  resumeName: string;
  newResume: any;
};

const createInitalValues = (userInfo) => {
  const resumeArray = userInfo.resume ? userInfo.resume.split("/") : [""];
  const resumeName = resumeArray[resumeArray.length - 1];
  return {
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    newResume: null,
    resumeLink: userInfo.resume,
    resumeName: resumeName,
    phoneNumber: userInfo.phoneNumber,
    degree: userInfo.degree,
    university: userInfo.university,
    gpa: userInfo.gpaScore,
    skills: userInfo.skills,
    interests: userInfo.interest,
    describeYourSelf: userInfo.describeYourSelf,
  };
};

export const Sidebar = (props: { userName: string }) => {
  const { userName } = props;
  const { state: appState, dispatcher } = useAppContext();
  const [state, setState] = React.useState<{ modalVisibility: boolean }>({
    modalVisibility: false,
  });
  const { modalVisibility } = state;
  const { userInfo } = appState;
  const { phoneNumber, email, degree, university, gpaScore, skills, interest } = userInfo;
  const formatedSkills = skills ? skills.split(",") : [];
  const formatedInterests = interest ? interest.split(",") : [];
  return (
    <>
      <div className="portfoliosSideBar">
        <PrimaryButton
          label="Update user info"
          onClick={() => {
            setState({ ...state, modalVisibility: true });
          }}
          style={{ padding: "5px" }}
        />
        <Credential label="Phone number" value={phoneNumber} />
        <Credential label="Email" value={email} />
        {degree && <Credential label="Degree" value={degree} />}
        {university && <Credential label="University" value={university} />}
        {gpaScore && <Credential label="GPA" value={gpaScore} />}
        {formatedSkills.length ? <Credential label="Skills" value={<TagSection tags={formatedSkills} />} /> : <></>}
        {formatedInterests.length ? <Credential label="Interest" value={<TagSection tags={formatedInterests} />} /> : <></>}
      </div>
      {modalVisibility && (
        <Formik
          initialValues={createInitalValues(userInfo)}
          validationSchema={updateUserDataFormValidatioSchema}
          enableReinitialize
          onSubmit={(values: FormFieldsType) => {
            updateUserInfo({ data: { ...values, userName: userName }, dispatch: dispatcher });
          }}
        >
          {({ setFieldValue, handleSubmit, values }: FormikProps<FormFieldsType>) => {
            return (
              <Modal
                title="Edit user info"
                visible={modalVisibility}
                // onOk={() => setState({ ...state, modalVisibility: false })}
                onCancel={() => {
                  setState({ ...state, modalVisibility: !modalVisibility });
                }}
                footer={[]}
              >
                <div className="signInForm">
                  <FormikInputField name="newPassword" placeHolder="Enter new Password" password />
                  <FormikInputField name="confirmPassword" placeHolder="Re enter new password" password />
                  <FormikInputField name="phoneNumber" placeHolder="Phone number" />
                  <FormikInputField name="degree" placeHolder="Enter Degree" />
                  <FormikInputField name="university" placeHolder="Enter University" />
                  <FormikInputField name="gpa" placeHolder="Enter Score" />
                  <FormikInputField name="skills" placeHolder="Enter coma separated skills" />
                  <FormikInputField name="interests" placeHolder="Enter coma separated interests" />
                  <FormikTextAreaField name="describeYourSelf" placeHolder="Describe Your Self" />
                  <div className="fileUploaderResume">
                    <FileUploader
                      onUpload={(file: any) => {
                        setFieldValue("newResume", file);
                        setFieldValue("resumeName", file.name);
                        setFieldValue("resumeLink", "");
                      }}
                      onDeleteFile={() => {
                        setFieldValue("newResume", null);
                        setFieldValue("resumeLink", "");
                        setFieldValue("resumeName", "");
                      }}
                      resumeName={values.resumeName}
                    />
                    {userInfo.resume && userInfo.resume.length && (
                      <a className="downloadAnchor" href={`http://localhost:3001${userInfo.resume}`} download>
                        Download Resume
                      </a>
                    )}
                  </div>
                  <EmailPasswordFields />
                  <PrimaryButton onClick={() => handleSubmit()} label="Submit Form" />
                </div>
              </Modal>
            );
          }}
        </Formik>
      )}
    </>
  );
};
