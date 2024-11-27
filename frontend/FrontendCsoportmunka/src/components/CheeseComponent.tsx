import { Card } from "react-bootstrap";
import { Cheese } from "./CheeseList";



export const CheeseComponent = ({cheese}: {cheese: Cheese}) => {
    return (
        <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
                <Card.Title>{cheese.nev}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{cheese.tipus}</Card.Subtitle>
                <Card.Text>
                    <strong>Tejféle:</strong> {cheese.tejfele} <br />
                    <strong>Érlelési idő:</strong> {cheese.erlelesi_ido} hónap <br />
                    <strong>Származás:</strong> {cheese.szarmazas} <br />
                    <strong>Íz:</strong> {cheese.iz} <br />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
