import * as React from "react";
import Search from "antd/es/input/Search";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { Formik, FormikProps, FieldArray } from "formik";
import { useHistory } from "react-router-dom";

import { AddCardModal } from "../../Components/AddCardModal/AddCardModal";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { FormikInputField } from "../../Components/FormikInputField/FormikInputField";
import { addCardValidationSchema } from "./metadata";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { setPortfolioCards } from "../../Actions/portfoliosAction";
import { jsonToFormData } from "../../Utils/helpers";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { UserInfoUpdate } from "./UserInfoUpdate";

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
  const [state, setState] = React.useState<{ cardModalVisibility: boolean }>({
    cardModalVisibility: false,
  });
  const { cardModalVisibility } = state;
  const { dispatcher } = useAppContext();
  const history = useHistory();
  return (
    <>
      <PrimaryButton style={{ marginLeft: "15px", marginRight: "15px" }} onClick={() => history.push("/")} label="Create you account" />
      <UserInfoUpdate userName={userName} />
      <PrimaryButton style={{ marginLeft: "15px", marginRight: "15px" }} onClick={() => setState({ ...state, cardModalVisibility: true })} label="Add Cards" />

      <SearchBar placeHolder="Search you target" onCardSearch={onCardSearch} />
      {cardModalVisibility && (
        <Formik
          initialValues={{
            cards: [{ name: "", description: "", url: "", image: null }],
            userInfo: { email: "", password: "" },
          }}
          validationSchema={addCardValidationSchema}
          onSubmit={(values: { cards: FormFieldsType[]; userInfo: { email: string; password: string } }) => {
            const updateModalVisibility = () => setState({ cardModalVisibility: false });
            setPortfolioCards({
              data: jsonToFormData({ ...values, userInfo: { ...values.userInfo, user_name: userName } }),
              dispatch: dispatcher,
              updateModalVisibility,
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
                visible={cardModalVisibility}
                // onOk={() => setState({ ...state, cardModalVisibility: false })}
                onCancel={() => {
                  setState({ ...state, cardModalVisibility: !cardModalVisibility });
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
                  <FormikInputField name="userInfo.email" placeHolder="Email" fieldLabel="Email" />
                  <FormikInputField name="userInfo.password" placeHolder="password" password fieldLabel="Password" />
                </div>
                <PrimaryButton label="Submit Cards" onClick={() => handleSubmit()} style={{ width: "100%" }} />
              </Modal>
            );
          }}
        </Formik>
      )}
    </>
  );
};
