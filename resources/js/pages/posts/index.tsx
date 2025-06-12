import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,usePage, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { can } from '@/lib/can'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts() {
    const {posts} = usePage().props
    const {delete: destroy} = useForm();
    const destroyPost: FormEventHandler = (e, id) => {
        e.preventDefault();
        if(confirm('Are you sure to delete this?')){
            destroy(route('posts.destroy',id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('posts.create')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg '
                >
                Create Post
                </Link>

                </div>
                <table className="w-full text-sm ">
                    <thead className="text-xs bg-gray-50 text-gray-700">
                        <tr>
                            <th scope='col' className='py-3'>SL NO</th>
                            <th scope='col' className='py-3'>Title</th>
                            <th scope='col' className='py-3'>Body</th>
                            <th scope='col' className='py-3'>Publication Status</th>
                            <th scope='col' className='py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(({id,title,body})=>(

                        <tr className='odd:bg-white even:bg-gray-50'>
                            <td className='px-6 py-2 '>{id}</td>
                            <td className='px-6 py-2 '>{title}</td>
                            <td className='px-6 py-2 '>{body}</td>
                            <td className='px-6 py-2 '></td>
                            <td className='px-6 py-2 text-center'>

                            <form onSubmit={(e)=>destroyPost(e,id)}>
                                <Link 
                                href={route('posts.edit',id)} 
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
