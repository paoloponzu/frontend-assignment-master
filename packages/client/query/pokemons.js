import gql from "graphql-tag";

export const GET_POKEMONS = gql`
    query pokemons($q: String, $after: ID){
        pokemons(q: $q, after: $after){
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