/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRaces, PutPetAsync } from "../../redux/actions/PetsApi";

const initialForm = { 
    name: "",
    color: "",
    race: 0,
    birthDate: "",
    microchip: ""
}

const ChangePet = () => {
    const [isLoading, SetIsLoading] = useState(true);
    const [PetInfo, SetPetInfo] = useState(initialForm);
    const [races, setRaces] = useState([]);
    const [update, setUpdate] = useState(false);
    const param = useParams();
    const navigate = useNavigate();

    const GetPet = async () => {
        const Url = `https://localhost:7054/api/Pet/${param.id}`;
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            let response = await fetch(Url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken.token}`,
                },
            });
            if (!response.ok) {
                throw new Error("errore Fetch");
            }
            let data = await response.json();
            const raceName = data.data.race;
            const race = races.find(r => r.name === raceName);
            SetPetInfo({
                name: data.data.name,
                color: data.data.color,
                race: race.id,
                birthDate: data.data.birthDate,
                microchip: data.data.microchip
            });
            SetIsLoading(false);
        } catch (error) {
            console.log("Error", error);
        }
    };

    const GetData = async () => {
        SetIsLoading(true)
        try {
            const data = await getRaces();
            setRaces(data.races);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            SetIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            PutPetAsync(param.id, PetInfo);
            setUpdate(!update);
            navigate("/Pet", { state: { update: update } });
        }

        useEffect(() => {
            GetData();
        }, []);
    
        useEffect(() => {
            if (races.length > 0) {
                GetPet();
            }
        }, [races]);
    return (
        <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
            <Row className="mb-3 row-cols-2">
                <Form.Group as={Col}>
                    <Form.Label>Nome dell'animale</Form.Label>
                    <Form.Control type="text" placeholder="Nome animale..." value={PetInfo.name} onChange={(e) => SetPetInfo({ ...PetInfo, name: e.target.value })} />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Colore del manto</Form.Label>
                    <Form.Control type="text" placeholder="Colore manto..." value={PetInfo.color} onChange={(e) => SetPetInfo({ ...PetInfo, color: e.target.value })} />
                </Form.Group>
            </Row>
            <Row>
                {!isLoading && <Form.Group as={Col}>
                    <Form.Label>Razza</Form.Label>
                    <Form.Select value={PetInfo.race} onChange={(e) => SetPetInfo({ ...PetInfo, race: e.target.value })}>
                        <option>Choose...</option>
                        {races.length > 0 && races.map((item) => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                }

                <Form.Group as={Col}>
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control type="date" placeholder="Data..." value={PetInfo.birthDate} onChange={(e) => SetPetInfo({ ...PetInfo, birthDate: e.target.value })} />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Numero microchip</Form.Label>
                    <Form.Control type="text" placeholder="Numero microchip..." value={PetInfo.microchip} onChange={(e) => SetPetInfo({ ...PetInfo, microchip: e.target.value })} />
                </Form.Group>
            </Row>
            <Button variant="outline-success" type="submit" className="mt-3">Cambia</Button>
        </Form>
    );
}

export default ChangePet;