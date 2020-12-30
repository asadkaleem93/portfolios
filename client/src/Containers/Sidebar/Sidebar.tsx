import * as React from "react";
import { Formik, FormikProps } from "formik";
import { Modal } from "antd/es";
import { MenuUnfoldOutlined, LinkedinOutlined, GithubOutlined } from "@ant-design/icons";

import { Credential } from "../../Components/Credential/Credential";
import { TagSection } from "../../Components/TagSection/TagSection";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { FormikTextAreaField } from "../../Components/FormikTextArea/FormikTextArea";
import { FileUploader } from "../../Components/FileUploader/FileUploader";
import { EmailPasswordFields } from "../../Components/EmailPasswordFields/EmailPasswordFields";
import { updateUserDataFormValidatioSchema } from "./metaData";
import { updateUserInfo } from "../../Actions/usersActions";
import { DisplayImage } from "../../Components/DisplayImage/DisplayImage";

import "./Sidebar.scss";
import { OverlayDrawer } from "../../Components/OverlayDrawer/OverlayDrawer";
import { ApplicationDrawertoggleOutside, ApplicationDrawertoggleInside } from "../../Assets/SvgIcons";
import { ImageCropper } from "../../Components/ImageCropper/ImageCropper";
import { blobToBase64 } from "../../Utils/helpers";

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
  newDisplayImage: any;
  displayImage: string;
  linkedInLink: string;
  githubLink: string;
  cropValues: string;
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
    newDisplayImage: null,
    displayImage: userInfo.displayImage,
    phoneNumber: userInfo.phoneNumber,
    degree: userInfo.degree,
    university: userInfo.university,
    gpa: userInfo.gpaScore,
    skills: userInfo.skills,
    interests: userInfo.interest,
    describeYourSelf: userInfo.describeYourSelf,
    linkedInLink: userInfo.linkedIn,
    githubLink: userInfo.github,
    cropValues: userInfo.cropValues,
  };
};

export const Sidebar = (props: { userName: string }) => {
  const { userName } = props;
  const { state: appState, dispatcher } = useAppContext();
  const [state, setState] = React.useState<{ modalVisibility: boolean; drawerVisibility: boolean; cropperVisibility: boolean; imgSrc: string; cropValues: string }>({
    modalVisibility: false,
    drawerVisibility: false,
    cropperVisibility: false,
    cropValues: "",
    imgSrc: "",
  });
  const { modalVisibility } = state;
  const { userInfo } = appState;
  const { phoneNumber, email, degree, university, gpaScore, skills, interest, displayImage = "", linkedIn = "", github = "" } = userInfo;
  const formatedSkills = skills ? skills.split(",") : [];
  const formatedInterests = interest ? interest.split(",") : [];
  console.log("state -->", state);
  const onCloseCropper = () => setState({ ...state, cropperVisibility: false });
  const onCropComplete = (cropValues: string) => setState({ ...state, cropValues: cropValues });
  const ExpandDrawerMarkup = () => {
    return (
      <>
        <div className="portfoliosSideBar">
          <DisplayImage imgSrc={displayImage} />
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
          <div style={{ display: "flex", marginTop: ".5rem" }}>
            {linkedIn && (
              <a href={linkedIn} target="_blank">
                <LinkedinOutlined translate style={{ color: "#0077b5", fontSize: 25, marginRight: ".75rem" }} />
              </a>
            )}
            {github && (
              <a href={github} target="_blank">
                <GithubOutlined translate style={{ color: "black", fontSize: 25 }} />
              </a>
            )}
          </div>
        </div>
        {/* {modalVisibility && ( */}
        <>
          <Formik
            initialValues={createInitalValues(userInfo)}
            validationSchema={updateUserDataFormValidatioSchema}
            enableReinitialize
            onSubmit={(values: FormFieldsType) => {
              const updateModalVisibility = () => setState({ ...state, modalVisibility: false });
              updateUserInfo({ data: { ...values, userName: userName }, dispatch: dispatcher, updateModalVisibility });
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
                  <div className="userUpdateForm">
                    <DisplayImage imgSrc={values.displayImage} />
                    <div className="controls">
                      <label className="custom-file-upload">
                        <input
                          type="file"
                          // key={file}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            const file = e.target.files && e.target.files[0];
                            const fileReader = new FileReader();
                            if (file && file.type && file.type.includes("image")) {
                              fileReader.readAsDataURL(file);
                              fileReader.onload = async (event: any): Promise<any> => {
                                if (file) {
                                  setFieldValue("displayImage", event.target.result);
                                  blobToBase64(file).then((res: any) => {
                                    setState({ ...state, imgSrc: res, cropperVisibility: true });
                                  });
                                }
                              };
                              setFieldValue("newDisplayImage", file);
                            }
                          }}
                          accept="image/*"
                        />
                        <span className="attach-text">
                          <span className="imgControl">
                            <strong>Upload Image</strong>
                          </span>
                        </span>
                      </label>
                      {values.displayImage && values.displayImage.length > 0 && (
                        <span
                          className="imgControl"
                          onClick={() => {
                            setFieldValue("displayImage", "");
                          }}
                        >
                          <strong>Delete Image</strong>
                        </span>
                      )}
                    </div>
                    <div className="fieldRow">
                      <FormikInputField name="newPassword" placeHolder="Enter new Password" password fieldLabel="Password" fieldWrapperStyle={{ width: "47%" }} />
                      <FormikInputField name="confirmPassword" placeHolder="Re enter new password" password fieldLabel="Confirm password" fieldWrapperStyle={{ width: "47%" }} />
                    </div>
                    <div className="fieldRow">
                      <FormikInputField name="phoneNumber" placeHolder="Phone number" fieldLabel="Phone number" fieldWrapperStyle={{ width: "47%" }} />
                      <FormikInputField name="degree" placeHolder="Enter Degree" fieldLabel="Degree" fieldWrapperStyle={{ width: "47%" }} />
                    </div>
                    <div className="fieldRow">
                      <FormikInputField name="university" placeHolder="Enter University" fieldLabel="University" fieldWrapperStyle={{ width: "47%" }} />
                      <FormikInputField name="gpa" placeHolder="Enter Score" fieldLabel="Score" fieldWrapperStyle={{ width: "47%" }} />
                    </div>
                    <div className="fieldRow">
                      <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="linkedInLink" placeHolder="Enter Linkedin link" fieldLabel="Linked in" />
                      <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="githubLink" placeHolder="Enter Github link" fieldLabel="Github" />
                    </div>
                    <FormikInputField name="skills" placeHolder="Enter coma separated skills" fieldLabel="Skills" />
                    <FormikInputField name="interests" placeHolder="Enter coma separated interests" fieldLabel="Interests" />
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
        </>
        {/* )} */}
      </>
    );
  };

  const CollapsedDrawerMarkup = () => {
    return (
      <div className="collapsedDrawrWrapper">
        <MenuUnfoldOutlined style={{ fontSize: 30 }} translate onClick={() => setState({ ...state, drawerVisibility: !state.drawerVisibility })} />
      </div>
    );
  };

  return (
    <>
      <div className="drawerHandle" onClick={() => setState({ ...state, drawerVisibility: !state.drawerVisibility })} style={{ left: `${state.drawerVisibility ? "256px" : "0px"}`, transition: "all 0.3s", zIndex: 1009, position: "fixed" }}>
        {state.drawerVisibility ? <ApplicationDrawertoggleInside /> : <ApplicationDrawertoggleOutside />}
      </div>
      <OverlayDrawer
        isOpen={state.drawerVisibility}
        handleClose={() => setState({ ...state, drawerVisibility: !state.drawerVisibility })}
        expandDrawerContent={<ExpandDrawerMarkup />}
        collapsedDrawerContent={<CollapsedDrawerMarkup />}
        collapsedDrawerWidth="60px"
        completeCollapse
        closeButton
        header={{ visibility: false, value: "" }}
        zIndex={1000}
      />
      <ImageCropper onCropComplete={onCropComplete} imgsrc={state.imgSrc} cropperVisibility={state.cropperVisibility} onCloseCropper={onCloseCropper} />
    </>
  );
};
