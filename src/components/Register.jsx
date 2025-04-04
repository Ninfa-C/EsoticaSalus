import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { RegisterAccount } from "../redux/actions/AccountApi";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    codiceFiscale: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
      await RegisterAccount(form);
      setForm({
        firstName: "",
        lastName: "",
        codiceFiscale: "",
        email: "",
        password: "",
        birthDate: "",
      })
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-75 mx-auto py-3">
        <FloatingLabel controlId="floatingFirstName" label="Nome" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nome"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingLastName" label="Cognome" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Cognome"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingCodiceFiscale" label="Codice Fiscale" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Codice Fiscale"
            value={form.codiceFiscale}
            onChange={(e) => setForm({ ...form, codiceFiscale: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingBirthDate" label="Data di Nascita" className="mb-3">
          <Form.Control
            type="date"
            placeholder="Data di Nascita"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          />
        </FloatingLabel>

        <button type="submit">Registrati</button>
      </form>
    </>
  );
};

export default Register;
