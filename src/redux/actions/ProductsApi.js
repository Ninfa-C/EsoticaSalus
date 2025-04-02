const CategoryUrl = "";
const DrawerUrl = "";

export const getData = async (query) => {
    let url = "";
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

    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching spells:", error);
        return [];
    }
};
