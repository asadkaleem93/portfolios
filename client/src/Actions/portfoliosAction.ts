import { SET_USER_INFO, SET_PORTFOLIO_CARDS, DELETE_PORTFOLIO_CARD, UPDATE_PORTFOLIO_CARD, UPDATE_USER_INFO } from "../Components/Contexts/AppContext";
import { formatPortfolio, formatPortfolios } from "../Transformers/PortfoliosTransformers";
import { formatUserInfo } from "../Transformers/UsersTransformers";
import { apiCall } from "../Utils/ApiCall";
import { jsonToFormData } from "../Utils/helpers";

export const getCompleteUserInfo = (props: {
  userName: string;
  dispatch: any;
}) => {
  const {userName, dispatch} = props;
  return apiCall({url: "getCompleteInfo", payload: {
    user_name: userName,
  }}).then((res: any) => {
    const formatedUser = formatUserInfo(res.user_info);
    const formatedPortfolios = formatPortfolios(res.portfolio_info);
      dispatch({
        type: SET_USER_INFO,
        payload: {
          portfolioCards: formatedPortfolios,
          userInfo: formatedUser
        }
      })
  })
}

export const setPortfolioCards = (props: {
  data: any;
  dispatch: any;
}) => {
  const {data, dispatch} = props;
  return apiCall({url: "setPortfolioCards", payload: data}).then((res) => {
    if(res) {
      const formatedPortfolios = formatPortfolios(res);
        dispatch({
        type: SET_PORTFOLIO_CARDS,
        payload: formatedPortfolios
      })
    }
  })
}

export const deletePortfolioCard = (props: {
  data: any;
  dispatch: any;
}) => {
  const {data, dispatch} = props;
  return apiCall({url: "deletePortfolioCard", payload: data, apiType: "delete"}).then((res) => {
    if(res) {
        dispatch({
        type: DELETE_PORTFOLIO_CARD,
        payload: data.id
      })
    }
  })
}

export const updatePortfolioCard = (props: {
  data: any;
  dispatch: any;
}) => {
  const {data, dispatch} = props;
  const formData = jsonToFormData(data);
  return apiCall({url: "updatePortfolioCard", payload: formData}).then((res) => {
    if(res) {
      const formatedPortfolioCard = formatPortfolio(res)
        dispatch({
        type: UPDATE_PORTFOLIO_CARD,
        payload: formatedPortfolioCard
      })
    }
  })
}

export const updateUserInfo = (props: {
  data: any;
  dispatch: any;
}) => {
  const {data, dispatch} = props;
  const formData = jsonToFormData(data);
  return apiCall({url: "updateUserInfoCard", payload: formData}).then((res) => {
    console.log('RES -->', res)
    if(res) {
      const formatedUserInfo = formatUserInfo(res)
        dispatch({
        type: UPDATE_USER_INFO,
        payload: formatedUserInfo
      })
    }
  })
}