const pharmaUrl = "https://localhost:7054/api/Pharmacy";

export const SendPharma = async (form) => {
    const getToken = JSON.parse(localStorage.getItem("token"));
    try {
        const response = await fetch(pharmaUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken.token}`,
            },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            console.log(response.status);
        }
    } catch (err) {
        console.log(err);
    }
};
