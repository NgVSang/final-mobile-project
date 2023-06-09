import * as Yup from 'yup'
import { 
    email, 
    password,old_password, 
    phone_number, 
    re_password ,
    validNumber,
    name, 
    username, 
    number,
    description,
    study_sessions,
} from './common'

export const LoginSchema = Yup.object().shape({
    phone_number,
    password
})

export const SignUpSchema = Yup.object().shape({
    name,
    phone_number,
    password,
    re_password,
    username
})

export const CreateClassSchema = Yup.object().shape({
    name,
    number_of_student:number,
    description,
    study_session1: study_sessions,
    study_session2: study_sessions,
    study_session3: study_sessions,
})


export const ConfirmEmailSchema = (length, name) => {
    const schema = Yup.object().shape({
        [name]: Yup.array().of(Yup.string().required().length(1)).length(length)
    })
    return schema
}

export const ForgotPassword = Yup.object().shape({
    phone_number
})

export const confirmOTP= Yup.object().shape({
    validNumber
})

export const ResetPassword = Yup.object().shape({
    password,
    re_password
})

export const ChangePassword = Yup.object().shape({
    password,
    re_password,
    old_password
})

export const confirmChangeInfor= Yup.object().shape({
    email,
    name
})