import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AddNewHospitalization } from "../../redux/actions/ClinicApi";

const initialForm = {
  startDate: "",
  petId : "",
}


const AddHospitalization= () => {
  const param = useParams()
  const [form, setForm] = useState(initialForm)
  const navigate = useNavigate()
  


  useEffect(()=>{
      if(param !== undefined){
        setForm({...form, petId: param.id})
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[param])

  const handleSubmit = (e) =>{
    e.preventDefault()
    AddNewHospitalization(form)
    navigate(`/Pet/${form.petId}`, { state: { refresh: true } })
  }


    return (
      <>
       
          <Container>
        <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" >
          <Form.Label>Data ricovero</Form.Label>
          <Form.Control type="date" value={form.examDate} onChange={(e)=> setForm({...form, startDate: e.target.value})} required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Aggiungi
        </Button>
      </Form>
  
          </Container> 
      
      
      </>
      );
}
 
export default AddHospitalization;