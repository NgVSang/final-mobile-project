import instance from "../../https/apiConfig";

const ENDPOINTS = {
    CLASSROOMS: "/classrooms",
    ADMINCLASSROOMS: "/admin/classrooms",
    CREATECLASSROOM: "/admin/create-classroom"
};

const get_classrooms = () => {
    return instance.get(ENDPOINTS.CLASSROOMS)
}

const admin_get_classrooms = () =>{
    return instance.get(ENDPOINTS.ADMINCLASSROOMS)
}

const create_classrooms = (data) =>{
    console.log(data);
    return instance.post(ENDPOINTS.CREATECLASSROOM,data)
}
const classroomService = {
    get_classrooms,
    admin_get_classrooms,
    create_classrooms
}

export default classroomService