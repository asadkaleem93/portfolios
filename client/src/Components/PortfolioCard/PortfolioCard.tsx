import * as React from "react";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import { EditFilled } from "@ant-design/icons";
import { Formik, FormikProps } from "formik";
import { Modal } from "antd/es";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { FormikInputField } from "../FormikInputField/FormikInputField";
import { PortfolioCardType } from "../../Utils/Types";

const { Meta } = Card;
const { Paragraph } = Typography;

type FormFieldsType = {
  name: string;
  description: string;
  url: string;
  imgLink: string;
  userName: string;
};

export const PortfolioCard = (props: { card: PortfolioCardType }) => {
  const { card } = props;
  const { name, description, id, userName, imgLink, url } = card;
  const [state, setState] = React.useState<{ modalVisibility: boolean }>({
    modalVisibility: false,
  });
  const { modalVisibility } = state;

  const CardTitle = (props: { name: string }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{props.name}</span>
        <EditFilled
          onClick={(e: any) => {
            e.preventDefault();
            setState({ ...state, modalVisibility: true });
          }}
          translate
        />
      </div>
    );
  };

  return (
    <>
      <Card
        hoverable
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            height="150px"
          />
        }
      >
        <Meta
          title={<CardTitle name={name} />}
          description={
            <Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>
          }
        />
      </Card>
      <Formik
        initialValues={{
          id,
          name,
          description,
          url,
          imgLink,
          userName,
        }}
        // validationSchema={addCardValidationSchema}
        onSubmit={(values: PortfolioCardType) =>
          //   onSubmitForm(values, actions)
          console.log("--->", values)
        }
      >
        {({
          values,
          touched,
          setFieldValue,
          resetForm,
          setFieldTouched,
          handleSubmit,
          errors,
          dirty,
          isValid,
        }: FormikProps<FormFieldsType>) => {
          return (
            <Modal
              title="Edit Card"
              visible={modalVisibility}
              onOk={() => setState({ ...state, modalVisibility: false })}
              onCancel={() => {
                setState({ ...state, modalVisibility: !modalVisibility });
                resetForm();
              }}
            >
              <FormikInputField name="name" placeHolder="Title" />
              <FormikInputField name="description" placeHolder="Description" />
              <FormikInputField name="url" placeHolder="Url" />
              {/* <FormikInputField name="imgLink" placeHolder="ImgLink" /> */}
              <FormikInputField name="userName" placeHolder="User name" />

              <PrimaryButton
                label="Submit Card"
                onClick={() => handleSubmit()}
              />
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
