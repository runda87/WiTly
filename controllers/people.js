import fs from 'fs';
import FormData from 'form-data';
import { fetchPerson , fetchPeople, createPerson } from "../api/people.js";


export const fetchPeopleController = async function (req, res) {
    const name = req.query.name;
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
    };
    } else {
        user = null;
    }
    const peopleData = await fetchPeople(name);
    if (peopleData) {
        res.render('index', {people: peopleData,
        user: user,
    });
    } else {
        res.send("Not Authorised");
    }
}

export const fetchPersonController = async function (req,res) {
    const personId = req.params.id;
    const personData = await fetchPerson(personId);
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
    };
    } else {
        user = null;
    }
    // console.log(personId);
    // console.log(personData);
    res.render('profile', { person: personData, user })
}

export const createPersonFormController = function (req, res){
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
    };
    } else {
        user = null;
    }
    res.render('newProfile', { user });
}

export const createPersonController = async function (req, res) {
    let personData = req.body;
    const form = new FormData();
    form.append('name', personData.name);
    form.append('tagline', personData.tagline);
    form.append('bio', personData.bio);
    const fileStream = fs.createReadStream(req.file.path);
    form.append('photo', fileStream, req.file.originalname);
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
    };
    } else {
        user = null;
    }
    
    let newPerson;
    try {
          newPerson = await createPerson(form);
    } catch (err) {
          console.log(err);
    }
    if (newPerson) {
          res.render('profile', { person: newPerson, user });
    } else {
          res.send('Error.');
    }
};