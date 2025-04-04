import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AddPetAsync, getRaces } from "../../redux/actions/PetsApi";
import { useNavigate } from "react-router-dom";

const initialForm = {
    name: "",
    color: "",
    race: 0,
    birthDate: "",
    microchip: "",
    nameOwner: "",
    surname: "",
    birthdateOwner: "",
    codiceFiscale: "",
    email: ""
}

const AddPet = () => {
    const [form, setForm] = useState(initialForm);
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();


    const GetData = async () => {
        setIsLoading(true)
        try {
            const data = await getRaces();
            setRaces(data.races);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AddPetAsync(form);
        setForm(initialForm);
        setUpdate(!update);
        navigate("/Pet", { state: { update: update } });
    }

    useEffect(() => {
        GetData();
    }, [])
    return (
        <>
            <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
                <h2>Dati dell'animale</h2>
                <Row className="mb-3 row-cols-2">
                    <Form.Group as={Col}>
                        <Form.Label>Nome dell'animale</Form.Label>
                        <Form.Control type="text" placeholder="Nome animale..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Colore del manto</Form.Label>
                        <Form.Control type="text" placeholder="Colore manto..." value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                    </Form.Group>
                </Row>
                <Row>
                    {!isLoading && <Form.Group as={Col}>
                        <Form.Label>Razza</Form.Label>
                        <Form.Select value={form.race} onChange={(e) => setForm({ ...form, race: e.target.value })}>
                            <option>Choose...</option>
                            {races.length > 0 && races.map((item) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    }

                    <Form.Group as={Col}>
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control type="date" placeholder="Data..." value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Numero microchip</Form.Label>
                        <Form.Control type="text" placeholder="Numero microchip..." value={form.microchip} onChange={(e) => setForm({ ...form, microchip: e.target.value })} />
                    </Form.Group>
                </Row>
                <h2 className="mt-5">Dati del padrone</h2>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome padrone..." value={form.nameOwner} onChange={(e) => setForm({ ...form, nameOwner: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Cognome padrone..." value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control type="date" placeholder="Data..." value={form.birthdateOwner} onChange={(e) => setForm({ ...form, birthdateOwner: e.target.value })} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Codice Fiscale</Form.Label>
                        <Form.Control type="text" placeholder="Codice fiscale..." value={form.codiceFiscale} onChange={(e) => setForm({ ...form, codiceFiscale: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </Form.Group>
                </Row>
                <Button variant="outline-success" type="submit" className="mt-3">Aggiungi</Button>
            </Form>
        </>
    );
}

export default AddPet;