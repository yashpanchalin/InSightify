import databaseConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await databaseConnect();

    try {
        const { username, password, email } = await request.json();
        const existingUserByUsername = await UserModel.findOne({ username });

        if (existingUserByUsername) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username already taken"
                }),
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByEmail) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User already exists"
                }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            summarisedText: []
        });

        await newUser.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "User registered successfully"
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred while registering user"
            }),
            { status: 500 }
        );
    }
}
