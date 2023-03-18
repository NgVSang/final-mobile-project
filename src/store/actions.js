import NavigationService from "../services/NavigationService";

export const INCREMENT = 'INCREMENT';
export const SAVE_HISTORY = 'SAVE_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const DELETE_ALL_HISTORY = 'DELETE_ALL_HISTORY';
export const LOGIN = 'LOGIN';

export function login(value) {
  let payload = {}
  if (value.phone_number.trim() == "0795242610" && value.password.trim() == "Sang100302"){
    payload = {
      ...payload,
      user:{
        name:"Nguyễn Viết Sáng",
        phone_number:"0795242610",
        role:1,
      },
      token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc21hcnR0di50aGlldGtlYXBwLmFzaWFcL2FwaVwvY3VzdG9tZXJcL2xvZ2luIiwiaWF0IjoxNjU3Njg0OTA1LCJleHAiOjc2NTc2ODQ4NDUsIm5iZiI6MTY1NzY4NDkwNSwianRpIjoiSjBFWUhWcjVXVFpGMENNVyIsInN1YiI6NSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.9hYoqJ6jF_KhxTU0sGhYeACFY91yEvuGAafA1w1WAyI"
    }
    NavigationService.reset('/user')
  }else{
    alert("Thông tin đăng nhập không đúng")
  }
  return {
    type: LOGIN,
    payload: payload,
  };
}


export function increment(value) {
  return {
    type: INCREMENT,
    payload: value,
  };
}


export function save_history(value) {
  return {
    type: SAVE_HISTORY,
    payload: value,
  };
}

export function delete_history(value) {
  return {
    type: DELETE_HISTORY,
    payload: value,
  };
}

export function delete_all_history() {
  return {
    type: DELETE_ALL_HISTORY,
  };
}
