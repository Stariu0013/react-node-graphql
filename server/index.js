const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./schema/schema');

const users = [
    {
        id: 1,
        username: 'Vladyslav',
        age: 21,
    },
];

const app = express();
app.use(cors());

const getNewUserId = () => {
    let id = 0;

    for (let i = 0 ; i < users.length ; i++) {
        id = Math.max(id, users[i].id);
    }

    return id + 1;
};

const createUser = (input) => {
    const id = getNewUserId();

    return {
        id,
        ...input,
    };
};

const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({id}) => {
        return users.find(user => user.id === id);
    },

    createUser: ({ input }) => {
        const user = createUser(input);
        users.push(user);

        return user;
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
}))

app.listen(5000, () => {
    console.log('Server started on port 5000')
});