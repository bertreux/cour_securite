DROP DATABASE IF EXISTS cour_securite;
CREATE DATABASE cour_securite;

USE cour_securite;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_label varchar(255)
);

CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO `roles` (`id`, `role_label`) VALUES
    (NULL, 'ROLE_USER'),
    (NULL, 'ROLE_ADMIN');

DELIMITER //

CREATE TRIGGER after_insert_user
    AFTER INSERT ON users
    FOR EACH ROW
BEGIN
    DECLARE role_id INT;
    SELECT id INTO role_id FROM roles WHERE role_label = 'ROLE_USER';
    INSERT INTO user_roles (user_id, role_id) VALUES (NEW.id, role_id);
END;
//

DELIMITER ;
