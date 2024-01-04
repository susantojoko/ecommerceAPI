import { validate } from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await prismaClient.user.create({
        data: {
            email: user.email,
            name: user.name,
            password: user.password
        }
    });

    return {
        status: 200,
        message: "Registration successful",
        user: {
            email: newUser.email,
            name: newUser.name
        }
    };
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            email: user.email
        },
        select: {
            token: true
        }
    });
}

const get = async (email, role) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            name: true,
            role: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    if (user.role === 2) {
        // Role "2", tampilkan semua data dalam database
        const allUsers = await prismaClient.user.findMany();
        return allUsers;
    } else if (user.role === 1) {
        // Role "1", tampilkan data diri sendiri saja
        return user;
    } else {
        throw new ResponseError(403, "Unauthorized");
    }
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            email: user.email
        },
        data: data,
        select: {
            email: true,
            name: true
        }
    });
}

const logout = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            email: email
        },
        data: {
            token: null
        },
        select: {
            email: true
        }
    });
}

export default {
    register,
    login,
    get,
    update,
    logout
}
