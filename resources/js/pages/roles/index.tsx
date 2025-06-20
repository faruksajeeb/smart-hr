import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,usePage, useForm } from '@inertiajs/react';
import { permission } from 'process';
import { FormEventHandler } from 'react';
import { can } from '@/lib/can'
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Roles() {
    const {roles} = usePage().props
    const {delete: destroy} = useForm();
    const destroyRole: FormEventHandler = (e, id) => {
        e.preventDefault();
        if(confirm('Are you sure to delete this?')){
            destroy(route('roles.destroy',id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
               
                <div className="flex justify-end">
                {can('roles.create') && <Link 
                    href={route('roles.create')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg  flex items-center gap-2'
                >
                <Plus/> Create Role
                </Link>}

                </div>
                <table className="w-full text-sm ">
                    <thead className="text-xs bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope='col' className='py-3'>SL NO</th>
                            <th scope='col' className='py-3'>Name</th>
                            <th scope='col' className='py-3'>Permissions</th>
                            <th scope='col' className='py-3'>Status</th>
                            <th scope='col' className='py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map(({id,name,permissions})=>(

                        <tr key={id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-500'>
                            <td className='px-6 py-2 '>{id}</td>
                            <td className='px-6 py-2 '>{name}</td>
                            <td className='px-6 py-2  break-words whitespace-normal'>
                                {permissions.map((permission)=> (
                                <span
                                key={permission}
                                className='inline-block mr-1 mb-1 rounded p-1 bg-green-200 text-green-90 text-xs font-medium'
                                >
                                    {permission.name
                                    .replace(/[._]/g, ' ')     
                                    .replace(/\b\w/g, (c) => c.toUpperCase())} 
                                </span>
                                ))}
                            </td>
                            <td className='px-6 py-2 '></td>
                            <td className='px-6 py-2 text-center  whitespace-nowrap'>
                                <form onSubmit={(e)=>destroyRole(e,id)}>
                                {can('roles.view') && <Link 
                                        href={route('roles.show',id)} 
                                        className='px-3 py-2 text-xs font-medium bg-gray-600 text-white rounded me-1'
                                    >
                                        Show
                                    </Link>}
                                    {can('roles.edit') && <Link 
                                    href={route('roles.edit',id)} 
                                    className='px-3 py-2 text-xs font-medium bg-amber-600 text-white rounded me-1'>
                                        Edit
                                    </Link>}
                                    {can('roles.delete') && 
                                    <button className='px-3 py-2 text-xs font-medium bg-red-700 text-white rounded me-1'>
                                        Delete
                                    </button>}
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
