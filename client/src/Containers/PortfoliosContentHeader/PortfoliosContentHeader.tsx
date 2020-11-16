import * as React from "react";
import Search from "antd/es/input/Search";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { Formik, FormikProps } from "formik";

import { AddCardModal } from "../../Components/AddCardModal/AddCardModal";

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
          name: "",
          description: "",
          link: "",
          image: {},
        }}
        // validationSchema={changePasswordValidations}
        onSubmit={(values: FormFieldsType) =>
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
        }: FormikProps<FormFieldsType>) => {
          console.log("Values -->", values);
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
              <AddCardModal setFieldValue={setFieldValue} />
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
