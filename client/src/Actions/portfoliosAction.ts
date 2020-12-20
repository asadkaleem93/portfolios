import { SET_PORTFOLIO_CARDS, DELETE_PORTFOLIO_CARD, UPDATE_PORTFOLIO_CARD, UPDATE_USER_INFO, UPDATE_LOADER } from "../Components/Contexts/AppContext";
import { formatPortfolio, formatPortfolios } from "../Transformers/PortfoliosTransformers";
import { apiCall } from "../Utils/ApiCall";
import { jsonToFormData } from "../Utils/helpers";
import { PortfolioCardType } from "../Utils/Types";

export const setPortfolioCards = (props: {
  data: any;
  dispatch: any;
  updateModalVisibility: () => void;
}) => {
  const {data, dispatch, updateModalVisibility} = props;
  return apiCall({url: "portfolios/setPortfolioCards", payload: data}).then((res) => {
    dispatch({
      type: UPDATE_LOADER,
      payload: true
    })
    if(res) {
      const formatedPortfolios = formatPortfolios(res);
        dispatch({
        type: SET_PORTFOLIO_CARDS,
        payload: {
          cards: formatedPortfolios,
        }
      })
      updateModalVisibility();
    }
    dispatch({
      type: UPDATE_LOADER,
      payload: false
    })
  })
}

export const deletePortfolioCard = (props: {
  data: any;
  dispatch: any;
}) => {
  const {data, dispatch} = props;
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  })
  return apiCall({url: "portfolios/deletePortfolioCard", payload: data, apiType: "delete"}).then((res) => {
    if(res) {
        dispatch({
        type: DELETE_PORTFOLIO_CARD,
        payload: {
          cardId: data.id,
        }
      })
    }
    dispatch({
      type: UPDATE_LOADER,
      payload: false
    })
  })
}

export const updatePortfolioCard = (props: {
  data: PortfolioCardType;
  dispatch: any;
  updateModalVisibility: () => any;
}) => {
  const {data, dispatch,updateModalVisibility} = props;
  const formData = jsonToFormData(data);
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  })
  return apiCall({url: "portfolios/updatePortfolioCard", payload: formData}).then((res) => {
    if(res) {
      const formatedPortfolioCard = formatPortfolio(res)
        dispatch({
        type: UPDATE_PORTFOLIO_CARD,
        payload: {
          updatedCard: formatedPortfolioCard,
        }
      })
      updateModalVisibility();
    }
    dispatch({
      type: UPDATE_LOADER,
      payload: false
    })
  })
}
