import * as React from "react";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import { Formik, FormikProps } from "formik";
import { Modal, Tooltip } from "antd/es";

import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { FormikInputField } from "../FormikInputField/FormikInputField";
import { PortfolioCardType } from "../../Utils/Types";
import { deletePortfolioCard, updatePortfolioCard } from "../../Actions/portfoliosAction";
import { FileUploader } from "../FileUploader/FileUploader";
import { EmailPasswordFields } from "../EmailPasswordFields/EmailPasswordFields";
import { updateCardValidationSchema } from "./metaData";
import "./PortfolioCard.scss";

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

  const mouseHover = (boolValue: boolean) => setState({ ...state, hover: boolValue });

  const imgSrc = imgLink ? `http://localhost:3001${imgLink}` : `${process.env.PUBLIC_URL}/card-blank-slate.jpg`;

  const HoverContent = () => {
    return (
      <div className="hoverOverlay" onMouseEnter={() => mouseHover(true)} onMouseLeave={() => mouseHover(false)}>
        <div className="hoverChild">
          <div className="contentContainer">
            <div className="title">{name}</div>
            <Tooltip placement="right" title={description}>
              <Paragraph style={{ color: "white" }} ellipsis={{ rows: 7 }}>
                {description}
              </Paragraph>
            </Tooltip>
          </div>
          <div className="buttonsWrapper" onMouseEnter={() => mouseHover(true)}>
            <PrimaryButton
              label="Edit"
              onMouseEnter={() => mouseHover(true)}
              style={{ width: "100%", marginRight: "5px" }}
              mouseEnterCallback={() => setState({ ...state, hover: true })}
              onClick={(e: any) => {
                e.preventDefault();
                setState({ ...state, modalVisibility: true, hover: false });
              }}
            />
            <PrimaryButton
              label="delete"
              onMouseEnter={() => mouseHover(true)}
              style={{ width: "100%", marginLeft: "5px" }}
              mouseEnterCallback={() => mouseHover(true)}
              onClick={(e: any) => {
                e.preventDefault();
                deletePortfolioCard({ data: { id, userName }, dispatch: dispatcher });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`regularCard ${state.hover ? "cardHover" : ""}`}
        style={{
          borderRadius: 5,
          height: "250px",
          zIndex: 10,
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "100% 250px",
        }}
        onMouseEnter={() => mouseHover(true)}
      >
        {state.hover ? (
          url.length ? (
            <a href={url} target="_blank">
              <HoverContent />
            </a>
          ) : (
            <HoverContent />
          )
        ) : (
          <></>
        )}
      </div>
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
