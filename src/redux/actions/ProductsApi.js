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
          Authorization: `Bearer ${getToken2.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.status === 401) {
        dispatch(CheckToken());
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
};


export const getSingleData = (id) => {
    return async (dispatch) => {
      const getToken2 = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await fetch(`${ProduUrl}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken2.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status === 401) {
          dispatch(CheckToken());
        }
  
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    };
  };


const ProduUrl = "https://localhost:7054/api/Product";

export const AddProduct = async (form) => {
  const getToken = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(ProduUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken.token}`,
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
  const urlAdd = "https://localhost:7054/api/MedicalExam";
  const getToken = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(urlAdd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.token}`,
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      throw new Error("error");
    }
  } catch (err) {
    console.log(err);
  }
};

export const UpdateSingleProduct = (id, formData) => {
    return async (dispatch) => {

      const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await fetch(`https://localhost:7054/api/Product?id=${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken.token}`,
          },
          body: formData,
        });  
        if (!response.ok) {
          const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
        }  
        if (response.status === 401) {
          dispatch(CheckToken());
        }  
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };

export const DeleteProduct = async (id) => {
  const getToken = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(`${ProduUrl}?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken.token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    return true;
  } catch (err) {
    console.error("Errore durante l'eliminazione del prodotto:", err);
    throw err;
  }
};
