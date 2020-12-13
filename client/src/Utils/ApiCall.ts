import Axios from "axios";
import { PushNotification } from "../Components/UseNotifications/UseNotifications";
import { apiUrl } from "./AppConstants";

export const apiCall = (props: {
  apiType?: "get" | "post" | "delete" | "put";
  url: string;
  payload: any;
  headers?: any;
}) => {
  const {apiType = "post", url, payload, headers = {}} = props;
    return Axios({
        method: apiType,
        url: `${apiUrl}${url}`,
        data: payload,
        ...headers
      }).then((res) => {
        if (res.data.data ) {
          return res.data.data;
        }
        else if (res.data.error && res.data.error.length > 0) {
          PushNotification({
            message: res.data.error,
          });
        }
      });
}