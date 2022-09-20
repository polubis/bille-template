import { createGlobalStyle } from 'styled-components';
import fonts from './fonts.module.css';

export const GlobalStyle = createGlobalStyle`
    ${fonts}

    body {
        margin: 0 !important;
        padding: 0 !important;
        background: #fff;
    }    

    * {
        box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p {
        margin: 0;
    }
`;
