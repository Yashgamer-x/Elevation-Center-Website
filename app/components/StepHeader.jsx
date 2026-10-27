export default function StepHeader({ title, description }) {
    return(
        <div className="mb-7.5">
            <h2 className="mb-1.5 text-[28px] leading-[1.2] font-normal font-[Georgia,'Times_New_Roman',serif] text-[#0b2545]">
                {title}
            </h2>
            <p className="text-[#5d6b82]">
                {description}
            </p>
        </div>
    );
}
