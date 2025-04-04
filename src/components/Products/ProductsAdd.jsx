/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AddProduct, getData } from "../../redux/actions/ProductsApi";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialForm ={
    name: "",
    image: null,
    price: 0,
    isMed: false,
    drawerId: "",
    categoryId: "",
    companyName: "",
    address: "",
    tel: ""
}

const ProductAdd = () => {
    const dispatch = useDispatch()

    const [form, setForm] = useState(initialForm);
    const [cat, setCat] = useState([])
    const [drawer, setDrawer] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    const GetDatas = async () => {
        setIsLoading(true)
        //QUESTO SERVE PER ATTENDERE TUTTE LE PROMISE
        try {
            const [category, drawer] = await Promise.all([
                dispatch(getData("category")),
                dispatch(getData("drawer"))
            ])
            setCat(category.categories);
            setDrawer(drawer.result);
        } catch (error) {
            console.log(error, "errore fetch cat e drower")
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("Name", form.name)
        formData.append("Price", form.price)
        formData.append("CompanyName", form.companyName)
        formData.append("Address", form.address)
        formData.append("Tel", form.tel)
        formData.append("CategoryId", form.categoryId)
        formData.append("DrawerId", form.drawerId)
        formData.append("Image", form.image)
        formData.append("isMed", form.isMed)
        AddProduct(formData)
        setForm(initialForm)
        navigate("/Pharmacy/Manage", { state: true})
    }

    useEffect(() => {
        GetDatas()
    }, [])


    return (
        <>
            <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
                <Row className="mb-3 row-cols-2">
                    <Form.Group as={Col}>
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" placeholder="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>prezzo</Form.Label>
                        <Form.Control type="number" step={0.01} placeholder="name"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    </Form.Group>
                </Row>
                <Row className="mb-3 row-cols-3">
                    <Form.Group as={Col}>
                        <Form.Label>C.name</Form.Label>
                        <Form.Control type="text" placeholder="name"
                            value={form.companyName}
                            onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>address</Form.Label>
                        <Form.Control type="text" placeholder="name"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>C.tel</Form.Label>
                        <Form.Control type="text" placeholder="name"
                            value={form.tel}
                            onChange={(e) => setForm({ ...form, tel: e.target.value })} />
                    </Form.Group>
                </Row>
                <Row>
                    {!isLoading && 
                    <>
                    <Form.Group as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Select  value={cat.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                            <option>Choose...</option>
                            {cat.length >0 && cat.map((item) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </Form.Select>
                           
                    </Form.Group>
                    <Form.Group as={Col}>
                        
                        <Form.Label>State</Form.Label>
                        <Form.Select value={drawer.drawerId} onChange={(e) => setForm({ ...form, drawerId: e.target.value })}>
                            <option>Choose...</option>
                            {drawer.length>0 && drawer.map((item) => (
                                <option value={item.drawerId} key={item.drawerId}>{item.name} - {item.position}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                            </>
                            }
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
                    <Form.Control type="file" onChange={(e) => {
                        setForm({ ...form, image: e.target.files[0] });
                    }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ProductAdd;