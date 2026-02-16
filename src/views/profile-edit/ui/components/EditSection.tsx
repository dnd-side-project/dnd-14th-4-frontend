import { ReactNode } from 'react';

interface EditSectionProps {
    label: string;
    children: ReactNode;
}

export const EditSection = ({ label, children }: EditSectionProps) => {
    return (
        <section className="flex flex-col gap-3">
            <label className="type-label2 text-label-subtle">{label}</label>
            <div className="w-full">
                {children}
            </div>
        </section>
    );
};