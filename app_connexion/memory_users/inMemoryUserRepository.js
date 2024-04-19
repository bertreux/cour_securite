import bcrypt from "bcrypt";
import { getRegisteredUsers, insert_new_user } from "../repository/app_repository.js";

//const registeredUsers = [
//    { login: "user1@gmail.com", password: "$2b$10$l36npwjf4epB3BP.W0Zd.eP9KrEes7.io2X2gtI3UdSoLjiDQcWOy" },
//    { login: "user2@gmail.com", password: "$2b$10$MGThRU8J8PP5Tn3xQklDfeuOqf5ddjp0YtCaz7/4/jtWPGRzazD16" }
//];

let authenticatedUsers = {};

//function getRegisteredUsers() {
//    return registeredUsers;
//}

function getAuthentificatedUsers() {
    return authenticatedUsers;
}

function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

async function newUserRegistered(login, password) {
    const registeredUsers = await getRegisteredUsers();
    const isUserNotConnected = registeredUsers.some(user => user.login === login);
    if(!isUserNotConnected){
        await insert_new_user(login, hashPassword(password));
        return true;
    } else {
        return false;
    }
}

function checkPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}

async function checkCredentials(login, password) {
    const registeredUsers = await getRegisteredUsers();
    return registeredUsers.some(user => user.login === login && checkPassword(password, user.password));
}

function getTokenByLogin(login) {
    for (let token in authenticatedUsers) {
      if (authenticatedUsers[token].login === login) {
        return token;
      }
    }
    return false;
}

function getLoginByToken(token) {
    return authenticatedUsers[token].login;
}

export { newUserRegistered, checkCredentials, getTokenByLogin, getAuthentificatedUsers, getLoginByToken };