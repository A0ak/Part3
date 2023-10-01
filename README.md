# 3.5: Phonebook backend step 5


The changes that have been made:


## index.js

1. I used express module instead of http and url modules. It allows me to get rid of long JavaScript conditional statements and makes the code more readable. 

2. `app.use(express.json())`: With this statement, JSON processing capability is added to the Express.js application. This is used to parse JSON data in the bodies of incoming requests.

3. I defined a separate handler for each route and HTTP method.

4. `app.get('/api/persons')` : This renderer returns the list of contacts as an HTML table. I changed the appearance of the contact list on my server page. I made it look more readable.

5. `app.get('/api/persons/:id')` : This handler returns the person with a given ID.

6. `app.delete('/api/persons/:id')` : This handler deletes the contact with a specific ID.

7. `app.post('/api/persons')` : This handler adds a new contact. Returns an error in case of missing information.

8. `app.get('/info')` : This handler returns the number of people in the 'persons' array and the current date and time.

9. The message indicating that the server has started listening is printed in the callback function of app.listen. This is used to verify that the server has started successfully.

