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

export const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $role: String) {
        signUp(username: $username, email: $email, password: $password, role: $role)
    }
`

export const SIGN_IN = gql`
    mutation SignIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password)
    }
`