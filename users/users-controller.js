import * as userDao from './users-dao.js'

let currentUser = null

const UsersController = (app) => {

    const findAllUsers = async (req, res) => {
        const users = await userDao.findAllUsers()
        res.json(users)
    }
    const createUser = async (req, res) => {
        const newUser = req.body;
        const actualUser = await userDao.createUser(newUser)
        res.json(actualUser)
    }
    const updateUser = () => {}
    const deleteUser = () => {}

    const register = async (req, res) => {
        console.log("in register");
        const user = req.body;
        const existingUser = await userDao
            .findUserByUsername(user.email)
        if(existingUser) {
            res.send({message:"Duplicate Email"})
            return;
        }
        const currentUser = await userDao.createUser(user)
        // req.session['currentUser'] = currentUser

        res.status(200).send({message:"Success",userDetail:currentUser})
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findUserByCredentials(
                credentials.email, credentials.password)
        if(existingUser) {
            res.status(200).send({message:"Logged In",userDetail:existingUser})
            return
        }
        else
            res.send({message:"E-mail and Password combination is not valid!",userDetail:existingUser})
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const profile = (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const findUserById = async (req, res) => {
        const uid = req.params.uid
        const user = await userDao.findUserById(uid)
        if (user) {
            res.json(user)
            return
        }
        res.sendStatus(404)
    }

    app.get('/users', findAllUsers)
    app.get('/users/:uid', findUserById)
    app.post('/users', createUser)
    app.put('/users/:uid', updateUser)
    app.delete('/users/:uid', deleteUser)

    app.post('/sign-up', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', profile)
}

export default UsersController