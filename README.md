# 3.6: Phonebook backend step 6

The changes that have been made:

## index.js

Made a change to the `app.post('/api/persons', ...)` endpoint. 

In 3.5, when adding a contact, only the contact's name and number are checked. If any of this information is missing, an error message is returned.

In 3.6, an extra control was added when adding a person. This check checks if the name of the person you want to add already exists. If the name of the person to be added already exists, a "name must be unique" error is returned. This prevents adding more than one person with the same name.
