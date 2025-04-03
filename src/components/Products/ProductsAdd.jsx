import { useEffect, useState } from "react";
import { AddProduct, getData } from "../../redux/actions/ProductsApi";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ProductAdd = () => {
    const [form, setForm] = useState({
        name: "",
        image: null,
        price: 0,
        isMed: false,
        drawerId: "",
        categoryId: "",
        companyName: "",
        address: "",
        tel: ""
    });

    const [cat, setCat] = useState([])
    const [drawer, setDrawer] = useState([])
    const GetDatas = async () => {
        const data1 = await getData("category")
        setCat(data1.categories)
        const data2 = await getData("drawer")
        setDrawer(data2.result);
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
                    <Form.Group as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Select  value={cat.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                            <option>Choose...</option>
                            {cat && cat.map((item) => (
                                <>
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                </>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Select value={drawer.drawerId} onChange={(e) => setForm({ ...form, drawerId: e.target.value })}>
                            <option>Choose...</option>
                            {drawer && drawer.map((item) => (
                                <>
                                    <option value={item.drawerId} key={item.drawerId}>{item.name} - {item.position}</option>
                                </>
                            ))}
                        </Form.Select>
                    </Form.Group>
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