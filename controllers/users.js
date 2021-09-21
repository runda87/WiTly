
import { createUser } from "../models/users.js";

export const createUserFormController = function (req, res) {
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
    };
    } else {
        user = null;
    }
    return res.render('createAccount', { user} );
};

export const createUserController = async function (req, res) {
    let userData = req.body;
    const user = await createUser(userData);
    return res.redirect('/')
};

export const loginFormController = function (req, res) {
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
    };
    } else {
        user = null;
    }
    return res.render('login', { user} );
};

