import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const VisiteMediche = ({ medicalExam }) => {
    return ( 
        <>
        <Card>
      <Card.Header className="fw-bold">Status: {medicalExam.state}</Card.Header>
      <Card.Body>
        <Card.Title>{medicalExam.diagnosis != null ? medicalExam.diagnosis : "Diagnosi non effettuata"}</Card.Title>
        <div className="d-flex justify-content-between">
        <div>
        <Card.Text>{new Date(medicalExam.examDate).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-')}</Card.Text>
        <Card.Text>
                Assegnato A: {medicalExam.vetName}
        </Card.Text>
        </div>
          
        <Link to={`/MedicalExam/${medicalExam.examId}`} variant="primary">Dettagli</Link>
        </div>
      </Card.Body>
    </Card>
        </>
     );
}
 
export default VisiteMediche;