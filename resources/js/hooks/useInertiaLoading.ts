import { useEffect, useState } from 'react'

export default function useInertiaLoading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => setLoading(true);
        const finish = () => setLoading(false);

        window.addEventListener('inertia:start', start);
        window.addEventListener('inertia:finish', finish);

        return () => {
            window.removeEventListener('inertia:start', start);
            window.removeEventListener('inertia:finish', finish);
        };
    }, []);

    return loading;
}
