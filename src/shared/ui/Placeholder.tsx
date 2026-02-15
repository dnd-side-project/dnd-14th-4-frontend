'use client';


export const Placeholder = ({
    value,
    setValue,
}: {
    value: string;
    setValue: (value: string) => void;
}) => {

    const currentLength = value.length;
    const maxLength = 10;

    let status: 'default' | 'good' | 'bad' = 'default';
    if (currentLength === 0) {
        status = 'default';
    } else if (currentLength > 0 && currentLength <= maxLength) {
        status = 'good';
    } else if (currentLength > maxLength) {
        status = 'bad';
    }

    const getCountColor = () => {
        switch (status) {
            case 'good': return 'text-status-positive';
            case 'bad': return 'text-status-destructive';
            default: return 'text-label-subtler';
        }
    };

    return (
        <div className="flex flex-col">
            <div className="border-b border-neutral-90 p-[6px] focus-within:border-label-default focus-within:border-b-2">
                <input
                    className="type-body2 w-full outline-none bg-transparent placeholder-neutral-70"
                    placeholder="닉네임을 입력해주세요"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            </div>
            <div className="flex justify-between mt-2 type-label2">
                <span className={status === 'bad' ? 'text-status-destructive' : 'text-label-subtler'}>
                    *특수기호, 띄어쓰기, 영문 대문자 사용 불가
                </span>

                <div>
                    <span className={getCountColor()}>
                        {currentLength}
                    </span>
                    <span className="text-label-subtle">
                        /{maxLength}자
                    </span>
                </div>
            </div>
        </div>
    );
};