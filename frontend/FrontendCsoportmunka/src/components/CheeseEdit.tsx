import { useEffect, useState } from "react"
import { NavigationBar } from "./NavigationBar";
import { Cheese } from "./CheeseList";

export default function CheeseUpdate(){
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [milk_type, setMilk_type] = useState<string>('');
    const [aging_time, setAging_time] = useState<number>(0);
    const [origin, setOrigin] = useState<string>('');
    const [flavor, setFlavor] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState(null);
    useEffect(()=> {
        fetch("http://localhost:3000/sajtok")
            .then((response) => { 
                return response.json() 
            })
            .then((data) => {
                setId(data[data.length - 1].id + 1)
            })
    }, [])
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const newCheese: Cheese = {
            
            nev: name,
            tipus: type,
            tejfele: milk_type,
            erlelesi_ido: aging_time + " hónap",
            szarmazas: origin,
            iz: flavor,
        }
        try{
            const response = await fetch(`http://localhost:3000/sajtok/${id}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCheese)
            })
            if (!response.ok){
                throw new Error(`Szerverhiba: ${response.status}`);
            }
            setSuccess(true);
            setName('');
            setType('');
            setMilk_type('');
            setAging_time(0);
            setOrigin('');
            setFlavor('');
        } catch (err) {
            setError(err.message);
        } finally {
            // ...
        }
    }
    return <>
        
        <h2>Sajtok szerkesztése</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Szerkesztendő ID:</p>
                <input 
                    type="text" 
                    value={id}
                    required
                    onChange={ (e) => setId(e.target.value) }
                />
            </label>
            <label>
                <p>Name:</p>
                <input 
                    type="text" 
                    value={name}
                    required
                    onChange={ (e) => setName(e.target.value) }
                />
            </label>
            <label>
                <p>Type:</p>
                <input 
                    type="text" 
                    value={type}
                    required
                    onChange={ (e) => setType(e.target.value) }
                />
            </label>  
            <label>
                <p>Milk type:</p>
                <input 
                    type="text" 
                    value={milk_type}
                    required
                    onChange={ (e) => setMilk_type(e.target.value) }
                />
            </label>
            <label>
                <p>Aging time:</p>
                <input 
                    type="number" 
                    value={aging_time}
                    required
                    onChange={ (e) => setAging_time(parseInt(e.target.value)) }
                />
            </label>
            <label>
                <p>Origin:</p>
                <input 
                    type="text" 
                    value={origin}
                    required
                    onChange={ (e) => setOrigin(e.target.value) }
                />
            </label>
            <label>
                <p>Flavor:</p>
                <input 
                    type="text" 
                    value={flavor}
                    required
                    onChange={ (e) => setFlavor(e.target.value) }
                />
            </label>
            <button type="submit">Sajt felvétele</button>                   
        </form>
        { error && <p>Hiba történt: {error}.</p> }
        { success && <p>Sikeres a telefonfelvétel</p> }
    </>
}