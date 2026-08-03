import "./App.css";

import Header from "./components/Header/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import Editor from "./components/Editor/Editor";

function App(){

    return(

        <div className="app">

            <Header/>

            <Toolbar/>

            <div className="editor-container">

                <Editor title="Original"/>

                <Editor title="Modified"/>

            </div>

        </div>

    )

}

export default App;
