import * as React from "react";
import { Upload, Button, Radio } from "antd/es";
import { Formik, FormikProps } from "formik";

import { createUser } from "../../Actions/users";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { AppHeading } from "../../Components/AppHeading/AppHeading";
import { FormikRadioGroup } from "../../Components/FormikRadioGroup/FormikRadioGroup";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FileUploader } from "../../Components/FileUploader/FileUploader";
import { signInFormValidatioSchema } from "./metaData";

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
  resume?: any;
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
  resume: null,
};

export const SignIn = () => {
  const { dispatcher } = useAppContext();
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInFormValidatioSchema}
      onSubmit={(values: FormFieldsType) => {
        const data = new FormData();
        data.append("file", values.resume);
        data.append("email", values.email);
        data.append("password", values.password);
        data.append("user_name", values.userName);
        data.append("phone_number", values.phoneNumber);
        data.append("degree", values.degree);
        data.append("university", values.university);
        data.append("score", values.gpa);
        data.append("skills", values.skills);
        data.append("interests", values.interests);
        createUser(data, dispatcher);
      }}
    >
      {({
        values,
        setFieldValue,
        resetForm,
        setFieldTouched,
        handleSubmit,
        errors,
        touched,
        dirty,
        isValid,
      }: FormikProps<FormFieldsType>) => {
        console.log("VALUES -->", values);

        return (
          <div className="signInForm">
            <div className="sectionConatinaer">
              <AppHeading text="Sign In" />
              <div className="fieldRow">
                <FormikInputField name="email" placeHolder="Enter email" />
                <FormikInputField
                  name="phoneNumber"
                  placeHolder="Enter Phone number"
                />
              </div>
              <div className="fieldRow">
                <FormikInputField name="userName" placeHolder="Username" />
                <div className="radioGroup">
                  <span className="label">Select Gender</span>
                  <FormikRadioGroup fields={radioButtons} name={"gender"} />
                </div>
              </div>
              <div className="fieldRow">
                <FormikInputField
                  name="password"
                  placeHolder="Enter password"
                />
                <FormikInputField
                  name="confirmPassword"
                  placeHolder="Confirm password"
                />
              </div>
            </div>
            <div className="sectionConatinaer">
              <AppHeading text="Portfolio Info" />
              <div className="fieldRow">
                <FormikInputField name="degree" placeHolder="Enter Degree" />
                <FormikInputField
                  name="university"
                  placeHolder="Enter University"
                />
              </div>
              <div className="fieldRow">
                <FormikInputField name="gpa" placeHolder="Enter Score" />
                <FormikInputField name="skills" placeHolder="Enter Skills" />
              </div>
              <div className="fieldRow">
                <FormikInputField
                  name="interests"
                  placeHolder="Enter Interestss"
                />
                <div className="fileUploader">
                  <FileUploader
                    onUpload={(file: any) => {
                      setFieldValue("resume", file);
                    }}
                    onDeleteFile={() => setFieldValue("resume", null)}
                  />
                </div>
              </div>
            </div>
            <PrimaryButton onClick={() => handleSubmit()} label="Submit Form" />
          </div>
        );
      }}
    </Formik>
  );
};
