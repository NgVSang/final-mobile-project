import * as Yup from 'yup'

const name = Yup.string().required('Vui lòng nhập tên')
const username = Yup.string().required('Vui lòng nhập username')
const validNumber = Yup.string().required('Vui lòng nhập OTP')
const email = Yup.string().required('Vui lòng nhập Email').email('Vui lòng nhập một email')
const old_password = Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu có ít nhất 6 kí tự')
const password = Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu có ít nhất 6 kí tự')
const re_password = Yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
const phone_number = Yup.string().required('Vui lòng nhập số điện thoại')
                .matches(/^(\+84|84|0){1}([1|3|5|7|8|9]){1}([0-9]{8})$/, 'Số điện thoại không đúng')
const number = Yup.number().min(1).required('Vui lòng nhập số lượng')
const description = Yup.string().required('Vui lòng nhập mô tả')
const study_sessions = Yup.string().matches(
                /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s\d{2}:\d{2},\s\d{2}:\d{2}$/,
                'Không đúng như ví dụ'
                )
                // .test('valid-time-range', 'Invalid time range', (value) => {
                //     if (!value) return true;
                    
                //     const [day, startTime, endTime] = value.split(', ');
                //     const startHour = parseInt(startTime.split(':')[0], 10);
                //     const endHour = parseInt(endTime.split(':')[0], 10);
                    
                //     return startHour < endHour;
                // })
                // .required('Schedule is required')

export {
    email,
    password,
    phone_number,
    re_password,
    validNumber,
    name,
    old_password,
    username,
    number,
    description,
    study_sessions
}
