import { projectStorage } from '../firebase/config';
import { useEffect, useState } from 'react';

const useStorage = (file) => {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (file) {
            const storageRef = projectStorage.ref(file.name);
            storageRef.put(file).on('state_changed', async () => {
                const link = await storageRef.getDownloadURL();
                setUrl(link);
            }, (err) => {
                console.error(err);
            })
        }
    }, [file]);

    return { url }

}

export default useStorage;