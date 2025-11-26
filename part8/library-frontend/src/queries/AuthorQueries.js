import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            bookCount
            born
        }
    }
`;

export const EDIT_AUTHOR_BIRTH_YEAR = gql`
    mutation editAuthorBirthYear($name: String!, $birth: Int!) {
        editAuthor(
            name: $name
            setBornTo: $birth
        ) {
            name
            born
        }
    }
`;
