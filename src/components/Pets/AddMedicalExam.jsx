import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AddNewMedicExam } from "../../redux/actions/ClinicApi";

const initialForm = {
    examDate : "",
    petId : "",
    vetId : "", 
} 

const AddMedicalExam = () => {
const param = useParams()
const navigate = useNavigate()

const [form, setForm] = useState(initialForm)
const [vetList, setVetList] = useState([])
const [isLoading, SetIsLoading] = useState(true)

 useEffect(() => {
    if (param !== undefined) {
        SetIsLoading(true)
        setForm({...form, petId: param.id})
        getVets()
      }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[param])

 const getVets = async () => {
    let getToken = JSON.parse(localStorage.getItem("token"))
    const url = "https://localhost:7054/api/MedicalExam/vets";
    try {
        let response = await fetch(url , {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken.token}`,
            }
        });
        if(!response.ok){
            throw new Error("error while fetching Vets")
        }
        let data = await response.json()
        setVetList(data.data)
        SetIsLoading(false)
        
    } catch (error) {
        console.log("Error", error)
    }
 }
 const handleSubmit = (e) => {
    e.preventDefault()
    AddNewMedicExam(form)
    navigate(`/Pet/${form.petId}`)
 }




    
    
    return ( 
   <>
    {
        !isLoading && 
        <Container>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Data Visita</Form.Label>
        <Form.Control type="date" value={form.examDate} onChange={(e)=> setForm({...form, examDate: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Select value={vetList.vetId} onChange={(e) => setForm({ ...form, vetId: e.target.value })}>
                            <option>Choose...</option>
                            {vetList.length>0 && vetList.map((item, index) => (
                                <option value={item.vetId} key={index}>Dott. {item.lastName} {item.firstName}</option>
                            ))}
                        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Aggiungi visita
      </Button>
    </Form>

        </Container> 
    }
    
    </>
     );
}
 
export default AddMedicalExam;