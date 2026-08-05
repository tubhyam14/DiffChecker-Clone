import "./Editor.css";

export default function Editor({
    title,
    value,
    onChange
}) {

    return (

        <div className="editor">

            <h3>{title}</h3>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type or paste text..."
            />

        </div>

    );

}
