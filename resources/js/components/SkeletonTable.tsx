// components/SkeletonTable.tsx
export default function SkeletonTable({ rows = 10, columns = 6 }) {
    return (
        <div className="animate-pulse">
            <table className="w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        {[...Array(columns)].map((_, i) => (
                            <th key={i} className="px-4 py-3 border border-gray-300 text-left">
                                <div className="h-4 bg-gray-300 rounded w-1/2" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rows)].map((_, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                            {[...Array(columns)].map((_, colIndex) => (
                                <td key={colIndex} className="px-4 py-3 border border-gray-200">
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
