import {UserFieldsBEResponseType, UserFieldsType} from '../Utils/Types'

export const formatUserInfo = (user: UserFieldsBEResponseType): UserFieldsType => {
    return {
        email: user.email,
        userName: user.user_name,
        phoneNumber: user.phone_number,
        degree: user.degree,
        university: user.university,
        skills: user.skills,
        interest: user.interest,
        gender: user.gender,
        resume: user.resume,
        describeYourSelf: user.describe_your_self,
        gpaScore: user.gpa_score,
        displayImage: user.profile_image,
    }
}
