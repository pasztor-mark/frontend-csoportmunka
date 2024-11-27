import { useState, useEffect } from 'react';
import { Cheese } from '../components/CheeseList';
import { CheeseComponent } from '../components/CheeseComponent';
import Switch from '../components/Toggle';

const Home = () => {
    const [sajtok, setSajtok] = useState<Cheese[]>([]);
    const [filter, setFilter] = useState<Cheese[]>(sajtok);
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const [orderFactor, setOrderFactor] = useState("id");

    const fetchCheeses = (page: number) => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/home?page=${page}&limit=4`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSajtok(data.data);
                setFilter(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCheeses(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const sortCheeses = (key: keyof Cheese, direction: true | false) => {
        const sortedCheeses = [...filter].sort((a, b) => {
            if (a[key] < b[key]) return direction === true ? -1 : 1;
            if (a[key] > b[key]) return direction === false ? 1 : -1;
            return 0;
        });
        setFilter(sortedCheeses);
        
    };
    return (
        <div>
            <input type='search' placeholder='Keresés' onChange={(e) => { setSearchTerm(e.target.value); setFilter(sajtok.filter((s) => s.nev.toLowerCase().includes(searchTerm.toLowerCase()))) }} />
            <div className='d-flex flex-row gap-4 flex-wrap mx-auto justify-content-center'>
                {filter.map((sajt) => (
                    <CheeseComponent cheese={sajt} />
                ))}
            </div>
            <h5>Rendezés attribútum szerint</h5>
            <div className='d-flex  gap-4'>

            Név<input type="radio" name="order_by" value="nev" onChange={(e) => setOrderFactor(e.target.value)} />
            Típus<input type="radio" name="order_by" value="tipus" onChange={(e) => setOrderFactor(e.target.value)}/>
            Tejféle<input type="radio" name="order_by" value="tejfele" onChange={(e) => setOrderFactor(e.target.value)}/>
            Érlelés<input type="radio" name="order_by" value="erlelesi_ido" onChange={(e) => setOrderFactor(e.target.value)}/>
            Származás<input type="radio" name="order_by" value="szarmazas" onChange={(e) => setOrderFactor(e.target.value)}/>
            Íz<input type="radio" name="order_by" value="iz" />
                DESC
            <Switch initial={false} onChange={(e) => {sortCheeses(orderFactor as keyof Cheese, e.target.checked)}}/>
            ASC
            </div>

            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Előző
                </button>
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Következő
                </button>
            </div>
        </div>
    );
};

export default Home;
