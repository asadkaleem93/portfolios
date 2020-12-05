import { SET_USER_INFO } from "../Components/Contexts/AppContext";
import { formatPortfolios } from "../Transformers/PortfoliosTransformers";
import { formatUserInfo } from "../Transformers/UsersTransformers";
import { apiCall } from "../Utils/ApiCall";

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

type CardType = {
  name: string;
  description: string;
  link: string;
  image: any;
};

export const setPortfolioCards = (props: {
  data: any;
  dispatch: any;
}) => {
  const {data, dispatch} = props;
  return apiCall({url: "setPortfolioCards", payload: data}).then((res) => console.log('RES -->', res))
}