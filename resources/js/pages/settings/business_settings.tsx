import { Head, Link, useForm, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem, type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings/layout';
import { FormEventHandler } from 'react';
import { Transition } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Business Settings',
        href: '/settings/business_settings',
    },
];

type BusinessSettingForm = {
    business_name: string;
    business_email: string;
    sender_email_name: string;
    email_description: string;
    currency_symbol: string;
    logo: string;
    logo_driver: string;
    favicon: string;
    favicon_driver: string;
};

export default function BusinessSettings({ business_settings }) {

        const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<BusinessSettingForm>>({
            business_name       : business_settings.site_title,
            business_email      : business_settings.sender_email,
            sender_email_name   : business_settings.sender_email_name || '',
            email_description   : business_settings.email_description || '',
            currency_symbol     : business_settings.currency_symbol || '',
            logo                : business_settings.logo || '',
            logo_driver         : business_settings.logo_driver || '',
            favicon             : business_settings.favicon || '',
            favicon_driver      : business_settings.favicon_driver || '',
        });
    
        const submit: FormEventHandler = (e) => {
            e.preventDefault();
    
            patch(route('profile.update'), {
                preserveScroll: true,
            });
        };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Business Settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Business Settings" description="Update your account's business settings" />

                    <form onSubmit={submit} className="space-y-6">
                        {/* Two-column layout for inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="business_name">Business Name</Label>
                                <Input
                                    id="business_name"
                                    className="mt-1 block w-full"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    required
                                    autoComplete="business_name"
                                    placeholder="Business Name"
                                />
                                <InputError className="mt-2" message={errors.business_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="business_email">Business Email / Sender Email</Label>
                                <Input
                                    id="business_email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.business_email}
                                    onChange={(e) => setData('business_email', e.target.value)}
                                    required
                                    autoComplete="business_email"
                                    placeholder="Business Email"
                                />
                                <InputError className="mt-2" message={errors.business_email} />
                            </div>

                            <div className="grid gap-2 ">
                                <Label htmlFor="sender_email_name">Sender Email Name</Label>
                                <Input
                                    id="sender_email_name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.sender_email_name}
                                    onChange={(e) => setData('sender_email_name', e.target.value)}
                                    required
                                    autoComplete="sender_email_name"
                                    placeholder="Sender Email Name"
                                />
                                <InputError className="mt-2" message={errors.sender_email_name} />
                            </div>
<div className="grid gap-2">
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    className="mt-1 block w-full"
                                    value={data.logo}
                                    onChange={(e) => setData('logo', e.target.value)}
                                    required
                                    autoComplete="logo"
                                    placeholder="Logo"
                                />
                                <InputError className="mt-2" message={errors.logo} />
                            </div>

                            <div className="grid gap-2 ">
                                <Label htmlFor="logo_driver">Logo Driver</Label>
                                <Input
                                    id="logo_driver"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.logo_driver}
                                    onChange={(e) => setData('logo_driver', e.target.value)}
                                    required
                                    autoComplete="logo_driver"
                                    placeholder="Logo Driver"
                                />
                                <InputError className="mt-2" message={errors.logo_driver} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="favicon">Favicon</Label>
                                <Input
                                    id="favicon"
                                    type="file"
                                    className="mt-1 block w-full"
                                    value={data.favicon}
                                    onChange={(e) => setData('favicon', e.target.value)}
                                    required
                                    autoComplete="favicon"
                                    placeholder="Favicon"
                                />
                                <InputError className="mt-2" message={errors.favicon} />
                            </div>

                            <div className="grid gap-2 ">
                                <Label htmlFor="favicon_driver">Favicon Driver</Label>
                                <Input
                                    id="favicon_driver"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.favicon_driver}
                                    onChange={(e) => setData('favicon_driver', e.target.value)}
                                    required
                                    autoComplete="favicon_driver"
                                    placeholder="Favicon Driver"
                                />
                                <InputError className="mt-2" message={errors.favicon_driver} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="currency_symbol">Currency Symbol</Label>
                                <Input
                                    id="currency_symbol"
                                    className="mt-1 block w-full"
                                    value={data.currency_symbol}
                                    onChange={(e) => setData('currency_symbol', e.target.value)}
                                    required
                                    autoComplete="currency_symbol"
                                    placeholder="Currency Symbol"
                                />
                                <InputError className="mt-2" message={errors.currency_symbol} />
                            </div>

                            

                            <div className="grid gap-2 md:col-span-3">
                                <Label htmlFor="email_description">Email Description</Label>
                                <textarea
                                    id="email_description"
                                    className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-50 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    value={data.email_description}
                                    onChange={(e) => setData('email_description', e.target.value)}
                                    required
                                    autoComplete="email_description"
                                    placeholder="Email Description"
                                >

                                </textarea>
                                <InputError className="mt-2" message={errors.email_description} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save Changes</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>

    );
}
