import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'role Show',
        href: '/roles.show',
    },
];

export default function roleShow() {
    const { role, permissions } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="role Show" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('roles.index')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg '
                >
                Back
                </Link>
                </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Role Name : {role.name}</Label>
                    </div>
                    <div className="">
                        <Label htmlFor="Permissions">Permissions</Label>
                        <div>

                        {permissions.map((permission)=> 
                                <span
                                key={permission}
                                className='mr-1 p-1 rounded bg-green-200 text-green-90 text-xs font-medium'
                                >
                                    {permission}
                                </span>
                        )}
                        </div>
                    </div>

            </div>
        </AppLayout>
    );
}
