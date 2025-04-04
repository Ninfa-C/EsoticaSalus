/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, getSingleData, UpdateSingleProduct } from "../../redux/actions";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const initialForm = {
    name: "",
    imageFile: null,
    price: 0,
    isMed: false,
    drawerId: "",
};

const UpdateProduct = () => {
    const [form, setForm] = useState(initialForm);
    const param = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [drawer, setDrawer] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const GetDataP = async (id) => {
        const [prod, drawer] = await Promise.all([
            dispatch(getSingleData(id)),
            dispatch(getData("drawer"))
        ])
        setForm(prod.product);
        setDrawer(drawer.result);
        setIsLoading(false)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("Name", form.name)
        formData.append("Price", form.price)
        formData.append("DrawerId", form.drawerId || drawer.find(d=> d.name === form.drawer?.name)?.drawerId)
        if(form.imageFile){
            formData.append("Image", form.imageFile)
        }
        formData.append("isMed", form.isMed)
        dispatch(UpdateSingleProduct(param.id, formData))
        navigate("/Pharmacy/Manage")
    }

    useEffect(() => {
        GetDataP(param.id);
    }, []);

    return (
        <>
        {console.log(form)}
            <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
                <Row className="mb-3 row-cols-2">
                    <Form.Group as={Col}>
                        <Form.Label>name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>prezzo</Form.Label>
                        <Form.Control
                            type="number"
                            step={0.01}
                            placeholder="name"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    {!isLoading && (
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    value={drawer.find(d=> d.name === form.drawer?.name)?.drawerId}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedDrawer = drawer.find(d => d.drawerId === selectedId);
                                        
                                        setForm({
                                          ...form,
                                          drawerId: selectedId,
                                          drawer: selectedDrawer ? {  // Aggiorna anche l'oggetto drawer
                                            name: selectedDrawer.name,
                                            position: selectedDrawer.position
                                          } : null
                                        });
                                      }}
                                >
                                    <option>Choose...</option>
                                    {drawer.length > 0 &&
                                        drawer.map((item) => (
                                            <option value={item.drawerId} key={item.drawerId}>
                                                {item.name} - {item.position}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </>
                    )}
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Medicinale?"
                        checked={form.isMed}
                        onChange={(e) => setForm({ ...form, isMed: e.target.checked })}
                    />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            setForm({ ...form, imageFile: e.target.files[0] });
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default UpdateProduct;
