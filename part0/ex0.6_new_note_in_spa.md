``` mermaid
sequenceDiagram

    participant user
    participant browser
    participant server

    user ->> browser: user enters new note & clicks save
    activate browser
    browser ->> browser: redrawNotes()
    browser ->> server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    deactivate browser
    note right of browser: sends the content that the user typed to server through sendToServer(note)



```