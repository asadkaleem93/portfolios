import {UserFieldsBEResponseType, UserFieldsType} from '../Utils/Types'

export const formatUserInfo = (user: UserFieldsBEResponseType) => {
    return {
        email: user.email,
        userName: user.user_name,
        phoneNumber: user.phone_number,
        degree: user.degree,
        university: user.university,
        gpa: user.gpa,
        skills: user.skills,
        interests: user.interests,
    }
}