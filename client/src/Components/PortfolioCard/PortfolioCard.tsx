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
import { FileUploader } from "../FileUploader/FileUploader";
import { EmailPasswordFields } from "../EmailPasswordFields/EmailPasswordFields";
import { updateCardValidationSchema } from "./metaData";
import "./PortfolioCard.scss";

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
  const [state, setState] = React.useState<{ modalVisibility: boolean; hover: boolean }>({
    modalVisibility: false,
    hover: false,
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
  const imgSrc = imgLink ? `http://localhost:3001${imgLink}` : `${process.env.PUBLIC_URL}/card-blank-slate.jpg`;
  return (
    <>
      {/* {state.hover && ( */}
      <div
        className={`regularCard ${state.hover ? "cardHover" : ""}`}
        style={{
          // width: "100%",
          borderRadius: 5,
          height: "250px",
          // backgroundColor: "black",
          zIndex: 10,
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "100% 250px",
        }}
        onMouseEnter={() => {
          console.log("ENTER");
          setState({ ...state, hover: true });
        }}
        // onMouseOut={() => {
        //   console.log("OUT");
        //   setState({ ...state, hover: false });
        // }}
      >
        {/* <img className={`regularImage ${state.hover ? "hoveredImage" : ""}`} alt="example" src={imgSrc} width="100%" height="250px" style={{}} /> */}
        {/* {state.hover && ( */}
          <div
            className="hoverOverlay"
            style={{ color: "white", height: "100%", backgroundColor: "rgba(0,0,0,.7)" }}
            onMouseOut={() => {
              console.log("OUT");
              setState({ ...state, hover: false });
            }}
          >
            <div className="hoverChild" style={{ padding: "1rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div
                onMouseEnter={() => {
                  setState({ ...state, hover: true });
                }}
                style={{ height: "100%" }}
              >
                {description}
                {/* <Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph> */}
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                onMouseEnter={() => {
                  setState({ ...state, hover: true });
                }}
              >
                <PrimaryButton
                  label="Edit"
                  onMouseEnter={() => {
                    setState({ ...state, hover: true });
                  }}
                  style={{width: "100%", marginRight: "5px"}}
                />
                <PrimaryButton
                  label="delete"
                  onMouseEnter={() => {
                    setState({ ...state, hover: true });
                  }}
                  style={{width: "100%", marginLeft: "5px"}}
                />
              </div>
            </div>
          </div>
        // )}
      </div>
      {/* )} */}
      {/* {!state.hover && (
      )} */}
      {/* <Card hoverable cover={<img alt="example" src={imgSrc} width="100%" height="150px" />} onMouseEnter={() => setState({ ...state, hover: true })}>
        <Meta title={<CardTitle name={name} />} description={<Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>} />
      </Card> */}
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
        validationSchema={updateCardValidationSchema}
        onSubmit={(values: PortfolioCardType) => {
          const updateModalVisibility = () => setState({ ...state, modalVisibility: false });
          updatePortfolioCard({ data: values, dispatch: dispatcher, updateModalVisibility });
        }}
      >
        {({ values, setFieldValue, resetForm, handleSubmit }: FormikProps<FormFieldsType>) => {
          return (
            <Modal
              title="Edit Card"
              visible={modalVisibility}
              // onOk={() => setState({ ...state, modalVisibility: false })}
              onCancel={() => {
                setState({ ...state, modalVisibility: !modalVisibility });
                resetForm();
              }}
              footer={[]}
            >
              <FormikInputField name="name" placeHolder="Title" fieldLabel="Name" />
              <FormikInputField name="description" placeHolder="Description" fieldLabel="Description" />
              <FormikInputField name="url" placeHolder="Url" fieldLabel="External link" />
              <FileUploader
                onUpload={(file: any) => {
                  setFieldValue("image", file);
                }}
                onDeleteFile={() => {
                  setFieldValue("image", null);
                  setFieldValue("imgLink", "");
                }}
                imgSrc={values.imgLink}
                fileType="img"
              />
              <EmailPasswordFields />

              <PrimaryButton label="Submit Card" onClick={() => handleSubmit()} />
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
