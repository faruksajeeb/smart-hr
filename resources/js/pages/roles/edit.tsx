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
import { permission } from 'process';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role Edit',
        href: '/roles.Edit',
    },
];

export default function Edit() {
    const { role, permissions=[], rolePermissions = [] } = usePage().props;

    const {data,setData, errors, put} = useForm({
        name: role.name || "",
        permissions: rolePermissions || []
    });

    function handleCheckboxCheck(permissionName, checked){
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData('permissions', data.permissions.filter((p) => p !== permissionName));
        }
    }
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('roles.index')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg '
                >
                Back
                </Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            
                            autoComplete="name"
                            placeholder="role Name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                   <div className="grid gap-2">
                        <Label htmlFor="name">Permissions</Label>
                        {permissions.map((permission) => (
                            <Label key={permission} htmlFor={`permission-${permission}`} className='flex items-center space-x-2'>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5"
                                    checked={data.permissions.includes(permission)}
                                    value={permission}
                                    id={permission}
                                    onChange={(e) =>  handleCheckboxCheck(permission, e.target.checked)}       
                                />
                                <span className='m-2'>{permission}</span>
                            </Label>
                        ))}

                        <InputError className="mt-2" message={errors.permissions} />
                    </div>
                    <Button>Save Changes</Button>
                </form>

            </div>
        </AppLayout>
    );
}
