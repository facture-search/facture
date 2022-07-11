import { useEffect, useState } from "react";

export function useMounted() {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return mounted;
}

export default useMounted;
