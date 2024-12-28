import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";


export default function Page(){

    const table = (
        <Table className={'border-y'}>
            <TableCaption>Teams Table</TableCaption>
            <TableHeader className={'bg-secondary'}>
                <TableRow>
                    <TableHead>Team name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Test Team</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )

    return (
        <main>

            <div className={'p-2'}>
                <Button variant={'outline'}>Add</Button>
            </div>

            {table}
        </main>
    )
}