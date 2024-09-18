import { UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs'

export const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, gender, password } = input;
                if (!username || !name || !gender || !password) throw new Error("All fields are required");
                const existingUser = await UserModel.findOne({ username });
                if (existingUser) throw new Error("User already exists");
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser = new UserModel({
                    username,
                    name,
                    gender,
                    password: hashPassword
                });
                await newUser.save();
                await context.login(newUser)
                return newUser;
            } catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input
                if (!username || !password) throw new Error("All fields are required")

                const { user } = await context.authenticate("graphql-local", { username, password })

                await context.login(user)
                return user

            } catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        },
        logout: async (_, _, context) => {
            try {
                await context.logout()
                context.req.session.destroy((e) => {
                    if (e) throw e
                })
                return { message: "Logged out successfully" }
            } catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        }
    }
}