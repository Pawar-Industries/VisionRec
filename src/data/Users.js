const mongoCollections = require('../config/mongodb/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const helper = require("../config/helpers");

const exportedMethods = {
    async createUser(name, email, password, role) {
        const usersCollection = await users();
        if(!Array.isArray(role)){
            role = [];
        } else {
            role = helper.checkStringArray(role, 'Role');
        };
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: role
        };
        const insertInfo = await usersCollection.insertOne(newUser);
        const userId = insertInfo.insertedId;
        return await this.getUserById(userId.toString());
    },

     async getUserById(id) {
         id = helper.checkId(id, 'User ID');
         const usersCollection = await users();
         const user = await usersCollection.findOne({ _id: ObjectId.createFromHexString(id) });

         if(!user) throw 'User not found';
         return user;
     },

    async getUserByEmail(email) {
        if (!email) throw 'You must provide an email to search for';
        const usersCollection = await users();
        const user = await usersCollection.findOne({ email: email });
        if (!user) throw 'No user with that email';
        return user;
    },

    async updateUser(id, updatedUser) {
        if (!id) throw 'You must provide an id to search for';
        const usersCollection = await users();
        const updatedUserData = {};
        if (updatedUser.name) updatedUserData.name = updatedUser.name;
        if (updatedUser.email) updatedUserData.email = updatedUser.email;
        if (updatedUser.role) updatedUserData.role = updatedUser.role;
        await usersCollection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updatedUserData });
        return await this.getUserById(id);
    },

    async deleteUser(id) {
        if (!id) {
            throw new Error('You must provide a valid id to search for');
        }
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }
        
        const usersCollection = await users();
    
        try {
            const user = await this.getUserById(id);
        } catch (e) {
            console.log(e);
            return false;
        }
        
        const deletionInfo = await usersCollection.deleteOne({ _id: new ObjectId.createFromHexString(id) });
    
        if (deletionInfo.deletedCount === 0) {
            false;
        }
        return true;
    },

    async getAllUsers() {
        const usersCollection = await users();
        return await usersCollection.find({}).toArray();
    },
};

module.exports = exportedMethods;