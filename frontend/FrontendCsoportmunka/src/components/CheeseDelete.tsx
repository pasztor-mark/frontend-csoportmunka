import { useEffect, useState } from "react"
import { NavigationBar } from "./NavigationBar";


interface Cheese {
    id: number;
    name: string;
    type: string;
    milk_type: string;
    aging_time: number;
    origin: string;
    flavor: string;
}

export default function CheeseDelete() {

    const [cheese, setCheese] = useState<Cheese[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    
    const handleDelete = async(id) => { 
        const answer = confirm("Biztosan akarod törölni?");
        if(answer){
            //alert("Törlendő telefon: " + id) 
            try {
                const response = await fetch(`http://localhost:3000/phones/${id}`, {
                    method: 'DELETE',
                } )
                setCheese(cheese.filter( (cheese)=>cheese.id !== id))
            } catch (err) {
                //...
            }
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/sajtok")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setCheese(data);
                setLoading(false);
            })
            .catch((error) => { 
                setError(error.message);
            })
    }, [])

    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <h1>Sajtok</h1>
        <h2>Menü</h2>
        <NavigationBar />
        <h2>Sajtok törlése</h2>
        <ul>
            {cheese.map((cheese) => (
                    <li key={cheese.id}>
                        {cheese.name} - {cheese.type} - {cheese.milk_type} - { cheese.aging_time } - { cheese.origin } - { cheese.flavor }
                        <span
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            onClick={ () => handleDelete(cheese.id)}
                        >Törlés</span>
                    </li>
                    )
                )
            }
        </ul>
    </>
}
