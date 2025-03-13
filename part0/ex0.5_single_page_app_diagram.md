``` mermaid
sequenceDiagram

    participant browser
    participant server

    browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server ->> browser: HTML document
    deactivate server

    browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server ->> browser: main.css 
    deactivate server

    browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server ->> browser: spa.js
    note right of browser: browser runs GET for json file
    deactivate server

    browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server ->> browser: the json data
    note right of browser: browser runs onreadystatechange once data for JSON has been received
    deactivate server





```