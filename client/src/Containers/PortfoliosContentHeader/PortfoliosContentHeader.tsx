import * as React from "react";
import Search from "antd/es/input/Search";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { Formik, FormikProps, FieldArray } from "formik";

import { AddCardModal } from "../../Components/AddCardModal/AddCardModal";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { addCardValidationSchema } from "./metadata";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { setPortfolioCards } from "../../Actions/portfoliosAction";
import { jsonToFormData } from "../../Utils/helpers";
import { SearchBar } from "../../Components/SearchBar/SearchBar";

type PortfoliosContentHeaderType = {
  onCardSearch: (searchedString: string) => void;
  userName: string;
};

type FormFieldsType = {
  name: string;
  description: string;
  url: string;
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
      <SearchBar placeHolder="Search you target" onCardSearch={onCardSearch} />
      <Formik
        initialValues={{
          cards: [{ name: "", description: "", url: "", image: null }],
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
          handleSubmit,
        }: FormikProps<{
          cards: FormFieldsType[];
          userInfo: { email: string; password: string };
        }>) => {
          return (
            <Modal
              title="Add Cards"
              visible={modalVisibility}
              // onOk={() => setState({ ...state, modalVisibility: false })}
              onCancel={() => {
                setState({ ...state, modalVisibility: !modalVisibility });
                resetForm();
              }}
              footer={[]}
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
                            url: "",
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
