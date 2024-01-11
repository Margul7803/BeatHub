const fetch = require('node-fetch');

async function checkUserExists(email){
    const response = await fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Problème lors de la récupération des utilisateurs');
    }
    const users = await response.json();
    const user = users["hydra:member"].find(u => u.email === email);
    if (user) {
        return user
    }else{
        return false
    }
}

module.exports = { checkUserExists }