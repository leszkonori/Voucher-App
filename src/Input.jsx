export default function Input({ label, type }) {
    return (
        <>
            <label>{label}</label>
            <input type={type} />
        </>
    );
}