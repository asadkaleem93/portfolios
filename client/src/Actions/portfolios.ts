import Axios from "axios";
import { SET_PORTFOLIO_CARDS } from "../Components/Contexts/AppContext";
import { apiCall } from "../Utils/ApiCall";
import { apiUrl } from "../Utils/AppConstants";

// TODO: create an api reuseable function

export const getPortfolioInfo = (props: {
  userName: string;
  dispatch: any;
}) => {
  const {userName, dispatch} = props;
  return apiCall({url: "getPortfolio", payload: {
    user_name: userName,
  }}).then((res: any) => {
    console.log('Action RES -->', res)
  })
  // return Axios({
  //   method: "post",
  //   url: `${apiUrl}getPortfolio`,
  //   data: {
  //     user_name: userName,
  //   },
  // }).then((res) => {
  //   if (res.data.data && res.data.data.length > 0) {
  //     dispatch({
  //       type: SET_PORTFOLIO_CARDS,
  //       payload: {
  //         portfolioCards: res.data.data
  //       }
  //     })
  //     return "Cards received";
  //   }
  //   if (res.data.error && res.data.error.length > 0) {
  //     // MAKE A NOTIFICATION IN REUSEABLE FUNCTION FOR API FOR ERROR
  //     return res.data.error
  //   }
  // });
}