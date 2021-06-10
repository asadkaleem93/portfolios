import * as React from "react";
import { Formik, FormikProps } from "formik";
import { Modal } from "antd/es";

import { useAppContext } from "../../Components/Contexts/AppContext";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { FormikTextAreaField } from "../../Components/FormikTextArea/FormikTextArea";
import { FileUploader } from "../../Components/FileUploader/FileUploader";
import { EmailPasswordFields } from "../../Components/EmailPasswordFields/EmailPasswordFields";
import { updateUserDataFormValidatioSchema } from "./metadata";
import { updateUserInfo } from "../../Actions/usersActions";
import { DisplayImage } from "../../Components/DisplayImage/DisplayImage";

import { ImageCropper } from "../../Components/ImageCropper/ImageCropper";
import { blobToBase64, getCroppedImg } from "../../Utils/helpers";
import { apiUrl } from "../../Utils/AppConstants";

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
  };
};

export const UserInfoUpdate = (props: { userName: string }) => {
  const { userName } = props;
  const { state: appState, dispatcher } = useAppContext();
  const { userInfo } = appState;
  const [state, setState] = React.useState<{ modalVisibility: boolean; cropperVisibility: boolean; imgSrc: string; cropValues: string }>({
    modalVisibility: false,
    cropperVisibility: false,
    cropValues: userInfo.cropValues || "",
    imgSrc: "",
  });
  React.useEffect(() => {
    const croppedImage = async () => {
      const file = await getCroppedImg(`${apiUrl}${userInfo.displayImage}`, JSON.parse(state.cropValues));
      blobToBase64(file).then((res: any) => {
        setState({ ...state, imgSrc: res });
      });
    };

    if (userInfo.displayImage) croppedImage();
  }, [userInfo.displayImage]);

  const { modalVisibility } = state;
  const initialValues = React.useCallback(() => createInitalValues(userInfo), []);

  const onCloseCropper = () => setState({ ...state, cropperVisibility: false, modalVisibility: true });
  const onCropComplete = (cropValues: string) => setState({ ...state, cropValues: cropValues });
  const BEUrl = apiUrl.substring(0, apiUrl.length - 1);

  return (
    <>
      <>
        <PrimaryButton
          label="Update user info"
          onClick={() => {
            setState({ ...state, modalVisibility: true });
          }}
          style={{ padding: "5px", width: "150px" }}
        />
        <Modal
          title="Edit user info"
          visible={modalVisibility}
          // onOk={() => setState({ ...state, modalVisibility: false })}
          onCancel={() => {
            setState({ ...state, modalVisibility: false });
          }}
          footer={[]}
        >
          <Formik
            initialValues={initialValues()}
            validationSchema={updateUserDataFormValidatioSchema}
            onSubmit={async (values: any) => {
              const updateModalVisibility = () => {};
              const resp = await updateUserInfo({ data: { ...values, userName: userName, cropValues: state.cropValues }, dispatch: dispatcher, updateModalVisibility });
              if (resp) setState({ ...state, modalVisibility: false });
            }}
          >
            {({ setFieldValue, handleSubmit, values }: FormikProps<FormFieldsType>) => {
              return (
                <div className="userUpdateForm">
                  <DisplayImage imgSrc={state.imgSrc} actualImage={userInfo.displayImage} />
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
                            fileReader.onload = (event: any): any => {
                              if (file) {
                                // setFieldValue("displayImage", event.target.result);
                                // setState({ ...state, imgSrc: "event.target.result" });
                                setFieldValue("newDisplayImage", file);
                                blobToBase64(file).then(async (res: any) => {
                                  setState({ ...state, imgSrc: res, cropperVisibility: true });
                                });
                              }
                            };
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
                    {state.imgSrc && state.imgSrc.length > 0 && (
                      <span
                        className="imgControl"
                        onClick={() => {
                          setFieldValue("displayImage", "");
                          setState({ ...state, imgSrc: "" });
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
                      <a className="downloadAnchor" href={`${BEUrl}${userInfo.resume}`} download>
                        Download Resume
                      </a>
                    )}
                  </div>
                  <EmailPasswordFields />
                  <PrimaryButton onClick={() => handleSubmit()} label="Submit Form" />
                </div>
              );
            }}
          </Formik>
        </Modal>
      </>
      <ImageCropper onCropComplete={onCropComplete} imgsrc={state.imgSrc} cropperVisibility={state.cropperVisibility} onCloseCropper={onCloseCropper} />
    </>
  );
};
