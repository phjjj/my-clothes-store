import "sanitize.css"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

body{
    padding: 0;
    margin: 0;
    background-color: #F0F0F0;    
}

h1 {
    margin: 0;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
a {
    text-decoration: none;
    color: inherit;
}

`
