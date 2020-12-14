import { apiCall } from "../Utils/ApiCall";
import {SET_USER_INFO} from '../Components/Contexts/AppContext';
import { formatUserInfo } from "../Transformers/UsersTransformers";
import { jsonToFormData } from "../Utils/helpers";

export const createUser =  (payload: any, dispatch: any) => {
  const formData = jsonToFormData(payload);
    return apiCall({url: "user/setUser", payload: formData, 
      headers: {
        headers: {
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"
        }
      } 
    }).then((res) => {
      if(res) {
        const formatedUser = formatUserInfo(res);
        dispatch({
          type: SET_USER_INFO,
          payload: {
            userInfo: formatedUser
          }
        })
        if(res.message) return res
        return formatedUser
      }
    });
}