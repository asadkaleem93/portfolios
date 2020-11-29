export type PortfolioCardType = {
    description: string;
    id: number;
    name: string;
    imgLink: string;
    url: string;
    userName: string;
}

export type UserFieldsType = {
    email: string;
    password: string;
    confirmPassword?: string;
    userName: string;
    phoneNumber: string;
    degree: string;
    university: string;
    gpa: string;
    skills: string[];
    interests: string[];
};

export type UserFieldsBEResponseType = {
    email: string;
    user_name: string;
    phone_number: string;
    degree: string;
    university: string;
    gpa: string;
    skills: string[];
    interests: string[];
};