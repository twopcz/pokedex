import { useEffect, useState } from 'react';
import { getPokemonData } from '../utils/request';
import List from '../components/List';

const baseURL: string = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`;

export default function Home(): JSX.Element {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [nextPokemonList, setNextPokemonList] = useState<Array<Object>>([]);
    const [showPrevious, setShowPrevious] = useState<Boolean>(false);
    const [homePage, setHomePage] = useState<Array<Object>>([]);

    useEffect(() => {
        const getData = async () => {
            const fetchPokemon = await getPokemonData(baseURL);
            setPokemonList(fetchPokemon);
            setHomePage(fetchPokemon);
        };

        if (pokemonList.length === 0) {
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPokemonList]);

    const updatePokemonList = async () => {
        const newPokemon = await getPokemonData(pokemonList[`next`]);
        setNextPokemonList(newPokemon);
        setPokemonList(newPokemon);
        setShowPrevious(true);
    };

    const updatePreviousPokemonList = async () => {
        const oldPokemon = await getPokemonData(pokemonList[`previous`]);
        setPokemonList(oldPokemon);

        if (!oldPokemon[`previous`]) {
            setShowPrevious(false);
        }
    };

    return (
        <div className="home-container pb-10">
            <List
                pokemonList={pokemonList[`results`]}
                showHomePage={setPokemonList}
                homePageList={homePage}
                showPrevious={setShowPrevious}
            />
            <div className="pagination-button-container flex justify-around text-center text-[28px]">
                {showPrevious ? (
                    <div className="previous-button-container font-bold">
                        <button onClick={() => updatePreviousPokemonList()}>
                            Previous Page
                        </button>
                    </div>
                ) : null}
                <div className="next-button-container font-bold">
                    <button onClick={() => updatePokemonList()}>
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
}
