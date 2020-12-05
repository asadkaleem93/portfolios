import * as React from "react";
import Search from "antd/es/input/Search";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { Formik, FormikProps, FieldArray } from "formik";

import { AddCardModal } from "../../Components/AddCardModal/AddCardModal";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { addCardValidationSchema } from "./metadata";
import { AppContext, useAppContext } from "../../Components/Contexts/AppContext";
import { setPortfolioCards } from "../../Actions/portfolios";
import { jsonToFormData } from "../../Components/Utils/helpers";

type PortfoliosContentHeaderType = {
  onCardSearch: (searchedString: string) => void;
  userName: string;
};

type FormFieldsType = {
  name: string;
  description: string;
  link: string;
  image: any;
};

export const PortfoliosContentHeader = (props: PortfoliosContentHeaderType) => {
  const { onCardSearch, userName } = props;
  const [state, setState] = React.useState<{ modalVisibility: boolean }>({
    modalVisibility: false,
  });
  const { modalVisibility } = state;
  const { dispatcher } = useAppContext();
  return (
    <>
      <Button type="primary" style={{ marginRight: "15px" }} onClick={() => setState({ ...state, modalVisibility: true })}>
        Add Cards
      </Button>
      <Search placeholder="Search you target" allowClear onSearch={onCardSearch} style={{ width: 200 }} />
      <Formik
        initialValues={{
          cards: [{ name: "", description: "", link: "", image: null }],
          userInfo: { email: "", password: "" },
        }}
        validationSchema={addCardValidationSchema}
        onSubmit={(values: { cards: FormFieldsType[]; userInfo: { email: string; password: string } }) => {
          setPortfolioCards({
            data: jsonToFormData({ ...values, userInfo: { ...values.userInfo, user_name: userName } }),
            dispatch: dispatcher,
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
        }: FormikProps<{
          cards: FormFieldsType[];
          userInfo: { email: string; password: string };
        }>) => {
          return (
            <Modal
              title="Add Cards"
              visible={modalVisibility}
              onOk={() => setState({ ...state, modalVisibility: false })}
              onCancel={() => {
                setState({ ...state, modalVisibility: !modalVisibility });
                resetForm();
              }}
            >
              <FieldArray
                name="cards"
                render={(arrayHelpers) => {
                  return (
                    <>
                      {values.cards.map((card, index) => (
                        <AddCardModal setFieldValue={setFieldValue} index={index} />
                      ))}
                      <PrimaryButton
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            description: "",
                            link: "",
                            image: null,
                          })
                        }
                        label="Add card"
                      />
                    </>
                  );
                }}
              />
              <div style={{ marginTop: "35px" }}>
                <FormikInputField name="userInfo.email" placeHolder="Email" />
                <FormikInputField name="userInfo.password" placeHolder="password" password />
              </div>
              <PrimaryButton label="Submit Cards" onClick={() => handleSubmit()} />
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
