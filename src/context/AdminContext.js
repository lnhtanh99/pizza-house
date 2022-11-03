import { createContext, useState } from "react";

export const AdminContext = createContext();

function AdminProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState({});

    return (
        <AdminContext.Provider 
            value={{ 
                open,
                setOpen,
                documents,
                setDocuments
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider
