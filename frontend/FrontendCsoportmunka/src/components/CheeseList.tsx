import { useEffect, useState } from "react"
import { NavigationBar } from "./NavigationBar";
import { CheeseComponent } from "./CheeseComponent";


export interface Cheese {
    id?: number;
    nev: string;
    tipus: string;
    tejfele: string;
    erlelesi_ido: number;
    szarmazas: string;
    iz: string;
}

export default function CheeseList() {

    const [cheese, setCheese] = useState<Cheese[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    
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
                console.log(data as Cheese)
                setCheese(data as Cheese);
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
        
        <h2>Sajtok listája</h2>
        <ul>
            {cheese.map((cheese) => (
                    <CheeseComponent cheese={cheese} key={cheese.id}>
                        
                    </CheeseComponent>
                    )
                )
            }
        </ul>
    </>
}