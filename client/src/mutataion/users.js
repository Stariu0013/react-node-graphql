import {gql} from "@apollo/client";

export const CREATE_USER = gql`
    mutation($input: UserInput) {
        createUser(input: $input) {
            id, username, age
        }
    }
`;