import { Plus, Share } from "lucide-react"
import { Button } from "../ui/Button"

export function Homepage() {

    return (
        <div className="">

            <div className="flex justify-between items-center" id="top">
                <h1 className="text-2xl font-bold">All Notes</h1>

                <div className="flex items-center  gap-3" id="right">
                    <Button variant={"secondary"} onClick={function (): void {
                        throw new Error("Function not implemented.")
                    } } startIcon={<Share />}>Share Brain</Button>

<Button variant={"primary"} onClick={function (): void {
                        throw new Error("Function not implemented.")
                    } } startIcon={<Plus />}>Share Brain</Button>
                </div>
            </div>

            <div className="" id="bottom">

                
            </div>


        </div>
    )
}