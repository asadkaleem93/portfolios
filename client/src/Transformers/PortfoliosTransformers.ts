import { PortfolioBEResponseType, PortfolioCardType } from "../Utils/Types";

export const formatPortfolio = (portfolio: PortfolioBEResponseType): PortfolioCardType => {
    return {
        description: portfolio.description,
        id: portfolio.id,
        imgLink: portfolio.img_link,
        name: portfolio.name,
        url: portfolio.url,
        userName: portfolio.user_name,
    }
}

export const formatPortfolios = (portfolios: PortfolioBEResponseType[]): PortfolioCardType[] =>  portfolios.map(formatPortfolio)