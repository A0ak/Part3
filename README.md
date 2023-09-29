# 3.3: Phonebook backend step 3

The changes that have been made:

## index.js

1. `const url = require('url')`: url module has been added. This module is used to parse URLs.

2. `const reqUrl = url.parse(request.url, true)`: reqUrl.pathname started to be used instead of request.url. This is an object obtained by url.parse(request.url, true). This object contains various components of the URL.

3. `const id = reqUrl.pathname.split('/').pop()`:  A new variable named id has been added. This variable is obtained by reqUrl.pathname.split('/').pop() and represents the last part of the URL.

 4. `if (reqUrl.pathname.startsWith('/api/persons') ...  response.end('Person not found')`:  Checking the id variable and returning different responses accordingly: For requests to the /api/persons URL, the value of the id variable is checked. If id is 'persons', a list of all contacts is returned. If id is a number (i.e. the ID of a person), that person is returned. If no such person exists, a 'Person not found' message is returned.