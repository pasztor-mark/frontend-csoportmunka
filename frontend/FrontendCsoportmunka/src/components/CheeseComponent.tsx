import { Card } from "react-bootstrap";

interface CheeseCardProps {
    id: number;
    name: string;
    type: string;
    milk_type: string;
    aging_time: number;
    origin: string;
    flavor: string;
}

export const CheeseComponent = (props: CheeseCardProps) => {
    return (
        <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.type}</Card.Subtitle>
                <Card.Text>
                    <strong>Tejféle:</strong> {props.milk_type} <br />
                    <strong>Érlelési idő:</strong> {props.aging_time} hónap <br />
                    <strong>Származás:</strong> {props.origin} <br />
                    <strong>Íz:</strong> {props.flavor} <br />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
