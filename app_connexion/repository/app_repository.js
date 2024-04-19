import db_connection from "../service/db_connection.js";

const insert_new_user = async (login, password) => {
    const db = await db_connection();
    try {
        const [ results ] = await db.query('INSERT INTO cour_securite.users VALUE(NULL, :login, :password)',
            {login : login, password: password}
        );
        return results;
    } catch (error) {
        return error;
    }
};

const getRegisteredUsers = async () => {
    const db = await db_connection();
    try {
        const [ results ] = await db.query('SELECT * FROM cour_securite.users');
        return results;
    } catch (error) {
        return error;
    }
}

const is_user_admin_by_login = async (login) => {
    const db = await db_connection();
    try {
        const [ results ] = await db.query("SELECT * FROM cour_securite.users JOIN cour_securite.user_roles ON users.id = user_roles.user_id JOIN cour_securite.roles r on r.id = user_roles.role_id WHERE users.login = :login AND r.role_label = 'ROLE_ADMIN'",
            {login: login});
        return results.length !== 0;
    } catch (error) {
        return error;
    }
}

export { insert_new_user, getRegisteredUsers, is_user_admin_by_login }