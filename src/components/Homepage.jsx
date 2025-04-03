import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Homepage = () => {
    const profile = useSelector(state => state.profile);
    const [search, setSearch] = useState("");
    const [pet, setPet] = useState();
    const [bool, setBool] = useState(false);
    const url = "https://localhost:7054/api/Pet/search/";


    const searchPet = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(url + search, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPet(data.data);
                setBool(true);
            }
            else {
                setBool(true);
                setPet(undefined);
                throw new Error("Error");
            }
        }
        catch (error) {
            setBool(true);
            setPet(undefined);
            console.error(error)
        }
    }

    return (
        <Container>
            <h1>Benvenuto {profile.name}</h1>
            <div className="d-flex">
                <Form.Control type="text" placeholder="Microchip Number..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button onClick={() => { searchPet() }}>Cerca</Button>
            </div>
            {bool && ((pet !== undefined)  ? (
                <div className="mt-5">
                    <h2>{pet.name}</h2>
                    <p>Colore: {pet.color}</p>
                    <p>Razza: {pet.race}</p>
                    <p>Data di nascita: {pet.birthDate}</p>
                </div>
            ) : (
                <div className="mt-5">
                    <p className="text=danger">Animale non trovato!</p>
                </div>
            ))}
        </ Container>
    );
}
export default Homepage;