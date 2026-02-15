import { ReactNode } from 'react';

interface MenuCardProps {
    title?: string;
    children: ReactNode;
}

export const MenuCard = ({ title, children }: MenuCardProps) => {
    return (
        <section className="type-label2 border border-neutral-90 rounded-[20px] py-[19px] px-[16px] bg-white mb-[18px]">
            {title && (
                <h3 className="text-label-subtle mb-4">
                    {title}
                </h3>
            )}

            <div className="flex flex-col gap-5 text-label-default">
                {children}
            </div>
        </section>
    );
};