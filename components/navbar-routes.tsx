"use client"
import {UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button} from "@/components/ui/button";
export const NavbarRoutes = () =>
{
    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
    
    return(
        <div className="flex gap-x-2 ml-auto">
            (isTeacherPage || isPlayerPage ? (
                <button>
                    
                </button>
            ))
            <UserButton/>
        </div>
    )
}