import { useEffect, useState } from "react";
import SinglePetCard from "./SinglePetCard";
import { Row, Col, Container, Form } from "react-bootstrap";

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");

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
    }, []);
    return (
            <Container className="mt-3" >
                <Form.Control type="text" placeholder="Microchip Number..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <Row className="mt-3">
                    <Col xs={3}>
                        {pets && filteredPets.map((pet) => <SinglePetCard pet={pet} key={pet.petId} />)}
                    </Col>
                </Row>
            </Container>
    );
};

export default PetList;
