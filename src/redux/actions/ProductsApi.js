import { CheckToken, Logout } from "./AccountApi";

const CategoryUrl = "https://localhost:7054/api/Product/Categories";
const DrawerUrl = "https://localhost:7054/api/Product/drawers";



export const getData = (query) => {
    return async (dispatch) => {
    let url;
    switch (query) {
        case "category":
            url = CategoryUrl;
            break;
        case "drawer":
            url = DrawerUrl;
            break;
        default:
            break;
    }
    const getToken2 = JSON.parse(localStorage.getItem("token"));
    try {        
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                "Authorization" : `Bearer ${getToken2.token}`          
            },
        });
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        if(response.status === 401){
            dispatch(CheckToken())
        }

        const data = await response.json();
        return data;
    } catch  {
        console.error(getToken2.token);
    }
}
};

const ProduUrl = "https://localhost:7054/api/Product";

export const AddProduct = async (form) => {
const getToken = JSON.parse(localStorage.getItem("token"));
try {
    const response = await fetch (ProduUrl , {
        method : "POST",
        headers: {
            "Authorization": `Bearer ${getToken.token}`,
        },
        body: form,
    });
    if (response.ok) {
      console.log(response.status);
    }
  } catch (err) {
    console.log(err);
  }
};
