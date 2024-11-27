import '../App.css'

export default function Switch({initial = false, onChange }: {initial: boolean, onChange: any}) {
    return (

        <label className="switch">
    <input
        type="checkbox"
        
        onChange={(e) => onChange(e)}
        />
    <span className="slider round"></span>
</label>
    )
}