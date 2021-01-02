import * as React from "react";
import { useHistory } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import Cropper from "react-easy-crop";

import { createUser } from "../../Actions/usersActions";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { AppHeading } from "../../Components/AppHeading/AppHeading";
import { FormikRadioGroup } from "../../Components/FormikRadioGroup/FormikRadioGroup";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FileUploader } from "../../Components/FileUploader/FileUploader";
import { signInFormValidatioSchema } from "./metaData";
import { FormikTextAreaField } from "../../Components/FormikTextArea/FormikTextArea";
import { blobToBase64, getCroppedImg } from "../../Utils/helpers";
import { ImageCropper } from "../../Components/ImageCropper/ImageCropper";

type FormFieldsType = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  phoneNumber: string;
  degree: string;
  university: string;
  gpa: string;
  skills: string;
  interests: string;
  gender: string;
  describeYourSelf: string;
  resume?: any;
  displayImage?: any;
  linkedInLink: string;
  githubLink: string;
};

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  phoneNumber: "",
  degree: "",
  gender: "male",
  university: "",
  gpa: "",
  skills: "",
  interests: "",
  describeYourSelf: "",
  resume: null,
  linkedInLink: "",
  githubLink: "",
  displayImage: null,
};

export const SignIn = () => {
  const { dispatcher } = useAppContext();
  const history = useHistory();
  const [state, setState] = React.useState({ cropperVisibility: false, imgSrc: "", cropValues: "" });
  const radioButtons = React.useMemo(
    () => [
      {
        value: "male",
        label: "Male",
      },
      {
        value: "female",
        label: "Female",
      },
    ],
    [],
  );
  const onCloseCropper = () => setState({ ...state, cropperVisibility: false });
  const onCropComplete = (cropValues: string) => setState({ ...state, cropValues: cropValues });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signInFormValidatioSchema}
        onSubmit={(values: FormFieldsType, meta: any) => {
          const { setFieldError } = meta;
          createUser({ ...values, cropValues: state.cropValues }, dispatcher).then((res: any) => {
            if (res) {
              if (res.message && res.message === "User name already exists") setFieldError("userName", res.message);
              else if (res.message && res.message === "Email already exists") setFieldError("email", res.message);

              if (!res.message) history.push(`/portfolio/${values.userName}`);
            }
          });
        }}
      >
        {({ setFieldValue, handleSubmit }: FormikProps<FormFieldsType>) => {
          return (
            <div className="signInForm">
              <div className="sectionContainer">
                <AppHeading text="Sign In" />
                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="email" placeHolder="Enter email" fieldLabel="Email" />
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="phoneNumber" placeHolder="Enter Phone number" fieldLabel="Phone number" />
                </div>

                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="password" placeHolder="Enter password" password fieldLabel="Password" />
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="confirmPassword" placeHolder="Confirm password" password fieldLabel="Confirm password" />
                </div>
                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="userName" placeHolder="Username" fieldLabel="User name" />
                  <div className="radioGroup">
                    <div> </div>
                    <span className="label">Select Gender</span>
                    <FormikRadioGroup fields={radioButtons} name={"gender"} />
                  </div>
                </div>
                <div className="fieldRow">
                  <div className="fileUploader">
                    <FileUploader
                      onUpload={(file: any) => {
                        setFieldValue(`displayImage`, file);
                        blobToBase64(file).then((res: any) => {
                          setState({ ...state, imgSrc: res, cropperVisibility: true });
                        });
                      }}
                      onDeleteFile={() => setFieldValue(`displayImage`, null)}
                      fileType="img"
                      buttonText="Upload Profile Picture"
                    />
                  </div>
                </div>
              </div>
              <div className="sectionContainer">
                <AppHeading text="Portfolio Info" />
                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="degree" placeHolder="Enter Degree" fieldLabel="Degree" />
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="university" placeHolder="Enter University" fieldLabel="University" />
                </div>
                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="gpa" placeHolder="Enter Score" fieldLabel="Score" />
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="skills" placeHolder="Enter coma separated skills" fieldLabel="Skills" />
                </div>
                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="linkedInLink" placeHolder="Enter Linkedin link" fieldLabel="Linked in" />
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="githubLink" placeHolder="Enter Github link" fieldLabel="Github" />
                </div>
                <div className="fieldRow">
                  <FormikInputField fieldWrapperStyle={{ width: "47%" }} name="interests" placeHolder="Enter coma separated interests" fieldLabel="Interests" />
                  <div className="fileUploader">
                    <FileUploader
                      onUpload={(file: any) => {
                        setFieldValue("resume", file);
                      }}
                      onDeleteFile={() => setFieldValue("resume", null)}
                    />
                  </div>
                </div>
                <FormikTextAreaField name="describeYourSelf" placeHolder="Describe Your Self" />
              </div>
              <PrimaryButton onClick={() => handleSubmit()} label="Submit Form" />
            </div>
          );
        }}
      </Formik>
      <ImageCropper onCropComplete={onCropComplete} imgsrc={state.imgSrc} cropperVisibility={state.cropperVisibility} onCloseCropper={onCloseCropper} />
    </>
  );
};
