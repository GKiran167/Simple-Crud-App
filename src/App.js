import React, { useEffect, useState } from 'react';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';
import './App.css';

const AppToaster = Toaster.create({
    position: "top"
})

function App() {

    const [users, setUsers] = useState([]);
    const [newUser, SetNewUser] = useState({
        name: "",
        email: "",
        website: ""
    });

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            });
    }, []);


    //create user or esle adding new user ( create cmponent)
    //------------------------------------------------------
    function addUser() {
        const name = newUser.name;
        const email = newUser.email;
        const website = newUser.website;

        if (name && email && website) {
            fetch('https://jsonplaceholder.typicode.com/users',
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        website
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }
            ).then(response => response.json())
                .then(data => {
                    setUsers(users => [...users, data])
                    AppToaster.show({
                        message: "User added successfully",
                        intent: "success",
                        timeout: 3000
                    })
                    SetNewUser({ name: "", email: "", website: "" });

                });
        }
    }

    //update component code's here...
    // onChangeHandler function update the change user data in User Object using setUser function
    //onChangeHandler Code...........

    function onChangeHandler(id, key, value) {
        setUsers((users) => {
            return users.map(user => {
                return user.id === id ? { ...user, [key]: value } : user;
            })
        })
    }

    //update Component....
    //-------------------------------

    function updateUser(id) {
        const user = users.find((user) => user.id === id);

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }
        ).then(response => response.json())
            .then(data => {
                // setUsers(users => [...users, data])
                AppToaster.show({
                    message: "User Updated successfully",
                    intent: "success",
                    timeout: 3000
                })
            });
    }


    //Delete Component......
    //delete user data in field.....
    //------------------------------------------

    function deleteUser(id) {
    
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: "DELETE",
            }
        ).then(response => response.json())
            .then(data => {
                setUsers(users => users.filter(user => user.id !== id));
                AppToaster.show({
                    message: "User deleted successfully",
                    intent: "success",
                    timeout: 3000
                })
            });
    }

    //App component reurn statement -------------------
    //contains all crud app components------------------
    return (
        <div className="App">
            <table className='bp4-html-table modifier'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td><EditableText value={user.email} onChange={value => onChangeHandler(user.id, "email", value)} /></td>
                                <td><EditableText value={user.website} onChange={value => onChangeHandler(user.id, "website", value)} /></td>
                                <td>
                                    <Button intent='primary' onClick={() => updateUser(user.id)}>Update</Button>
                                    &nbsp;
                                    <Button intent='danger' onClick={() => deleteUser(user.id)}>Delete</Button>
                                </td>
                            </tr>)
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <InputGroup value={newUser.name} onChange={(e) => SetNewUser(previousval => ({ ...previousval, name: e.target.value }))} placeholder='Enter Name...' />
                        </td>
                        <td>
                            <InputGroup value={newUser.email} onChange={(e) => SetNewUser(previousval => ({ ...previousval, email: e.target.value }))} placeholder='Enter Email...' />
                        </td>
                        <td>
                            <InputGroup value={newUser.website} onChange={(e) => SetNewUser(previousval => ({ ...previousval, website: e.target.value }))} placeholder='Enter Website...' />
                        </td>
                        <td>
                            <Button intent='success' onClick={addUser}>Add User  </Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );


}

export default App;
