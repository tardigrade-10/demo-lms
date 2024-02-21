import {auth} from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(
    req: Request,
    ) {
    try{
        const {userId} = auth();//extract userId which we will get from clerk
        const {title} =  await req.json();//extract title which we will get from form

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        });
        return NextResponse.json(course);  
    } catch (error){
        console.log("[COURSES]",error);
        return new NextResponse("Internal Error", {status: 500});
    }   
}