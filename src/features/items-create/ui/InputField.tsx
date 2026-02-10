export default function InputField({ placeholder = "입력하세요" }) {
    return (
        <div className="flex w-full type-body1 bg-secondary-lightbeige rounded-lg">
            <input
                type="text"
                className="w-full text-center rounded-md py-3 text-label-default focus:outline-none"
                placeholder={placeholder}
            />
        </div>
    );
}