https://www.websequencediagrams.com/

# 0.4.

title New Note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server->browser: 302 status code, /notes

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server->browser: html
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note


# 0.5.

title SPA Note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server->browser: html
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

# 0.6

title SPA New Note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server->browser: 201 status code

note over browser:
browser executes the event handler
that adds new note to the list
end note
