import "./styles/style.scss";
import pokemonArray from "./data/pokemon.ts";
import { Pokemon } from "./data/types.ts";

const cardCointainer = document.querySelector<HTMLBodyElement>(".card-container");
const searchBox = document.querySelector<HTMLInputElement>("#search-box");


if(!cardCointainer) {
    throw new Error("Issue With Selector!");
}

const showPokemon = () => {
    
    cardCointainer.innerHTML = "";

    pokemonArray.forEach(pokemon => {
        
        const joinPokemon = pokemon.types.join(" & ")
        
        cardCointainer.innerHTML += 
            `<div class="card">
                <img class="card__image" src="${pokemon.sprite}"></img>
                <div class="card__content">
                    <h2 class="card__heading">${pokemon.name}</h2>
                    <p class="card__text">${pokemon.name} (#${pokemon.id}) is a ${joinPokemon} type pokemon.</p>
                </div>
            </div>`;
    
    });
    
}

showPokemon();

const filterPokemon = () => {

    cardCointainer.innerHTML = "";

    if(searchBox?.value === "") {
        
        showPokemon();
        
    } else {
        
        const pokemonKeys = Object.values(pokemonArray);

        pokemonKeys.filter((items : Pokemon) => {
    
            if(searchBox?.value === items.name || searchBox?.value === String(items.types)) {
                            
                return items.name + items.types;
            } else { 
    
                return false;
            }
    
        }).map((entry) => {
            
            const joinPokemon = entry.types.join(" & ");

            return cardCointainer.innerHTML += 
            `<div class="card">
                <img class="card__image" src="${entry.sprite}"></img>
                <div class="card__content">
                    <h2 class="card__heading">${entry.name}</h2>
                    <p class="card__text">${entry.name} (#${entry.id}) is a ${joinPokemon} type pokemon.</p>
                </div>
            </div>`;
    
        });
    }
        
}


searchBox?.addEventListener("input", filterPokemon);

