
import productos from "..data/productos.json";
import "./Catalogo.css";
export default function Catalogo(){
    return(
        <section className="catalogo">
            {productos.map((productos)=>(
                <productos {...productos}/>
            ))
            }
        </section>
    )
}