import { NextResponse } from "next/server";
import connect from "../../../../../lib/db";
import User from "../../../../../lib/models/user";

export const GET = async (req) => {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await connect();
    const { name, email, password } = await req.json();

    const newUser = new User({ name, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
};
