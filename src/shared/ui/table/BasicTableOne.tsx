import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "./index.tsx";

type ReusableTableProps<T> ={
    headers: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
    getKey?: (item: T, index: number) => React.Key;
    isHover?: boolean;
    isHederBold?: boolean;
}

export default function ReusableTable<T>(
    {
         headers,
         data,
         renderRow,
         isHover = true,
         isHederBold = false,
    }: ReusableTableProps<T>) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell
                                    key={index}
                                    isHeader
                                    className={`px-5 py-3 text-orange-500 text-start dark:text-orange-400 ${isHederBold ? 'font-[700] text-theme-sm' : 'font-medium text-theme-xs'}`}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((item, index) => (
                            <TableRow
                                key={index}
                                className={isHover? "hover:bg-gray-100 dark:hover:bg-gray-600" : ""}
                            >
                                {renderRow(item, index)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
