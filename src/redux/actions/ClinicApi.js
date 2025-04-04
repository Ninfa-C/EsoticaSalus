export const AddNewMedicExam = async (form) => {
    const urlAdd = "https://localhost:7054/api/MedicalExam"
    const getToken = JSON.parse(localStorage.getItem("token"));
    try {
        const response = await fetch(urlAdd, {
            method: "POST",
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

export const AddNewHospitalization = async (form) => {
    const urlAdd = "https://localhost:7054/api/Hospitalization"
    const getToken = JSON.parse(localStorage.getItem("token"));
    try {
        const response = await fetch(urlAdd, {
            method: "POST",
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

export const EndRecovery = async (id) => {
    const url = `https://localhost:7054/api/Hospitalization?hospitId=${id}`
    const getToken = JSON.parse(localStorage.getItem("token"));
    try {
       const response = await fetch(url,{
        method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken.token}`,
            },
       });
       if (!response.ok) {
        throw new Error("error")
    } 
    } catch (error) {
        console.log(error);
    }
}

