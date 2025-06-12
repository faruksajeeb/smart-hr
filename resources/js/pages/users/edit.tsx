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
import { can } from '@/lib/can'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Edit',
        href: '/users.Edit',
    },
];

export default function UserEdit() {
    const { user, roles, userRoles } = usePage().props;

    const {data,setData, errors, put} = useForm({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        roles: userRoles || []
    });

    function handleCheckboxCheck(role, checked){
        if (checked) {
            setData('roles', [...data.roles, role]);
        } else {
            setData('roles', data.roles.filter((p) => p !== role));
        }
    }
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="user Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('users.index')}
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
                            placeholder="User Name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            
                            autoComplete="email"
                            placeholder="User Email"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            className="mt-1 block w-full"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            autoComplete="password"
                            placeholder="User Paswword"
                        />

                        <InputError className="mt-2" message={errors.password} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Roles</Label>
                        {roles.map((role) => (
                            <Label key={role} htmlFor={`permission-${role}`} className='flex items-center space-x-2'>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5"
                                    value={role}
                                    id={role}
                                    checked={data.roles.includes(role)}
                                    onChange={(e) =>  handleCheckboxCheck(role, e.target.checked)}       
                                />
                                <span className='m-2'>{role}</span>
                            </Label>
                        ))}

                        <InputError className="mt-2" message={errors.roles} />
                    </div>
                    <Button>Save</Button>
                </form>

            </div>
        </AppLayout>
    );
}
