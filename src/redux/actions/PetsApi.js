const url = "https://localhost:7054/api/Pet/Race";

export const getRaces = async () => {
  const Token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error while getting data");
    }
  } catch (err) {
    console.log(err);
  }
};

const urladd = "https://localhost:7054/api/Pet";

export const AddPetAsync = async (form) => {
  const Token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(urladd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token.token}`,
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      console.log("Pet successfully added");
    } else {
      throw new Error("Error while adding pet");
    }
  } catch (error) {
    console.log(error);
  }
};
