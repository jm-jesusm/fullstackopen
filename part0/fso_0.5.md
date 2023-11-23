```mermaid
sequenceDiagram
    participant browser
    participant server

    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    deactivate browser

    activate server
    server-->>browser: index.html
    deactivate server

    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    deactivate browser

    activate server
    server-->>browser: main.css
    deactivate server

    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    deactivate browser

    activate server
    server-->>browser: spa.js
    deactivate server
    
    activate browser
    Note right of browser: spa.js execution
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    deactivate browser

    activate server
    server-->>browser: [{ "content": " ", "date": "2023-11-23T16:00:52.973Z" }, ... ]
    deactivate server

    activate browser
    Note right of browser: onReadyStateChange event trigger
    Note right of browser: DOM manipulation
    deactivate browser
```