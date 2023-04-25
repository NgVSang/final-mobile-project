import instance from "../../https/apiConfig";

const ENDPOINTS = {
    TEACHERLIST: "/admin/teachers",
    CREATEACCOUNT:"/admin/create-account",
};

const get_teachers = () => {
    return instance.get(ENDPOINTS.TEACHERLIST)
}

const create_teacher = (data) => {
    return instance.post(ENDPOINTS.CREATEACCOUNT,data)
}

const teacherService = {
    get_teachers,
    create_teacher
}

export default teacherService