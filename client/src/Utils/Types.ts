export type PortfolioCardType = {
    description: string;
    id: number;
    name: string;
    imgLink: string;
    url: string;
    userName: string;
}

export type PortfolioBEResponseType = {
    description: string;
    id: number;
    img_link: string;
    name: string;
    url: string;
    user_name: string;
}

export type UserFieldsType = {
    email: string;
    password?: string;
    confirmPassword?: string;
    userName: string;
    phoneNumber: string;
    degree: string;
    university: string;
    gpaScore: string;
    skills: string[];
    interest: string[];
    describeYourSelf: string;
    resume: string;
    gender: string;
    displayImage: string;
};

export type UserFieldsBEResponseType = {
    email: string;
    user_name: string;
    phone_number: string;
    degree: string;
    university: string;
    gpa: string;
    gender: string;
    resume: string;
    describe_your_self: string;
    gpa_score: string;
    skills: string[];
    interest: string[];
    profile_image: string;
};
