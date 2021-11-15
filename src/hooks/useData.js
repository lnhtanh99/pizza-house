import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (category) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        if (category) {
            projectFirestore.collection('menu')
                .where('category', '==', category)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach(doc => {
                        documents.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });
                    setDocs(documents)
                })
        } else {
            projectFirestore.collection('menu')
                .where('category', '==', 'Pizza')
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach(doc => {
                        documents.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });
                    setDocs(documents)
                })
        }

    }, [category]);

    return { docs };
}

export default useFirestore;