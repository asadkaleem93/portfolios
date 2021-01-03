import { ApiCall } from "../Utils/ApiCall";
import {SET_USER_INFO, UPDATE_LOADER, UPDATE_USER_INFO} from '../Components/Contexts/AppContext';
import { formatUserInfo } from "../Transformers/UsersTransformers";
import { jsonToFormData } from "../Utils/helpers";
import { formatPortfolios } from "../Transformers/PortfoliosTransformers";

export const createUser =  (payload: any, dispatch: any) => {
  const formData = jsonToFormData(payload);
    return ApiCall({url: "user/setUser", payload: formData, 
      headers: {
        headers: {
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"
        }
      } 
    }).then((res) => {

      dispatch({
        type: UPDATE_LOADER,
        payload: true
      })
      if(res) {
        const formatedUser = formatUserInfo(res);
        dispatch({
          type: SET_USER_INFO,
          payload: {
            userInfo: formatedUser,
          }
        })
        if(res.message) return res
        return formatedUser
      }
          
      dispatch({
        type: UPDATE_LOADER,
        payload: false
      })
    });
}


export const updateUserInfo = (props: {
  data: any;
  dispatch: any;
  updateModalVisibility: () => void
}) => {
  const {data, dispatch, updateModalVisibility} = props;
  const formData = jsonToFormData(data);
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  })
  return ApiCall({url: "user/updateUserInfoCard", payload: formData}).then((res) => {
    if(res) {
      const formatedUserInfo = formatUserInfo(res)
        dispatch({
        type: UPDATE_USER_INFO,
        payload: {
          updatedUser: formatedUserInfo,
        }
      })
      updateModalVisibility();
    }
        
    dispatch({
      type: UPDATE_LOADER,
      payload: false
    })
    return res
  })
}

export const getCompleteUserInfo = (props: {
  userName: string;
  dispatch: any;
  notFoundRedirect: () => void
}) => {
  const {userName, dispatch, notFoundRedirect} = props;
  return ApiCall({url: "user/getCompleteInfo", payload: {
    user_name: userName,
  }, notFoundRedirect: notFoundRedirect}).then((res: any) => {

    dispatch({
      type: UPDATE_LOADER,
      payload: true
    })

    if(res) {
      const formatedUser = formatUserInfo(res.user_info);
      const formatedPortfolios = formatPortfolios(res.portfolio_info);
      dispatch({
        type: SET_USER_INFO,
        payload: {
          portfolioCards: formatedPortfolios,
          userInfo: formatedUser,
        }
      })
    }

    dispatch({
      type: UPDATE_LOADER,
      payload: false
    })
  })
}