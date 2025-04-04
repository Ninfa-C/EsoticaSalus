import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const SinglePetCard = (props) => {
    const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.pet.name}</Card.Title>
        <Card.Text>
          Razza: {props.pet.race}<br /> 
          Colore: {props.pet.color}<br /> 
          Data di nascita: {props.pet.birthDate}<br />
          Padrone: {props.pet.owner ? `${props.pet.owner.name} ${props.pet.owner.surname}` : `Nessun padrone registrato`}<br/>
          Microchip: {props.pet.microchip}
        </Card.Text>
        <Button variant="primary" onClick={() => (navigate(`/Pet/${props.pet.petId}`))} >Dettagli</Button>
        <Button variant="warning" className="ms-2" onClick={() => navigate(`/Pet/Change/${props.pet.petId}`)}>Modifica</Button>
      </Card.Body>
    </Card>
  );
}

export default SinglePetCard;
// 