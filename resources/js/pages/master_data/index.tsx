import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,usePage, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect,useRef } from 'react';
import debounce from 'lodash.debounce';
import { can } from '@/lib/can'
import { Plus,EyeOff, Eye, PowerOffIcon, PowerIcon, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import SkeletonTable from '@/components/SkeletonTable';

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
    const [sortBy, setSortBy] = useState(filters?.sortBy || '');
    const [direction, setDirection] = useState(filters?.direction || 'asc');


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
    const handleDelete = (id) => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure you want to delete this item?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => destroy(route('master_data.destroy', id))
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };




    const handleSort = (column) => {
        const newDirection = sortBy === column && direction === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setDirection(newDirection);

        router.get(route('master_data.index'), {
            ...filters,
            sortBy: column,
            direction: newDirection,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    // State for pagination
    const [perPage, setPerPage] = useState(filters?.perPage || 10);
    useEffect(() => {
        router.get(route('master_data.index'), {
          ...filters,
          perPage,
        }, {
          preserveState: true,
          replace: true,
        });
      }, [perPage]);

    // Function to toggle status
    const [statusLoadingId, setStatusLoadingId] = useState(null);
      const toggleStatus = (id: number) => {
        setStatusLoadingId(id);
        router.put(route('master_data.toggleStatus', id), {}, {
            preserveScroll: true,
            onFinish: () => setStatusLoadingId(null),
            onSuccess: () => {
                //toast.success('Status updated!');
            },
        });
    };

    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelected(master_data.data.map(item => item.id));
        } else {
            setSelected([]);
        }
    };
    const handleBulkDelete = () => {
        if (selected.length === 0) return;

        confirmAlert({
            title: 'Confirm Bulk Delete',
            message: `Are you sure you want to delete ${selected.length} item(s)?`,
            buttons: [
            {
                label: 'Yes',
                onClick: () =>
                router.post(route('master_data.bulkDelete'), { ids: selected }, {
                    onSuccess: () => setSelected([]),
                }),
            },
            {
                label: 'No',
                onClick: () => {},
            },
            ],
        });
    };


    const handleBulkStatusToggle = () => {
        router.post(route('master_data.bulkToggle'), { ids: selected }, {
            onSuccess: () => setSelected([]),
        });
    };

    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        type: true,
        code: true,
        parent: true,
        status: true,
        action: true,
    });



      
    // State for modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Check if master_data is loading
    const isLoading = !master_data;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Data" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-4 rounded">
                    
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
                    <button
                    onClick={() => {
                        setSearch('');
                        setStatus('');
                        setType('');
                        setPerPage(10);
                        router.get(route('master_data.index'));
                    }}
                    className="px-3 py-2 bg-gray-300 text-black rounded"
                    >
                    Clear Filters
                    </button>
                    <a
                    href={route('master_data.export', { type, status,parent, search })}
                    className={`px-3 py-2 bg-green-700 text-white rounded-lg ${master_data.total === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Export
                    </a>
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
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-gray-50 border rounded text-sm">
  {/* Per Page Dropdown */}
  <div className="flex items-center gap-2">
    <label htmlFor="perPage" className="font-medium">Show</label>
    <select
      id="perPage"
      value={perPage}
      onChange={(e) => setPerPage(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1"
    >
      {[10, 25, 50, 100].map((value) => (
        <option key={value} value={value}>{value}</option>
      ))}
    </select>
    <span>entries</span>
  </div>

  {/* Column Visibility Toggles */}
  <div className="flex flex-wrap items-center gap-3">
    <span className="font-medium">Columns:</span>
    {Object.keys(visibleColumns).map((col) => (
      <label key={col} className="inline-flex items-center gap-1">
        <input
          type="checkbox"
          checked={visibleColumns[col]}
          onChange={() => setVisibleColumns((prev) => ({
            ...prev,
            [col]: !prev[col],
          }))}
          className="form-checkbox text-blue-600"
        />
        <span className="capitalize">{col}</span>
      </label>
    ))}
  </div>
</div>


                {selected.length > 0 && (
                <div className="flex gap-2 mb-4">
                    <button
                    onClick={handleBulkDelete}
                    className="bg-red-600 text-white px-3 py-2 rounded text-sm"
                    >
                    Delete Selected ({selected.length})
                    </button>

                    <button
                    onClick={handleBulkStatusToggle}
                    className="bg-yellow-600 text-white px-3 py-2 rounded text-sm"
                    >
                    Toggle Status ({selected.length})
                    </button>
                </div>
                )}

                {
                isLoading ? (
                    <SkeletonTable rows={10} columns={6} />
                ) : (
                    <>
                    <table className="w-full text-sm  border border-gray-300">
                        <thead className="text-xs bg-gray-50 text-gray-700">
                            <tr className='border-b border-gray-200'>
                                <th className="px-2 py-2 text-left">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    checked={selected.length === master_data.data.length}
                                />
                                </th>
                                {visibleColumns.name && <th onClick={() => handleSort('name')}  scope='col' className="py-3 text-left border border-gray-300 px-2 cursor-pointer">
                                    Name {sortBy === 'name' && (direction === 'asc' ? '▲' : '▼')}
                                </th>}
                                {visibleColumns.type && <th onClick={() => handleSort('type')}  scope='col' className="py-3 text-left border border-gray-300 px-2 cursor-pointer">
                                    Type {sortBy === 'type' && (direction === 'asc' ? '▲' : '▼')}
                                </th>}
                                {visibleColumns.code && <th onClick={() => handleSort('code')}  scope='col' className="py-3 text-left border border-gray-300 px-2 cursor-pointer">
                                    Code {sortBy === 'code' && (direction === 'asc' ? '▲' : '▼')}
                                </th>}
                                {visibleColumns.parent && <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Parent ID</th>}
                                {visibleColumns.status && <th scope='col' className='py-3 text-center border border-gray-300 px-2'> Status</th>}
                                {visibleColumns.action && <th scope='col' className='py-3 text-left border border-gray-300 px-2'>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                        {master_data.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                No data found.
                                </td>
                            </tr>
                            ) : (
                                master_data.data.map((item,index)=>(

                            <tr  key={item.id} className='odd:bg-white even:bg-gray-50'>
                                <td className="px-2 py-2">
                                    <input
                                    type="checkbox"
                                    checked={selected.includes(item.id)}
                                    onChange={() => toggleSelection(item.id)}
                                    />
                                </td>
                                {visibleColumns.name && <td className='px-2 py-2 border border-gray-300  text-left'>{item.name}</td>}
                                {visibleColumns.type && <td className='px-2 py-2 border border-gray-300  text-left'>{item.type.toUpperCase()}</td>}
                                {visibleColumns.code && <td className='px-2 py-2 border border-gray-300  text-left'>{item.code}</td>}
                                {visibleColumns.parent && <td className='px-2 py-2 border border-gray-300  text-left'>{item.parent ? item.parent.name : '-'}</td>}
                                {visibleColumns.status && <td className='px-2 py-2 border border-gray-300  text-center'>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                        ${item.status == 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.status == 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>}
                                {visibleColumns.action && <td className="px-2 py-2 border border-gray-300 text-left">
                                    <div className="flex items-center gap-1">

                                        <button
                                        disabled={statusLoadingId === item.id}
                                        onClick={() => toggleStatus(item.id)}
                                        className={`w-8 h-8 flex items-center justify-center rounded text-white ${
                                            item.status ? 'bg-yellow-600' : 'bg-green-600'
                                        }`}
                                        title={item.status ? 'Deactivate' : 'Activate'}
                                        >
                                        {item.status ? <PowerOffIcon size={16} /> : <PowerIcon size={16} />}
                                        </button>

                                        <Link 
                                        href={route('master_data.edit', item.id)} 
                                        className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded"
                                        title="Edit"
                                        >
                                        <Edit size={16} />
                                        </Link>

                                        <button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded"
                                        title="View"
                                        >
                                        <Eye size={16} />
                                        </button>

                                        <button
                                        onClick={() => handleDelete(item.id)}
                                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded"
                                        title="Delete"
                                        >
                                        <Trash2 size={16} />
                                        </button>

                                    </div>
                                    </td>}

                            </tr>

                            ))
                        )}
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
                    </>
                )
                }

            {/* View Modal */}
            {isModalOpen && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    View Master Data
                </h2>
                <div className="space-y-2 text-gray-700 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedItem?.name}</p>
                    <p><span className="font-medium">Type:</span> {selectedItem?.type}</p>
                    <p><span className="font-medium">Code:</span> {selectedItem?.code}</p>
                    <p><span className="font-medium">Parent:</span> {selectedItem?.parent?.name || '-'}</p>
                    <p>
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`font-semibold ${selectedItem?.status ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedItem?.status ? 'Active' : 'Inactive'}
                    </span>
                    </p>
                </div>
                <div className="mt-6 text-right">
                    <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                    >
                    Close
                    </button>
                </div>
                </div>
            </div>
            )}
            </div>

        </AppLayout>
    );
}
