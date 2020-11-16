// lib
import * as React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Button from "antd/lib/button";
import Upload from "antd/lib/upload";
import { FormComponentProps } from "antd/es/form";

// src
import { formSections, ownerImgType } from "./Types";
import { uniqueValuesFromArray } from "../../../Utils/helpers";
import { uploadImages } from "../../../../Actions/Blogs";

interface IProps extends FormComponentProps {
  onAddBlog: () => void;
  onCreateBlogger: (e: any) => void;
  blogSection: formSections[];
  blogSectionRef: any;
  onSaveOwnerImgLink: (link: string) => void;
  onSaveSectionImgLink: (sectionId: string, link: string) => void;
  ownerImg: string;
}

const CreatePortfolioInner = (props: IProps) => {
  const {
    onAddBlog,
    onCreateBlogger,
    form,
    blogSection,
    blogSectionRef,
    onSaveOwnerImgLink,
    ownerImg,
    onSaveSectionImgLink
  } = props;
  const { getFieldDecorator, getFieldsValue, validateFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const keys = [];
        const keysIds: string[] = [];
        Object.entries(values).forEach(([key, value]) => {
          if (key.includes("-")) {
            const keys = key.split("-");
            keysIds.push(keys.slice(-1)[0]);
          }
        });
        const objects = uniqueValuesFromArray(keysIds).map(uniqueKey => {
          let obj = {};
          Object.entries(values).forEach(([key, value]) => {
            if (key.includes("-")) {
              const keys = key.split("-");
              keysIds.push(keys.slice(-1)[0]);
              if (uniqueKey === keys.slice(-1)[0]) {
                const keys = key.split("-");
                const keyName =
                  keys.slice(0)[0] === "blogName"
                    ? "blog_name"
                    : keys.slice(0)[0] === "blogDescription"
                    ? "blog_description"
                    : keys.slice(0)[0] === "blogLink"
                    ? "blog_link"
                    : keys.slice(0)[0] === "blogImg"
                    ? "blog_img"
                    : "";
                const keysArray = key.split("-");
                const sectionId = keysArray.slice(-2)[0].concat(`-${keysArray.slice(-1)[0]}`);
                const stateSection = blogSection.find(obj => obj.id === sectionId);
                obj =
                  keyName === "blog_img"
                    ? { ...obj, blog_img: stateSection && stateSection.image }
                    : { ...obj, [keyName]: value || "" };
              }
            }
          });
          return obj;
        });
        const finalObj = {
          owner_name: values.ownerName,
          owner_email: values.ownerEmail,
          owner_password: values.ownerPassword,
          owner_img: ownerImg,
          blogs: [...objects]
        };
        onCreateBlogger(finalObj);
      }
    });
  };
  const uploadImage = (e: any) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="create-blog-portfolio-wrapper">
      <div className="sections-wrapper">
        <Form {...formItemLayout} onSubmit={handleSubmit} ref={blogSectionRef}>
          <Form.Item {...formItemLayout} label="Owner Name">
            {getFieldDecorator("ownerName", {
              rules: [
                {
                  required: true,
                  message: "Please input your name"
                }
              ]
            })(<Input placeholder="Please input your name" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Email Address">
            {getFieldDecorator("ownerEmail", {
              rules: [
                {
                  required: true,
                  message: "Please input your Email address"
                }
              ]
            })(<Input placeholder="Please input your Email address" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Password">
            {getFieldDecorator("ownerPassword", {
              rules: [
                {
                  required: true,
                  message: "Please input your password"
                }
              ]
            })(<Input placeholder="Please input your password" />)}
          </Form.Item>
          <Form.Item label="Owner Image">
            {getFieldDecorator("ownerUploadedImg", {
              valuePropName: "fileList",
              getValueFromEvent: uploadImage
            })(
              <Upload
                name="logo"
                // action="http://localhost:3001/uploadImages"
                accept="image/*"
                customRequest={(options: any) => {
                  const data = new FormData();
                  data.append("file", options.file);
                  uploadImages(data)
                    .then((res: any) => {
                      console.log("RES -->", res);
                      onSaveOwnerImgLink(res.data);
                      options.onSuccess(res.data, options.file);
                    })
                    .catch((err: Error) => {
                      console.log(err);
                    });
                }}
                onRemove={() => onSaveOwnerImgLink("")}
                listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>
          <div className="create-blog-form-wrapper">
            {blogSection.length > 0 ? (
              blogSection.map(obj => (
                <div className="create-blog-single-form" key={obj.id}>
                  <Form.Item label="Blog Name">
                    {getFieldDecorator(`blogName-${obj.id}`, {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Blog name"
                        }
                      ]
                    })(<Input placeholder="Please input your Blog name" />)}
                  </Form.Item>
                  <Form.Item label="Blog Description">
                    {getFieldDecorator(`blogDescription-${obj.id}`, {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Blog descritpion"
                        }
                      ]
                    })(<Input placeholder="Please input your Blog Description" />)}
                  </Form.Item>
                  <Form.Item label="Blog Link">
                    {getFieldDecorator(`blogLink-${obj.id}`, {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Blog Link"
                        }
                      ]
                    })(<Input placeholder="Please input your Blog Link" />)}
                  </Form.Item>
                  <Form.Item label="Blog Image">
                    {getFieldDecorator(`blogImg-${obj.id}`, {
                      valuePropName: "blogImage",
                      getValueFromEvent: uploadImage
                    })(
                      <Upload
                        name="blogImage"
                        accept="image/*"
                        listType="picture"
                        customRequest={(options: any) => {
                          const data = new FormData();
                          data.append("file", options.file);
                          uploadImages(data)
                            .then((res: any) => {
                              console.log("RES -->", res);
                              onSaveSectionImgLink(obj.id, res.data);
                              // onSaveOwnerImgLink(res.data);
                              options.onSuccess(res.data, options.file);
                            })
                            .catch((err: Error) => {
                              console.log(err);
                            });
                        }}
                        // onRemove={() => onSaveOwnerImgLink("")}
                      >
                        <Button>
                          <Icon type="upload" /> Click to upload
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </div>
              ))
            ) : (
              <React.Fragment />
            )}
          </div>
          <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
              Submit
            </Button>
            <Button type="primary" onClick={onAddBlog}>
              Add form
            </Button>
          </Form.Item>
          {/* <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
          </Form.Item> */}
          <div className="blogs-form-section-wrapper"></div>
        </Form>
      </div>
    </div>
  );
};

export default Form.create<IProps>()(CreatePortfolioInner);
