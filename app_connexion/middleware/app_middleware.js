import { authToken } from "../controller/app_controller.js";
import {is_user_admin_by_login} from "../repository/app_repository.js";
import {getLoginByToken} from "../memory_users/inMemoryUserRepository.js";

function loggerMiddleware(req, res, next) {
    console.log(req.body);
    next();
}

function headerMiddleware(req, res, next) {
    console.log(req.headers);
    next();
}

async function firewall_admin(req, res, next) {
    const URL_admin = ['/restricted2'];
    const requestedURL = req.url;
    if (!URL_admin.includes(requestedURL)) {
        console.log('rrrrrrrrrrrrrrrrrrr')
        next();
    } else {
        const token = req.headers.token;
        const login = getLoginByToken(token);
        const isAdmin = await is_user_admin_by_login(login);
        if (isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Accès refusé" });
        }
    }
}

function firewall(req, res, next) {
    const URL_public = ['/', '/hello', '/authenticate', '/register'];
    const requestedURL = req.url;
    if (URL_public.includes(requestedURL)) {
        next();
    } else {
        const token = req.headers.token;
        if (token && token === authToken) {
            next();
        } else {
            return res.status(403).json({ message: "Accès refusé" });
        }
    }
}

export { loggerMiddleware, headerMiddleware, firewall, firewall_admin };