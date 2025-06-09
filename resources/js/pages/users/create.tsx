import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Create',
        href: '/users.create',
    },
];

export default function UserCreate() {
    const {data,setData, errors, post} = useForm({
        name: "",
        email: "",
        password: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="user Create" />
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
                        <Label htmlFor="name">Name</Label>

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
                    <Button>Save</Button>
                </form>

            </div>
        </AppLayout>
    );
}
