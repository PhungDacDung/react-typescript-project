import React, { useEffect, useState } from "react";
import "./pokemon.css";
import { Detail } from "../App";


interface Props{
    detail: Detail;
    setDetail :React.Dispatch<React.SetStateAction<Detail>>;
    name:string;
    id:number;
    image:string;
    abilities :{
        ability: string,
        name:string,
      }[],
}

const PokemonList:React.FC<Props> = (props) => {
    const {name,id,image,abilities,detail,setDetail} = props;
    const [isSelected,setSelected] = useState(false);

    useEffect(() => {
        setSelected(id === detail?.id);
    },[detail]);

    return (
        <div className="">
            {isSelected? (
                <section className="pokemon-list-detail">
                    <div className="detail-container">
                        <p className="detail-close" >
                            X
                        </p>
                        <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab: any) => {
                return <div className=""> {ab.ability.name}</div>;
              })}
            </div>
          </div>
                </section>
            ) : (
                <section className="pokemon-list-container">
                <p className="pokemon-name">{name}</p>
                <img src={image} alt="pokemon" />
                
                 </section>
            )}
           
        </div>
    )
}

export default PokemonList