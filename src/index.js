import React from "react"
import {createRoot} from "react-dom/client"
import "./style/main.scss"

const container = document.getElementById('root')
const root = createRoot(container)
const App = () =>{
    return (
    <div>
        hola
    </div>
    );
}
root.render(<App/>)