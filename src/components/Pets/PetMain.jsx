import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import VisiteMediche from "./VisiteMediche";
import Ricoveri from "./Ricoveri";

const PetMain = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [update,setUpdate] = useState(true)
  const param = useParams();
  const [PetInfo, SetPetInfo] = useState({});

  useEffect(() => {
    if (param !== undefined) {
      SetIsLoading(true);
      GetPet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, update]);

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
      SetPetInfo(data.data);
      SetIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center">DETTAGLIO PET</h1>
        </Row>
        {!isLoading && (
          <>
            <Row>
              <Col xs={12}>
                <div>
                  <Card>
                    <Card.Body>
                      <h2>Pet</h2>
                      <div className="d-flex justify-content-between">
                        <Card.Title>Nome: {PetInfo.name}</Card.Title>
                        <Card.Title>
                          {PetInfo.microchip != null
                            ? PetInfo.microchip
                            : "Microchip Non Presente"}
                        </Card.Title>
                      </div>
                      <Card.Text className="d-flex">
                        Razza: {PetInfo.race}
                      </Card.Text>
                      <Card.Text>Manto {PetInfo.color}</Card.Text>
                      <Card.Text>Nato il: {PetInfo.birthDate}</Card.Text>
                      <hr />
                      <h2>Owner</h2>
                        {
                        PetInfo.owner &&
                        <>
                      <div className="d-flex justify-content-between">
                        <Card.Title>
                          Nome: {PetInfo.owner.surname} {PetInfo.owner.name}
                        </Card.Title>
                        <Card.Title>
                          CF : {PetInfo.owner.codiceFiscale}
                        </Card.Title>
                      </div>
                      <Card.Text>Email : {PetInfo.owner.email}</Card.Text>
                        </>
                    }
                    </Card.Body>
                  </Card>
                </div>

              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={6}>
              <div className="d-flex justify-content-between">
                <h4 className="m-0">Visite Mediche</h4>
                <Link to={`/MedicalExam/new/${PetInfo.petId}`} className='btn btn-sm btn-primary'>Nuova Visita</Link>
              </div>
                <div className="mt-2">
                  {PetInfo.petExams.length > 0 && (
                    <>
                      {PetInfo.petExams.map((item, index) => {
                        return <VisiteMediche medicalExam={item} key={index} />;
                      })}
                    </>
                  )}
                  {PetInfo.petExams.length <= 0 && (
                    <>
                      <Alert variant="info">
                      <Alert.Heading>La sezione visite mediche e' vuota</Alert.Heading>
                      </Alert>
                    </>
                  )}
                </div>
              </Col>

              <Col xs={6}>
              <div className="d-flex justify-content-between">
                <h4 className="m-0">Ricoveri</h4>
                <Link to={`/Hospitalization/new/${PetInfo.petId}`} className='btn btn-sm btn-danger'>Ricovera</Link>  
              </div>
                <div className="mt-2">
                  {PetInfo.petHospitalization.length > 0 && (
                    <>
                      {PetInfo.petHospitalization.map((item, index) => {
                        return <Ricoveri hospit={item} update={update} setUpdate={setUpdate}  key={index} />;
                      })}
                    </>
                  )}
                  {PetInfo.petHospitalization.length <= 0 && (
                    <>
                      <Alert variant="info">
                        <Alert.Heading>La sezione ricoveri e' vuota</Alert.Heading>
                      </Alert>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default PetMain;
