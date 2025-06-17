import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            );
        }
        await dbConnect();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                {
                    error: "User Already registerd",
                },
                { status: 400 }
            );
        }

        await User.create({
            email,
            password,
        });

        return NextResponse.json(
            { message: "User Registraterd Successfully" },
            { status: 400 }
        );
    } catch (error) {
        console.log("Registration Error", error);

        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 400 }
        );
    }
}
