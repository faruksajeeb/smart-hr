import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { ArrowLeftCircle, SaveIcon } from 'lucide-react';
import { can } from '@/lib/can'
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data Edit',
        href: '/master_data.edit',
    },
];

export default function MasterDataEdit({master_data, types, parents}) {
console.log(master_data);
    const {data,setData, errors, put} = useForm({
        type: master_data.type || "",
        name: master_data.name ||"",
        code: master_data.code || "",
        parent_id: master_data.parent_id || "",
        status: master_data.status ,
        description: master_data.description || "",
    });

    const parentOptions = parents.map((parent: { id: number; name: string }) => ({
        value: parent.id,
        label: parent.name,
    }));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('master_data.update', master_data.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                    <div className='flex justify-start mb-4'>
                        {can('master_data.view') && (<Link 
                            href={route('master_data.index')}
                            className='px-3 py-2 bg-blue-900 text-white rounded-lg flex items-start gap-2'
                        >
                        <ArrowLeftCircle/> Back
                        </Link>)}
                    </div>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="type" id="type-label">Type <span className='text-red-600'>*</span></Label>
                            <select
                            id="type"
                            name="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="">Select Type</option>
                                {types.map((type:string) => (
                                    <option key={type} value={type}>
                                        {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </option>
                                    ))}
                            </select>
                            <InputError className="mt-2" message={errors.type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type" id="type-label">Parent</Label>
                            <Select
                                    inputId="parent_id"
                                    options={parentOptions}
                                    value={parentOptions.find(option => option.value === data.parent_id) || null}
                                    onChange={(option) => setData('parent_id', option ? option.value : '')}
                                    placeholder="Select Parent"
                                    isClearable
                                />
                            <InputError className="mt-2" message={errors.parent_id} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name <span className='text-red-600'>*</span></Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                
                                autoComplete="name"
                                placeholder="Master Data Name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        

                        <div className="grid gap-2">
                            <Label htmlFor="title">Code</Label>
                            <Input
                                id="code"
                                className="mt-1 block w-full"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                
                                autoComplete="code"
                                placeholder="Code"
                            />
                            <InputError className="mt-2" message={errors.code} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="body">Description</Label>

                            <textarea
                            id="description"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-30 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            autoComplete="description"
                            placeholder="Description"
                            >

                            </textarea>

                            <InputError className="mt-2" message={errors.description} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type" id="type-label">Status <span className='text-red-600'>*</span></Label>
                            <select 
                            id="status"
                            name="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <Button> <SaveIcon/> Save New</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
