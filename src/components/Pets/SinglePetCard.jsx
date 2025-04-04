import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { DeletePetAsync } from '../../redux/actions/PetsApi';
import { useState } from 'react';

const SinglePetCard = (props) => {
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

  const handleDelete = async () => {
    await DeletePetAsync(props.pet.petId);
    setUpdate(!update);
    navigate("/Pet", { state: { update: update } });
  }

  return (
    <Card style={{ width: '25rem' }}>
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
        <Button variant="warning" className='ms-2' onClick={() => navigate(`/Pet/Change/${props.pet.petId}`)}>Modifica</Button>
        <Button variant="danger" className='ms-2' onClick={() => handleDelete()}>Elimina</Button>
      </Card.Body>
    </Card>
  );
}

export default SinglePetCard;
// 