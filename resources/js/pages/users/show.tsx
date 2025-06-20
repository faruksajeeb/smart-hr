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
        title: 'User Show',
        href: '/users.show',
    },
];

export default function UserShow() {
    const { user } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Show" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('users.index')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg '
                >
                Back
                </Link>
                </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={user.name}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            className="mt-1 block w-full"
                            value={user.email}
                        />
                    </div>

            </div>
        </AppLayout>
    );
}
