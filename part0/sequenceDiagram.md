Sequence Diagram
```mermaid
sequenceDiagram 
participant browser
participant server

browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
activate server
server-->>browser: HTML document
deactivate server

server->>browser: request for new GET request
activate browser
browser->>server: GET https://fullstack-exampleapp.herokuapp.com/new_note
deactivate browser
activate server
server-->>browser: HTML document
deactivate server
```
