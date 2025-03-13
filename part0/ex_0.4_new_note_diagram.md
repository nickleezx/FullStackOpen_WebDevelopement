``` mermaid
sequenceDiagram

    participant user
    participant browser
    participant server

    user ->> browser: INPUT new note & clicks save button
    browser ->> server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note

    server ->> browser: HTTP code: 302
    Note left of server: server tells browser to perform new GET request to https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of browser: Browser redirects to given url and fetches necessary data for this page

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server -->> browser: HTML document
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: the css file
    deactivate server

    browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server -->> browser: the JavaScript file
    deactivate server
    Note right of browser: The browser executes main.js to fetch json file

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server ->> browser: the json file
    deactivate server
    activate browser
    Note right of browser: once the data is sent over, onreadystatechange parses the data and renders the ul
    browser ->> user: loads the content on screen to show user
    deactivate browser


    

``` 