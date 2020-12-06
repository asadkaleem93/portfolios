import * as React from "react";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Formik, FormikProps } from "formik";
import { Modal } from "antd/es";

import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { FormikInputField } from "../FormikInputField/FormikInputField";
import { PortfolioCardType } from "../../Utils/Types";
import { deletePortfolioCard, updatePortfolioCard } from "../../Actions/portfoliosAction";
import { jsonToFormData } from "../../Utils/helpers";
import { FileUploader } from "../FileUploader/FileUploader";
import { EmailPasswordFields } from "../EmailPasswordFields/EmailPasswordFields";

const { Meta } = Card;
const { Paragraph } = Typography;

type FormFieldsType = {
  name: string;
  description: string;
  url: string;
  imgLink: string;
  userName: string;
  image: any;
  email: string;
  password: string;
};

export const PortfolioCard = (props: { card: PortfolioCardType; dispatcher: any }) => {
  const { card, dispatcher } = props;
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
        <span>
          <DeleteOutlined
            onClick={(e: any) => {
              e.preventDefault();
              deletePortfolioCard({ data: { id, userName }, dispatch: dispatcher });
            }}
            translate
          />
          <EditOutlined
            onClick={(e: any) => {
              e.preventDefault();
              setState({ ...state, modalVisibility: true });
            }}
            translate
          />
        </span>
      </div>
    );
  };

  return (
    <>
      <Card hoverable cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" height="150px" />}>
        <Meta title={<CardTitle name={name} />} description={<Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>} />
      </Card>
      <Formik
        initialValues={{
          id,
          name,
          description,
          url,
          imgLink,
          userName,
          image: null,
          email: "",
          password: "",
        }}
        // validationSchema={addCardValidationSchema}
        onSubmit={(values: PortfolioCardType) => {
          const formatedFormData = jsonToFormData(values);
          updatePortfolioCard({ data: values, dispatch: dispatcher });
        }}
      >
        {({ values, touched, setFieldValue, resetForm, setFieldTouched, handleSubmit, errors, dirty, isValid }: FormikProps<FormFieldsType>) => {
          console.log("values.imgLink -->", values.imgLink);
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
              <FileUploader
                onUpload={(file: any) => {
                  setFieldValue("image", file);
                }}
                onDeleteFile={() => {
                  setFieldValue("image", null);
                }}
                imgSrc={values.imgLink}
                fileType="img"
              />
              {/* <FormikInputField name="userName" placeHolder="User name" /> */}
              <EmailPasswordFields />

              <PrimaryButton label="Submit Card" onClick={() => handleSubmit()} />
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
