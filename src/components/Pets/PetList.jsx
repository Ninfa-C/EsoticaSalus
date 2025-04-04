import { useEffect, useState } from "react";
import SinglePetCard from "./SinglePetCard";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();
    const { update } = location.state || {};

    const url = "https://localhost:7054/api/Pet";

    const GetAllPets = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPets(data.data);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filteredPets = pets.filter(pet =>
        pet.microchip.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        GetAllPets();
    }, [update]);
    return (
            <Container className="mt-3" >
                <Link className="btn btn-primary" to="/Pet/Add">Aggiungi animale</Link>
                <Form.Control className="mt-3" type="text" placeholder="Microchip Number..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <Row className="mt-3 gap-4">
                {filteredPets.length > 0 ? (
                    filteredPets.map((pet) => (
                        <SinglePetCard 
                            as={Col} 
                            pet={pet} 
                            key={pet.petId} 
                        />
                    ))
                ) : (
                    <p>Nessun animale trovato.</p>
                )}
                </Row>
            </Container>
    );
};

export default PetList;
