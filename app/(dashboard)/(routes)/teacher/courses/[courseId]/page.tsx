import { IconBadge } from "@/components/icon-badge";
import  {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from 'next/navigation';
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";

// params is an object that contains dynamic route parameters extracted from the URL. When you define dynamic routes in using square brackets ([ ]), such as /courses/[courseId], eg. /courses/123, then Next.js will automatically parse the 123 as the courseId parameter. 
const CourseIdPage = async({
    params
} :{
    params: {courseId: string}
}) => {         //we are using userId to verify that the person who has created the course should be the same person who is editing the course
    const {userId} = auth();
    if(!userId) {
        return redirect('/');
    }
    const course = await db.course.findUnique({         //To find a unique course with the ID specified in params.courseId
        where: {
            id: params.courseId
        }
    });

    if(!course){
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;  //no of fields whose value is true are counted.
    const completionText = `(${completedFields}/${totalFields})`
    return(
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>

                </div>

            </div>
            <div className="grid gird-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                    initialData={course} 
                    courseId={course.id}
                    />
                    <DescriptionForm
                    initialData={course} 
                    courseId={course.id}
                    />
                </div>
            </div>
        </div>
    );
}
export default CourseIdPage;