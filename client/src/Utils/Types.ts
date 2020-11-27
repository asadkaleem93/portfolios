export type PortfolioCardType = {
    description: string;
    id: number;
    name: string;
    img_link: string;
    url: string;
    user_name: string;
}

export type UserFieldsType = {
    email: string;
    password: string;
    confirmPassword?: string;
    user_name: string;
    phone_number: string;
    degree: string;
    university: string;
    gpa: string;
    skills: string[];
    interests: string[];
};