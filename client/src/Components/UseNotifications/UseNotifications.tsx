// lib
import * as React from "react";
import { notification } from "antd/es";
import { ConfigProps, NotificationApi, ArgsProps } from "antd/lib/notification";
import {
  InfoCircleFilled,
  ExclamationCircleFilled,
  CheckCircleFilled,
  StopFilled,
} from "@ant-design/icons";

const icons = {
  //@ts-ignore
  info: <InfoCircleFilled />,
  //@ts-ignore
  warning: <ExclamationCircleFilled />,
  //@ts-ignore
  success: <CheckCircleFilled />,
  //@ts-ignore
  error: <StopFilled />,
};

// message is required in ArgsProps, that is why props is an empty object and types are set when we extract data from props,
// so that if we dont send any thing it shows error of something went wrong.
export const PushNotification = (props = {}): void => {
  const {
    message = `Your request could not be processed at this time. Please try again. In case the issue persists, kindly contact the Phoenix support team.`,
    description = "",
    type = "error",
    duration = 5,
  } = props as ArgsProps & ConfigProps & NotificationApi;
  notification[type]({
    icon: icons[type],
    message,
    description,
    placement: "topRight",
    duration,
    top: 130,
    className: `ant-notification-notice ${type}`,
  });
};
