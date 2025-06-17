import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,usePage, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { can } from '@/lib/can'
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: '/master_data',
    },
];

export default function MasterData() {
    const {master_data} = usePage().props
    const {delete: destroy} = useForm();
    const destroyPost: FormEventHandler = (e, id) => {
        e.preventDefault();
        if(confirm('Are you sure to delete this?')){
            destroy(route('master_data.destroy',id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Data" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-end mb-4'>
                <Link 
                    href={route('master_data.create')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg   flex items-center gap-2'
                >
                <Plus/> Create Master Data
                </Link>

                </div>
                <table className="w-full text-sm ">
                    <thead className="text-xs bg-gray-50 text-gray-700">
                        <tr>
                            <th scope='col' className='py-3'>SL NO</th>
                            <th scope='col' className='py-3'>Type</th>
                            <th scope='col' className='py-3'>Name</th>
                            <th scope='col' className='py-3'>Code</th>
                            <th scope='col' className='py-3'>Parent ID</th>
                            <th scope='col' className='py-3'> Status</th>
                            <th scope='col' className='py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            master_data.map(({id,type,name,code,parent_id})=>(

                        <tr className='odd:bg-white even:bg-gray-50'>
                            <td className='px-6 py-2 '>{id}</td>
                            <td className='px-6 py-2 '>{type}</td>
                            <td className='px-6 py-2 '>{name}</td>
                            <td className='px-6 py-2 '>{code}</td>
                            <td className='px-6 py-2 '>{parent_id}</td>
                            <td className='px-6 py-2 '></td>
                            <td className='px-6 py-2 text-center'>

                            <form onSubmit={(e)=>destroyPost(e,id)}>
                                <Link 
                                href={route('master_data.edit',id)} 
                                className='px-3 py-2 text-xs font-medium bg-amber-600 text-white rounded-lg mx-1'>
                                    Edit
                                </Link>
                                <button className='px-3 py-2 text-xs font-medium bg-red-700 text-white rounded-lg mx-1'>
                                    Delete
                                </button>
                                </form>
                            </td>
                        </tr>

))
}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
