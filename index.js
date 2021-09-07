import express from 'express';
import peopleRouter from './routes/people.js'


const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', './views/pages/');
app.use( express.static( 'public' ) );

app.listen(3000, () => {
    console.log('server started!')
});

app.use('/', peopleRouter)


app.get('/', (req,res) => {
    console.log(usersData);
    res.render('index', { login: usersData});
});

app.get('/login/:id', (req, res) => {
    let personId = req.params.id;
    let users;
    userData.forEach((usersData) => {
        if (usersData.id == personId) {
            person = usersData;
        }
    })
    console.log(users);
    res.render('login', { users: users});
})

app.get('/loginform', function(req, res, next) { 
    res.render('login', { title: 'Login Page', message }); 
 }); 

 app.get('/userprofile',  function(req, res, next) {
    res.render('profile', { title: 'Profile Page', user : req.user,
    avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d:
     'retro'}, true) });
});

app.get('/signup', function(req,res, next) {
    res.render('signup', { titile: 'Sign up', });
});

