import { Button, Card } from "react-bootstrap";
import { EndRecovery } from "../../redux/actions/ClinicApi";
import { useEffect} from "react";

const Ricoveri = ({ hospit , update , setUpdate }) => {



  useEffect(()=>{
  console.log(hospit)

},[])

const handleClick = (e)=>{
  e.preventDefault()
    EndRecovery(hospit.hospitalizationId)
    setUpdate(!update)
    
}


  return (
    <>
      <Card>
      <Card.Header className="fw-bold d-flex justify-content-between">
        <span>
        Status: {!hospit.endDate ? "In Corso" : "Dimesso" }
        </span>
        <div className="ms-auto">
        <Button type="button" variant="link" onClick={handleClick} className="text-danger">Termina</Button>
        </div>
        
        
        </Card.Header>
        <Card.Body className="d-flex justify-content-between">
            <span>Data Inizio Ricovero: {hospit.startDate}</span>
            <span>Data Fine Ricovero: {hospit.endDate}</span>
        </Card.Body>
      </Card>
    </>
  );
};

export default Ricoveri;
