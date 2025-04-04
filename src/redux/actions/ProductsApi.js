import { CheckToken, Logout } from "./AccountApi";

const CategoryUrl = "https://localhost:7054/api/Product/Categories";
const DrawerUrl = "https://localhost:7054/api/Product/drawers";
const ProductUrl = "https://localhost:7054/api/Product";


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
            case undefined:
                url = ProductUrl;
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
    } catch (err)  {
        console.error(err);
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

export const AddNewMedicExam = async (form) => {
    const urlAdd = "https://localhost:7054/api/MedicalExam"
    const getToken = JSON.parse(localStorage.getItem("token"));
    try {
        const response = await fetch (urlAdd , {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken.token}`,
            },
            body: JSON.stringify(form),
        });
        if (!response.ok) {
          throw new Error("error")
        
        }
      } catch (err) {
        console.log(err);
      }
    };
