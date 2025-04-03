const CategoryUrl = "https://localhost:7054/api/Product/Categories";
const DrawerUrl = "https://localhost:7054/api/Product/drawers";

export const getData = async (query) => {
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
  const getToken = JSON.parse(localStorage.getItem("token"));
  const authToken = getToken.token;
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch {
    console.error(authToken);
  }
};

const ProduUrl = "https://localhost:7054/api/Product";

export const AddProduct = async (form) => {
  const getToken = JSON.parse(localStorage.getItem("token"));
  const authToken = getToken.token;
  try {
    const response = await fetch(ProduUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
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
