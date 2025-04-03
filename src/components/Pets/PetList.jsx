import { useEffect, useState } from "react";
import SinglePetCard from "./SinglePetCard";
import { Row, Col, Container } from "react-bootstrap";

const PetList = () => {
    const [pets, setPets] = useState([]);

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
                console.log(data.data);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetAllPets();
    }, []);
    return (
        <Container className="mt-3" >
            <Row>
                <Col xs={3}>
                    {pets && pets.map((pet) => <SinglePetCard pet={pet} key={pet.petId} />)}
                </Col>
            </Row>
        </Container>
    );
};

export default PetList;
