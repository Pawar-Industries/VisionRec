const express = require('express');
const router = express.Router();
const { User, roles } = require('../models/Users');
const helper = require("../config/helpers");
const userData = require('../data/Users');

router.post("/createUser", async (req, res) => {
    const usersData = req.body;
    try {
        usersData.name = helper.checkName(usersData.name);
        usersData.email = helper.checkEmail(usersData.email);
        usersData.password = helper.checkPassword(usersData.password);
        userData.role = roles.find(role => role.name === usersData.role);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        const { name, email, password, role, userId } = usersData;
        const user = await userData.createUser(name, email, password, role, userId);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post("/edituser&id=:id", async (req, res) => {
    const updateUserData = req.body;
    try {
        req.params.id = helper.checkId(req.params.id, 'ID url param');
        updateUserData.name = helper.checkName(updateUserData.name);
        updateUserData.email = helper.checkEmail(updateUserData.email);
        updateUserData.role = roles.find(role => role.name === updateUserData.role);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        await userData.getUserById(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: "Sorry, No user found with that ID" });
    }

    try {
        const updatedUser = await userData.updateUser(req.params.id, updateUserData);
        res.json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete("/deleteuser&id=:id", async (req, res) => {
    try {
        req.params.id = helper.checkId(req.params.id, 'ID url param');
    } catch (error) {
        return res.status(400).json({error: e});
    }

    try {
        await userData.getUserById(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: "Sorry, No user found with that ID" });
    }
    try{
        await userData.deleteUser(req.params.id);
        res.status(200).json({deleted: true});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/:id", async (req, res) => {
    try {
        req.params.id = helper.checkId(req.params.id, 'ID url param');
    } catch (error) {
        return res.status(400).json({ error: e });
    }

    try {
        const user = await userData.getUserById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;