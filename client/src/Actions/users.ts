import { apiCall } from "../Utils/ApiCall";
import {SET_USER_INFO} from '../Components/Contexts/AppContext';

export const createUser =  (payload: any, dispatch: any) => {
    apiCall({url: "setUser", payload, 
      headers: {
        headers: {
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"
        }
      } 
    }).then((res) => {
      dispatch({
        type: SET_USER_INFO,
        payload: {
          userInfo: res
        }
      })
    });
}