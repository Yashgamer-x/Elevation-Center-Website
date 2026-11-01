export default function InfoCard({ title, children }) {
    return(
        <section className="rounded-lg border border-t-[3px] border-[#D9DFE9] border-t-[#E8A200] bg-white px-5 py-4.5">
            <h2 className="mb-3 text-[15px] font-semibold text-[#0B2545]">{title}</h2>
            <dl className="divide-y divide-[#D9DFE9]">{children}</dl>
        </section>
    );
}

export function InfoRow({ label, value }) {
    return(
        <div className="grid grid-cols-[130px_1fr] gap-3 py-2.5 text-sm">
            <dt className="text-[#5D6B82]">{label}</dt>
            <dd className="font-medium break-words text-[#16233B]">{value}</dd>
        </div>
    );
}
