import * as React from "react";
import Search from "antd/es/input/Search";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { Formik, FormikProps, FieldArray } from "formik";

import { AddCardModal } from "../../Components/AddCardModal/AddCardModal";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";

type PortfoliosContentHeaderType = {
  onCardSearch: (searchedString: string) => void;
};

type FormFieldsType = {
  name: string;
  description: string;
  link: string;
  image: Object;
};

export const PortfoliosContentHeader = (props: PortfoliosContentHeaderType) => {
  const { onCardSearch } = props;
  const [state, setState] = React.useState<{ modalVisibility: boolean }>({
    modalVisibility: false,
  });
  const { modalVisibility } = state;
  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: "15px" }}
        onClick={() => setState({ ...state, modalVisibility: true })}
      >
        Add Card
      </Button>
      <Search
        placeholder="Search you target"
        allowClear
        onSearch={onCardSearch}
        style={{ width: 200 }}
      />
      <Formik
        initialValues={{
          cards: [{ name: "", description: "", link: "", image: {} }],
        }}
        // validationSchema={changePasswordValidations}
        onSubmit={(values: { cards: FormFieldsType[] }) =>
          //   onSubmitForm(values, actions)
          console.log("--->", values)
        }
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
        }: FormikProps<any>) => {
          return (
            <Modal
              title="Add Card"
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
                        <AddCardModal
                          setFieldValue={setFieldValue}
                          index={index}
                        />
                      ))}
                      <PrimaryButton
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            description: "",
                            link: "",
                            image: {},
                          })
                        }
                        label="Add card"
                      />
                    </>
                  );
                }}
              />
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
