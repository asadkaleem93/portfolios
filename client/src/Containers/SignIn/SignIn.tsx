import * as React from "react";
import { useHistory } from "react-router-dom";
import { Formik, FormikProps } from "formik";

import { createUser } from "../../Actions/users";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { AppHeading } from "../../Components/AppHeading/AppHeading";
import { FormikRadioGroup } from "../../Components/FormikRadioGroup/FormikRadioGroup";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FileUploader } from "../../Components/FileUploader/FileUploader";
import { signInFormValidatioSchema } from "./metaData";
import { FormikTextAreaField } from "../../Components/FormikTextArea/FormikTextArea";

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
};

export const SignIn = () => {
  const { dispatcher } = useAppContext();
  const history = useHistory();
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
      onSubmit={(values: FormFieldsType, meta: any) => {
        const { setFieldError } = meta;
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
        data.append("gender", values.gender);
        data.append("interest", values.interests);
        data.append("describe_your_self", values.describeYourSelf);
        createUser(data, dispatcher).then((res: any) => {
          if (res.message && res.message === "User name already exists")
            setFieldError("userName", res.message);
          else if (res.message && res.message === "Email already exists")
            setFieldError("email", res.message);

          if (!res.message) history.push(`/portfolio/${values.userName}`);
        });
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
            <div className="sectionContainer">
              <AppHeading text="Sign In" />
              <div className="fieldRow">
                <FormikInputField name="email" placeHolder="Enter email" />
                <FormikInputField
                  name="phoneNumber"
                  placeHolder="Enter Phone number"
                />
              </div>

              <div className="fieldRow">
                <FormikInputField
                  name="password"
                  placeHolder="Enter password"
                  password
                />
                <FormikInputField
                  name="confirmPassword"
                  placeHolder="Confirm password"
                  password
                />
              </div>
              <div className="fieldRow">
                <FormikInputField name="userName" placeHolder="Username" />
                <div className="radioGroup">
                  <span className="label">Select Gender</span>
                  <FormikRadioGroup fields={radioButtons} name={"gender"} />
                </div>
              </div>
            </div>
            <div className="sectionContainer">
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
                <FormikInputField
                  name="skills"
                  placeHolder="Enter coma separated skills"
                />
              </div>
              <div className="fieldRow">
                <FormikInputField
                  name="interests"
                  placeHolder="Enter coma separated interests"
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
              <FormikTextAreaField
                name="describeYourSelf"
                placeHolder="Describe Your Self"
              />
            </div>
            <PrimaryButton onClick={() => handleSubmit()} label="Submit Form" />
          </div>
        );
      }}
    </Formik>
  );
};
