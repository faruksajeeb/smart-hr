import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,usePage, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect,useRef } from 'react';
import debounce from 'lodash.debounce';
import { can } from '@/lib/can'
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: '/master_data',
    },
];

export default function MasterData() {
    const { master_data, types, parents, flash, filters } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [type, setType] = useState(filters?.type || '');
    const [parent, setParent] = useState(filters?.parent || '');

    const parentOptions = parents.map((parent: { id: number; name: string }) => ({
        value: parent.id,
        label: parent.name,
    }));
    
    const debouncedSearch = useRef(
      debounce((searchValue: string, statusValue: string, typeValue: string, parentValue: number) => {
        router.get(route('master_data.index'), { search: searchValue, status: statusValue, type: typeValue, parent: parentValue, page: 1 }, {
          preserveState: true,
          replace: true,
        });
      }, 300)
    );
    
    useEffect(() => {
      debouncedSearch.current(search, status, type, parent);
    }, [search, status, type, parent]);
    
    useEffect(() => {
      return () => {
        debouncedSearch.current.cancel();
      };
    }, []);
    
    useEffect(() => {
      if (flash.success) toast.success(flash.success);
      if (flash.error) toast.error(flash.error);
    }, [flash]);

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
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 rounded">
                    {/* Filters Section (Left) */}
                    <div className="flex flex-col md:flex-row gap-4 flex-grow">
                        {/* Search Input */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
                            placeholder="Filter Data..."
                        />
                        {/* Type Dropdown */}
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/6"
                        >
                            <option value="">All Types</option>
                            {types.map((type: string) => (
                                <option key={type} value={type}>
                                    {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </option>
                            ))}
                        </select>
                        {/* Parent Dropdown */}
                        <Select
                            inputId="parent"
                            className="border border-gray-300 rounded px-3 w-full md:w-1/4"
                            options={parentOptions}
                            value={parentOptions.find(option => option.value === parent) || null}
                            onChange={(option) => setParent(option ? option.value : '')}
                            placeholder="Select Parent"
                            isClearable
                        />
                        {/* Status Dropdown */}
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/6"
                        >
                            <option value="">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    {/* Button Section (Right) */}
                    {can('master_data.create') && (
                        <div className="flex justify-end">
                            <Link
                                href={route('master_data.create')}
                                className="px-3 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2"
                            >
                                <Plus /> Create Master Data
                            </Link>
                        </div>
                    )}
                </div>


                <table className="w-full text-sm  border border-gray-300">
                    <thead className="text-xs bg-gray-50 text-gray-700">
                        <tr className='border-b border-gray-200'>
                            <th scope='col' className='py-3 text-left border border-gray-300 px-2'>SL NO</th>
                            <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Type</th>
                            <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Name</th>
                            <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Code</th>
                            <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Parent ID</th>
                            <th scope='col' className='py-3 text-center border border-gray-300 px-2'> Status</th>
                            <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            master_data.data.map(({id,type,name,code,status, parent})=>(

                        <tr className='odd:bg-white even:bg-gray-50'>
                            <td className='px-2 py-2 border border-gray-300  text-left'>{id}</td>
                            <td className='px-2 py-2 border border-gray-300  text-left'>{type.toUpperCase()}</td>
                            <td className='px-2 py-2 border border-gray-300  text-left'>{name}</td>
                            <td className='px-2 py-2 border border-gray-300  text-left'>{code}</td>
                            <td className='px-2 py-2 border border-gray-300  text-left'>{parent ? parent.name : '-'}</td>
                            <td className='px-2 py-2 border border-gray-300  text-center'>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                    ${status == 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {status == 1 ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className='px-2 py-2 border border-gray-300  text-left'>

                            <form onSubmit={(e)=>destroyPost(e,id)}>
                                <Link 
                                href={route('master_data.edit',id)} 
                                className='px-3 py-2 text-xs font-medium bg-amber-600 text-white rounded me-1'>
                                    Edit
                                </Link>
                                <button className='px-3 py-2 text-xs font-medium bg-red-700 text-white rounded me-1'>
                                Delete
                                </button>
                                </form>
                            </td>
                        </tr>

                        ))
                        }
                    </tbody>
                </table>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                    {/* Left: Entry Info */}
                    <div className="text-sm text-gray-600">
                    Showing {master_data?.from} to {master_data?.to} of {master_data?.total} entries
                    </div>

                    {/* Right: Pagination Links */}
                    <div className="mt-2 md:mt-0 flex space-x-1">
                    {master_data.links.map((link, index) => (
    <button
    key={index}
    onClick={() => {
        if (link.url) {
            const url = new URL(link.url);
            router.get(route('master_data.index'), {
                search,
                page: url.searchParams.get('page'),
            }, {
                preserveState: true,
                replace: true
            });
        }
    }}
    disabled={!link.url}
    dangerouslySetInnerHTML={{ __html: link.label }}
    className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : 'text-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
/>
))}

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
