import { NextResponse } from "next/server";

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export async function POST(req, res) {
    const data = await req.json()
    const { formData } = data;
    console.log('formData',formData)


    try {

        // do something you need to do in the backend 
        // (like database operations, etc.)

        socket.emit('receive-message', formData);

        return NextResponse.json({ data: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error }, { status: 200 })
    }

}