import { Menu} from "lucide-react";
import { Sidebar } from "./sidebar";
import{
    Sheet, SheetContent, SheetTrigger
} from "@/components/ui/sheet";
export const MobileSidebar = () =>
{
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition"> {/* medium ke baad no need to show else all the ppts are written*/}
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}