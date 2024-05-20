const { ObjectId } = require('mongodb');
const { URL } = require('url');

const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const checkEmail = (email) => {
    if (!email) throw "Email should not be empty";
    email = email.trim();
    if (email.length === 0) throw "Email should not be empty";
    if (!email.match(emailRegex)) throw "Email is invalid";
    return email;
};

const checkId = (id, varName) => {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
        throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
};

const checkString = (strVal, varName) => {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
        throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
        throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
};

const checkUsername = (strVal) => {
    strVal = checkString(strVal, "Username");
    strVal = strVal.toLowerCase();
    if (!/^[a-z0-9]+$/i.test(strVal) || strVal.length < 3) {
        throw "Username must be alphanumeric (alphabets or numbers only) and at least 3 characters long.";
    }
    if (/^\d+$/.test(strVal)) {
        throw "Username cannot be all numbers";
    }
    return strVal;
};

const checkPassword = (strVal) => {
    strVal = checkString(strVal, "Password");
    // check password length and complexity
    if (strVal.length < 6) {
        throw "Password must be at least 6 characters long";
    }
    if (!/[a-z]/.test(strVal)) {
        throw "Password must contain at least one lowercase letter";
    }
    if (!/[A-Z]/.test(strVal)) {
        throw "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(strVal)) {
        throw "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(strVal)) {
        throw "Password must contain at least one special character";
    }
    return strVal;
};

const checkName = (strVal) => {
    strVal = checkString(strVal, "Name");
    strVal = strVal.trim();
    let a = strVal.split(" ");
    if (a.length != 2) throw "Name must have first and last name only";
    a.forEach((element) => {
        if (!/^[a-zA-Z]+$/.test(element)) throw "Name must contain only alphabets";
        if (element.length < 3) throw "Name must have at least 3 letters";
    });
    return strVal;
};

const checkPosNumber = (num, varName) => {
    num = Number(num);
    if (!isNaN(num) && num > 0) {
        return num;
    } else {
        throw `Invalid ${varName}: ${num}. ${varName} should be a positive number`;
    }
};

const checkUrl = (urlString) => {
    try {
        const url = new URL(urlString);
        return urlString;
    } catch (error) {
        throw "Invalid URL";
    }
};

const checkStringArray = (arr, varName) =>{
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    let arrayInvalidFlag = false;
    if (!arr || !Array.isArray(arr))
        throw `You must provide an array of ${varName}`;
    for (i in arr) {
        if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
            arrayInvalidFlag = true;
            break;
        }
        arr[i] = arr[i].trim();
    }
    if (arrayInvalidFlag)
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
    return arr;
};

module.exports = {
    checkEmail,
    checkPassword,
    checkUsername,
    checkName,
    checkId,
    checkString,
    checkPosNumber,
    checkUrl,
    checkStringArray,
};