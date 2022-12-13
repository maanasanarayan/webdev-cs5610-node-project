import * as dao from './users-dao.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {findByCredentials, findByUsername} from "./users-dao.js";


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

let currentUser = null

const UsersController = (app) => {
    const createUser = async (req, res) => {
        const user = req.body
        const actualUser = await dao.createUser(user)
        res.json(actualUser)
    }
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers()
        res.json(users)
    }
    const deleteUser = async (req, res) => {
        const uid = req.params.uid
        const status = await dao.deleteUser(uid)
        res.json(status)
    }
    const updateUser = async (req, res) => {
        const uid = req.params.uid
        const updates = req.body
        const status = await dao.updateUser(uid,  updates)
        res.json(status)
    }

    const register = async (req, res) => {
        const { fname, lname, email, password,address,phonenumber, dob, gender,role, } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);
        try {
          const oldUser = await User.findOne({ email });
      
          if (oldUser) {
            return res.json({ error: "User Exists" });
          }
          await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            
          address,
          phonenumber,
          dob,
          gender,
          role,
          });
          res.send({ status: "ok" });
        } catch (error) {
          res.send({ status: "error" });
        }
    }

    const login = async (req, res) => {
        const { email, password } = req.body;
      
        const user = await User.findOne({ email });
        if (!user) {
          return res.json({ error: "User Not found" });
        }
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ email: user.email }, JWT_SECRET);
      
          if (res.status(201)) {
            return res.json({ status: "ok", data: token });
          } else {
            return res.json({ error: "error" });
          }
        }
        res.json({ status: "error", error: "InvAlid Password" });
      }

    const profile = async (req, res) => {
        const { token } = req.body;
        try {
          const user = jwt.verify(token, JWT_SECRET);
          console.log(user);
      
          const useremail = user.email;
          User.findOne({ email: useremail })
            .then((data) => {
              res.send({ status: "ok", data: data });
            })
            .catch((error) => {
              res.send({ status: "error", data: error });
            });
        } catch (error) {}
      }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    }

    app.post('/users', createUser)
    app.get('/users', findAllUsers)
    app.delete('/users/:uid', deleteUser)
    app.put('/users/:uid', updateUser)

    app.post('/register', register)
    app.post('/login-user', login)
    app.post('/userData', profile)
    app.post('/logout', logout)
}

export default UsersController