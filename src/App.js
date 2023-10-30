import React, { useState, useEffect } from 'react';
import api from './api.js';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [notification, setNotification] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.getAll().then(response => {
            console.log('API response:', response);
            if (Array.isArray(response)) {
                const validPersons = response.map(person => ({
                    id: person._id,
                    name: person.name,
                    number: person.number
                }));
                setPersons(validPersons)
            } else {
                console.error('API response is not an array');
                setPersons([])
            }
        })
    }, []);

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    };

    const addName = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber,
        };
        const existingPerson = persons.find(person => person.name === newName);
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                api.update(existingPerson.id, nameObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
                        setNewName('')
                        setNewNumber('')
                        setNotification({ message: `Updated ${newName}`, type: 'success' });
                        setTimeout(() => {
                            setNotification(null);
                        }, 5000);
                    })
                    .catch(error => {
                        setNotification({ message: `The information of ${newName} has already been removed from server`, type: 'error' });
                        setTimeout(() => {
                            setNotification(null);
                        }, 5000);
                    })
            }
        } else {
            api.create(nameObject).then(() => {
                api.getAll().then(response => {
                    setPersons(response);
                    setNewName('');
                    setNewNumber('');
                    setNotification({ message: `Added ${newName}`, type: 'success' });
                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                });
            }).catch(error => {
                setNotification({ message: `Failed to add ${newName}`, type: 'error' });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            });
        }
    };



    const filteredPersons = persons
        ? persons.filter(person =>
            person.name && person.name.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <div>
            <h2>Phonebook</h2>
            {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}
            <div>
                Search: <input value={search} onChange={handleSearchChange} />
            </div>
            <h2>Add a new</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {filteredPersons.map((person) => {
                    console.log('Person:', person);
                    return (
                        <div key={person.id}>
                            <span>- {person.name} {person.number}</span>
                            <button onClick={() => deleteName(person.id)}>delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}


export default App;



