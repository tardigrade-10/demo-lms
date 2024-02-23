"use client";
import * as z from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import{
    Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


/*
use client : This line indicates that the following code will be executed on the client-side, not on the server-side.
zod: Is a TypeScript-first schema declaration and validation library.
axios: A promise-based HTTP client for the browser and Node.js.
zodResolver: A resolver for the react-hook-form library that uses Zod for form validation.
useForm: A hook from react-hook-form for managing form state and validation.
useRouter: A hook from Next.js for accessing the router object.
Link: A component from Next.js for client-side navigation between pages.
toast: A library for displaying toast notifications.
Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem: These are custom form-related components used for building the form layout.
Button: A custom button component used for buttons in the form.
Input: A custom input component used for form inputs.*/

const formSchema =z.object({
    title: z.string().min(1,{
        message: "title is required",
    })
})  // It specifies that the title field must be a string of at least 1 character else the continue button will not work.
const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: ""
        },
    });
    const {isSubmitting, isValid} = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response= await axios.post("/api/courses",values);
            router.push(`/teacher/course/${response.data.id}`);
            toast.success("Course created");    //Toast notifications are transient messages that appear on the screen to provide feedback or alerts to users. They typically appear in a small pop-up window at the bottom or top of the screen and disappear automatically after a short period of time. 
        } catch
        {
        toast.error("something went wrong");
        }
    }
    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
            <h1>
                Name your course
            </h1>
            <p>
                What would you like to name your course? Don&apos;t worry, you can change this later.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <FormField control={form.control} name="title" render={({field}) => (<FormItem>
                        <FormLabel>
                            Course Title
                        </FormLabel>
                        <FormControl>
                        <Input disabled={isSubmitting} placeholder="e.g. 'advanced web development'"
                        {...field} />  
                        </FormControl>
                        <FormDescription> What will you teach in this course </FormDescription>
                        <FormMessage/> {/*to display errors if there are any*/}
                    </FormItem>)}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={!isValid || isSubmitting}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
        </div>
      );
}
 /* {...field} by using this spread we are don't need to manually specify onchange, onblur etc options */
export default CreatePage;