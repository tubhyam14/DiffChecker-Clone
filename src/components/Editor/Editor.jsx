import "./Editor.css";

export default function Editor({title}){

    return(

        <div className="editor">

            <h3>{title}</h3>

            <textarea
                placeholder="Type or paste text here..."
            />

        </div>

    )

}
