import { useEffect, useState } from "react"
import { NavigationBar } from "./NavigationBar";
import { Cheese } from "./CheeseList";
import { CheeseComponent } from "./CheeseComponent";




export default function CheeseDelete() {

    const [cheese, setCheese] = useState<Cheese[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    
    const handleDelete = async(id) => { 
        const answer = confirm("Biztosan akarod törölni?");
        if(answer){
            //alert("Törlendő telefon: " + id) 
            try {
                const response = await fetch(`http://localhost:3000/sajtok/${id}`, {
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
        
        <h2>Sajtok törlése</h2>
        <ul>
            {cheese!.map((cheese) => (
                <div className="d-flex flex-row items-center">
                    <CheeseComponent cheese={cheese} key={cheese.id}/>
                    <span
                            style={{ cursor: 'pointer', backgroundColor: "red", marginLeft: '10px' }}
                            onClick={ () => handleDelete(cheese.id)}
                        >Törlés</span>
                </div>
                        

                    
                    )
                )
            }
        </ul>
    </>
}
