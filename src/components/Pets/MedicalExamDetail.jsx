import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const MedicalExamDetail = () => {
  const [isLoading, SetIsLoading] = useState(true);
  const [medDetails, setMedDetails] = useState({});
  const param = useParams();

  useEffect(() => {
    if (param !== undefined) {
      SetIsLoading(true);
      getMedDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  const getMedDetails = async () => {
    const url = `https://localhost:7054/api/MedicalExam/${param.id}`;
    const getToken = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("error");
      }
      let data = await response.json();
      setMedDetails(data.data);
      SetIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {console.log(medDetails)}
      <Container>
        <h2 className="text-center my-3">DETTAGLIO VISITA</h2>
        {!isLoading && (
          <>
            <Card className="mt-1">
              <Card.Header className="d-flex justify-content-between">
                <span>{medDetails.examDate}</span>
                <span>{medDetails.state}</span>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  {medDetails.diagnosis
                    ? `${medDetails.diagnosis}`
                    : "Accertamento Diagnosi in corso..."}
                </Card.Title>
                <Card.Text>
                  {medDetails.treatment
                    ? `${medDetails.treatment}`
                    : "Trattamento non presente"}
                </Card.Text>
                <hr />
              </Card.Body>
              <Card.Footer>
                Assegnato a:{" "}
                <span>
                  Dott. {medDetails.vet.lastName} {medDetails.vet.firstName}
                </span>
              </Card.Footer>
            </Card>
            <div className="d-flex mt-2">
              <div className="text-end">
                <Link to={`/MedicalExam/modify/${medDetails.examId}`} className='btn btn-sm btn-warning'>Modifica</Link>
              </div>
              <div className="ms-auto mx-1">
                <small className="fw-bold text-secondary">
                  Ultima modifica : {medDetails.lastModified}
                </small>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default MedicalExamDetail;
