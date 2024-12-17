export default function ErrorMessage({error}) {

    return (
        <div className="mt-3">
            <p className="italic text-base">{error}</p>
        </div>
    );
}