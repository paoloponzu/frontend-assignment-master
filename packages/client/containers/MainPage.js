import React, { useState } from 'react';
import TableCustom from '../components/TableCustom';
import SearchInput from '../components/SearchInput';
import { GET_POKEMONS } from '../query/pokemons'
import { GET_POKEMONS_BY_TYPE } from '../query/pokemonsByType'
import { withApollo } from 'react-apollo';
import pokedex from '../image/Pokedex.png'


const MainPage = (props) => {
    //state
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [dataTable, setDataTable] = useState([]);
    const [dataPage, setDataPage] = useState();


    /*     React.useEffect = (() => {
            if (dataTable.length === 0) {
                console.log(count)
                props.client.query({
                    query: GET_POKEMONS,
                    variables: { q: searchValue },
                }).then((data) => {
                    if (data && data.data && data.data.pokemons && data.data.pokemons.edges) {
                        setDataTable(data.data.pokemons.edges);
                        setDataPage(data.data.pokemons.pageInfo);
                    }
                }).catch((err) => {
                    console.log('catch', err)
                })
            }
        }); */

    const getPokemons = (newPage, page) => {
        var newVar = {}
        if (newPage) {
            newVar = { q: searchValue, after: newPage }
        } else {
            newVar = { q: searchValue }
        }
        props.client.query({
            query: GET_POKEMONS,
            variables: newVar,
        }).then((data) => {
            if (data && data.data && data.data.pokemons && data.data.pokemons.edges) {
                setDataTable(data.data.pokemons.edges);
                setDataPage(data.data.pokemons.pageInfo);
                page && setPage(page)
            }
        }).catch((err) => {
            console.log('catch', err)
        })
    }

    const onChangePage = (page, searchText) => {
        console.log({ page })
        console.log({ searchText })
        if (searchText && searchText.trim().length > 0) {
            getPokemonsByType(searchText, dataPage.endCursor, page);
        } else {
            var newPage = page - 1;
            var newPage = newPage > 10 ? newPage * 10 : '0' + (newPage * 10);
            getPokemons(newPage, page);
        }
    };

    const getPokemonsByType = (type, after, page) => {
        props.client.query({
            query: GET_POKEMONS_BY_TYPE,
            variables: { type: type, after: after },
        }).then((data) => {
            if (data && data.data && data.data.pokemonsByType && data.data.pokemonsByType.edges) {
                setDataTable(data.data.pokemonsByType.edges);
                setDataPage(data.data.pokemonsByType.pageInfo);
                page && setPage(page)
            }
        }).catch((err) => {
            console.log('catch', err)
        })
    }

    const handleResetData = () => {
        setSearchValue("")
        setPage(1)
        setDataTable()
        setDataPage()
    }

    return (
        <div>
            <div className="header">
                <img className="img-size" src={pokedex} alt="Pokedex" />
            </div>
            <br />
            <div className="mrg-leftRight25">
                <SearchInput
                    value={searchValue}
                    handleChange={setSearchValue}
                    getData={getPokemons}
                />
                <br />
                <TableCustom
                    data={dataTable}
                    page={page}
                    onChangePage={onChangePage}
                    dataPage={dataPage}
                    getPokemonsByType={getPokemonsByType}
                    handleResetData={handleResetData}
                />
            </div>
        </div>
    )
}
export default withApollo(MainPage);