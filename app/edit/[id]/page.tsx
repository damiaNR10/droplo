'use client';
import AddForm from "@/components/AddForm/AddForm";
import { useSearchParams } from 'next/navigation';

const Edit = () => {
    const searchParams = useSearchParams();

    return (
        <div className="container">
            {
                <div className="main--content">
                    <AddForm menu={{ id: searchParams.get('id')!, name: searchParams.get('name')!, url: searchParams.get('url')! }} />
                </div>
            }
        </div>
    );
};

export default Edit;
