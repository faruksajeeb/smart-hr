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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Edit',
        href: '/posts.Edit',
    },
];

export default function PostEdit() {
    const { post } = usePage().props;

    const {data,setData, errors, put} = useForm({
        title: post.title || "",
        body: post.body || ""
    });
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                <Link 
                    href={route('posts.index')}
                    className='px-3 py-2 bg-blue-900 text-white rounded-lg '
                >
                Back
                </Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            
                            autoComplete="title"
                            placeholder="Post Title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="body">Body</Label>

                        <Textarea
                        id="body"
                        className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-90 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        
                        autoComplete="body"
                        placeholder="Post Body"
                        >

                        </Textarea>

                        <InputError className="mt-2" message={errors.body} />
                    </div>
                    <Button>Save</Button>
                </form>

            </div>
        </AppLayout>
    );
}
