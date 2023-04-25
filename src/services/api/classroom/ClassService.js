import instance from "../../https/apiConfig";

const ENDPOINTS = {
    CLASSROOMS: "/classrooms",
    ADMINCLASSROOMS: "admin/classrooms"
};

const get_classrooms = () => {
    return instance.get(ENDPOINTS.CLASSROOMS)
}

const admin_get_classrooms = () =>{
    return instance.get(ENDPOINTS.ADMINCLASSROOMS)
}

const classroomService = {
    get_classrooms,
    admin_get_classrooms
}

export default classroomService