import { Card } from "react-bootstrap";

const Ricoveri = ({ hospit }) => {
  return (
    <>
      <Card>
      <Card.Header className="fw-bold">Status: {!hospit.endDate ? "In Corso" : "Dimesso" }</Card.Header>
        <Card.Body className="d-flex justify-content-between">
            <span>Data Inizio Ricovero: {hospit.startDate}</span>
            <span>Data Fine Ricovero: {hospit.endDate}</span>
        </Card.Body>
      </Card>
    </>
  );
};

export default Ricoveri;
