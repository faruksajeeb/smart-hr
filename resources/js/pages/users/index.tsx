import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,usePage, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users() {
    const {users} = usePage().props
    const {delete: destroy} = useForm();
    const destroyUser: FormEventHandler = (e, id) => {
        e.preventDefault();
        if(confirm('Are you sure to delete this?')){
            destroy(route('users.destroy',id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('users.create')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg '
                >
                Create User
                </Link>

                </div>
                <table className="w-full text-sm ">
                    <thead className="text-xs bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope='col' className='py-3'>SL NO</th>
                            <th scope='col' className='py-3'>Name</th>
                            <th scope='col' className='py-3'>Email</th>
                            <th scope='col' className='py-3'>Status</th>
                            <th scope='col' className='py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({id,name,email})=>(

                        <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-500'>
                            <td className='px-6 py-2 '>{id}</td>
                            <td className='px-6 py-2 '>{name}</td>
                            <td className='px-6 py-2 '>{email}</td>
                            <td className='px-6 py-2 '></td>
                            <td className='px-6 py-2 text-center'>

                            <form onSubmit={(e)=>destroyUser(e,id)}>
                                <Link 
                                    href={route('users.show',id)} 
                                    className='px-3 py-2 text-xs font-medium bg-gray-600 text-white rounded-lg mx-1'
                                >
                                    Show
                                </Link>
                                <Link 
                                href={route('users.edit',id)} 
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
