import { apiCall } from "../Utils/ApiCall";
import {SET_USER_INFO} from '../Components/Contexts/AppContext';
import { formatUserInfo } from "../Transformers/UsersTransformers";

export const createUser =  (payload: any, dispatch: any) => {
    return apiCall({url: "setUser", payload, 
      headers: {
        headers: {
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"
        }
      } 
    }).then((res) => {
      const formatedUser = formatUserInfo(res);

      dispatch({
        type: SET_USER_INFO,
        payload: {
          userInfo: formatedUser
        }
      })
      if(res.message) return res
      return formatedUser
    });
}