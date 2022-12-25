import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/users";
import {CREATE_USER} from "./mutataion/users";

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
    const [newUser] = useMutation(CREATE_USER);

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data, loading]);

    const addUser = (event) => {
        event.preventDefault();

        newUser({
            variables: {
                input: {
                    username,
                    age,
                }
            }
        }).then(() => {
            setUsername('');
            setAge(0);
        })
    };

    const getAll = (e) => {
        e.preventDefault();

        refetch();
    }

    const handleUserNameChange = e => {
        const username = e.target.value;

        setUsername(username);
    };

    const handleAgeChange = e => {
        const age = +e.target.value;

        setAge(age);
    };

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            <form>
                <input value={username} onChange={handleUserNameChange} type="text"/>
                <input value={age} onChange={handleAgeChange} type="number"/>
                <div className="btns">
                    <button onClick={addUser}>Створити</button>
                    <button onClick={getAll}>Отримати</button>
                </div>
                <>
                    {
                        users.map(user => {
                            const {
                                id,
                                username,
                                age,
                            } = user;

                            return (
                                <div className="user">
                                    {id}. {username} {age}
                                </div>
                            )
                        })
                    }
                </>
            </form>
        </div>
    );
}

export default App;
