import { useSelector } from "react-redux";

const Homepage = () => {
const profile = useSelector(state=>state.profile)

    return ( 
    <>
    <h1>Benvenuto {profile.name}</h1>
    </> 
    );
} 
export default Homepage;