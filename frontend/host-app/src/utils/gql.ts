import {gql} from "@apollo/client";

export const LOGIN_CHECK = gql`
    query LoginCheck ($token: String!) {
        loginCheck(token: $token)
    }
`

export const GET_TASKS = gql`
    query Tasks {
        tasks {
            id,
            name
            status
            title
            description
        }
    }
`;

export const TASK_ADDED_SUBSCRIPTION = gql`
    subscription OnTaskAdded {
        taskAdded {
            id
            name
            title
            status
            description
        }
    }
`;