import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { SendPharma } from "../../redux/actions/PharmacyApi";
import { useNavigate } from "react-router-dom";

const SendOrder = () => {
  const prod = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nameClient: "",
    surnameClient: "",
    codiceFiscaleClient: "",
    emailClient: "",
    dateBirthClient: "",
    doctorCf: "",
    descriptionPrescription: "",
    datePrescription: new Date().toISOString(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...form,
      total: prod.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      products: prod.map((item) => ({
        idProduct: item.idProduct,
        quantity: item.quantity,
      })),
    };
    await SendPharma(orderData);
navigate("/Pharmacy")
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <h4>Dati cliente</h4>
        <Row className="mb-3 row-cols-2">
          <Form.Group as={Col}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="cognome"
              value={form.surnameClient}
              onChange={(e) =>
                setForm({ ...form, surnameClient: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 row-cols-2">
          <Form.Group as={Col}>
            <Form.Label>Codice Fiscale</Form.Label>
            <Form.Control
              type="text"
              placeholder="Codice Fiscale"
              value={form.codiceFiscaleClient}
              onChange={(e) =>
                setForm({ ...form, codiceFiscaleClient: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              value={form.emailClient}
              onChange={(e) =>
                setForm({ ...form, emailClient: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Data di Nascita</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data"
              value={form.dateBirthClient}
              onChange={(e) =>
                setForm({ ...form, dateBirthClient: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <h4 className="my-2">Dati Prescrizione Medica</h4>
        <Form.Group as={Col}>
          <Form.Label>Codice Fiscale Dottore</Form.Label>
          <Form.Control
            type="text"
            placeholder="Codice Fiscale Dottore"
            value={form.doctorCf}
            onChange={(e) => setForm({ ...form, doctorCf: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Descrizione ricetta</Form.Label>
          <Form.Control
            type="text-area"
            placeholder="descrizione ricetta"
            value={form.descriptionPrescription}
            onChange={(e) =>
              setForm({ ...form, descriptionPrescription: e.target.value })
            }
          />
        </Form.Group>
        <div>
          <h4>Riepilogo Prodotti</h4>
          <ul>
            {prod.length > 0 &&
              prod &&
              prod.map((item, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
          </ul>
          <div className="text-end h5">
            Totale: €
            {prod
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
          
        </div>

        <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
    </div>
  );
};

export default SendOrder;
