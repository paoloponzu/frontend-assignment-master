import gql from "graphql-tag";

export const GET_POKEMONS_BY_TYPE = gql`
    query PokemonsByType($type: String!, $after: ID){ 
        pokemonsByType(type: $type, after: $after){
            edges{
                node{
                    id,
                    name,
                    types,
                    classification
                }
            },
            pageInfo{
                endCursor,
                hasNextPage,
                count
            }   
        }
    }
`;