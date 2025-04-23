import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { URL, URLSearchParams } from 'whatwg-url';
import {ApolloClient, InMemoryCache} from "@apollo/client";

configure({
    testIdAttribute: 'data-testid',
    asyncUtilTimeout: 1000
});

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

export const testApolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});