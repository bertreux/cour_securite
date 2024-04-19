import { checkCredentials, getAuthentificatedUsers, getTokenByLogin, newUserRegistered } from "../memory_users/inMemoryUserRepository.js";

let authToken = null;

const home = (req, res) => {
    return res.render('index.njk')
};

const hello = (req, res) => {
    return res.send('<p>hello</p>');
};

const restricted1 = (req, res) => {
    return res.status(200).json({ message: "topsecret" });
};

const restricted2 = (req, res) => {
    return res.send('<h1>Admin space</h1>');
};

const authenticate = async (req, res) => {
    const { login, password } = req.body;
    if (await checkCredentials(login, password)) {
        let tokenAlreadyCreated = getTokenByLogin(login)
        if(tokenAlreadyCreated != 0) {
            authToken = tokenAlreadyCreated;
        } else {
            let authenticatedUsers = getAuthentificatedUsers()
            authToken = Math.random().toString(36).substring(7);
            authenticatedUsers[authToken] = { login: login };
        }
        res.json({ token: authToken });
    } else {
        res.status(403).json({ message: "Identifiants incorrects" });
    }
};

const register = async (req, res) => {
    const { login, password } = req.body;
    let isAlreadyCreated = await newUserRegistered(login, password);
    if(isAlreadyCreated){
        console.log('test2')
        return res.json({ message: 'utilisateur créer' });
    } else {
        console.log('test')
        return res.status(403).json({ message: 'utilisateur existe déjà' });
    }
};

export { home, hello, restricted1, restricted2, authenticate, register, authToken };