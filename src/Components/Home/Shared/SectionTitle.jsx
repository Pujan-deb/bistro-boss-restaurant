
export default function SectionTitle({ heading, subheading, color }) {
    return (
        <div className="text-center mb-5 sm:w-10/12 md:w-5/12 mx-auto">
            <p className="text-[#D99904] text-xl font-medium my-3">{subheading}</p>
            <h2 className="text-[35px] font-semibold border-y-2 border-[#E8E8E8] shadow-lg py-1">{heading}</h2>
        </div>
    )
}
