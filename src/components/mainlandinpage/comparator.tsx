import { ShieldCheck } from "lucide-react";
import { COMPARISON_DATA, SECTION_CONTENT_COMPARISON, TABLE_HEADERS } from "./data";

export function UsVsThemComparison() {
    return (
        <section className="bg-white px-4 py-8 md:py-12">
            {/* Header Section */}
            <div className="mb-12 mt-4 flex flex-col items-center justify-center space-y-3 text-center tracking-tight md:mb-24 md:mt-16 md:space-y-4">
                <div className="w-fit gap-2 rounded-3xl border-[1.3px] border-[#D6D6D6] px-4 py-1.5 text-xs font-medium shadow-[0px_1px_2px_0px_#0000001A,0px_4px_4px_0px_#00000017,0px_9px_5px_0px_#0000000D,0px_16px_6px_0px_#00000003,0px_25px_7px_0px_#00000000] md:text-sm lg:text-base">
                    {SECTION_CONTENT_COMPARISON.badge}
                </div>
                <h2 className="mb-2 max-w-3xl px-2 text-center text-3xl font-semibold text-black md:px-0 md:text-4xl lg:text-5xl">
                    {SECTION_CONTENT_COMPARISON.title}
                </h2>
                <p className="max-w-2xl px-4 text-center text-sm text-[#737373] md:text-base lg:text-lg">
                    {SECTION_CONTENT_COMPARISON.subtitle}
                </p>
            </div>

            {/* Comparison Container */}
            <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-[#E6E6E6] shadow-sm md:rounded-[35px]">
                {/* Dot-grid backdrop (Stays fixed while table scrolls) */}
                <div
                    className="absolute top-0 left-0 h-full w-full opacity-60 md:opacity-100"
                    style={{
                        backgroundImage: "radial-gradient(circle, #EBEBEB 1px, transparent 1px)",
                        backgroundSize: "10px 10px",
                    }}
                />

                {/* Rotated icon chip (Hidden on very small screens to save space) */}
                <div className="absolute -right-6 -top-6 -z-10 hidden rotate-[14deg] sm:block">
                    <div
                        style={{
                            background: "linear-gradient(147.09deg, #fbfbfb 9.63%, #e8e8e8 91.74%)",
                        }}
                        className="flex size-16 items-center justify-center rounded-2xl border border-[#f3f3f3] shadow-[0px_5px_11px_0px_rgba(0,0,0,0.1),0px_20px_20px_0px_rgba(0,0,0,0.09),0px_44px_27px_0px_rgba(0,0,0,0.05)] lg:size-20"
                    >
                        <ShieldCheck className="size-8 text-[#2462EA] lg:size-10" />
                    </div>
                </div>

                {/* Scrollable Table Area */}
                <div className="overflow-x-auto p-4 md:p-8 lg:p-14">
                    <div className="relative min-w-[540px] md:min-w-[800px]">
                        
                        {/* Elevated highlight lane behind the "us" column */}
                        <div
                            className="pointer-events-none absolute bottom-0 top-0 rounded-2xl bg-[#2462EA] shadow-lg md:rounded-3xl"
                            style={{
                                left: "25%",
                                width: "25%",
                            }}
                        />

                        {/* Header Row */}
                        <div className="relative z-10 grid grid-cols-4 gap-2 pb-4 md:gap-4 md:pb-6">
                            <div className="flex items-end p-2 text-sm font-semibold text-black md:text-lg">
                                {TABLE_HEADERS.feature}
                            </div>

                            <div className="flex flex-col items-center justify-center gap-1 p-2 text-center md:p-4">
                                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white md:px-3 md:py-1 md:text-xs">
                                    {TABLE_HEADERS.recommendedBadge}
                                </span>
                                <span className="mt-1 text-base font-bold text-white md:mt-2 md:text-xl lg:text-2xl">
                                    {TABLE_HEADERS.brandName}
                                </span>
                            </div>

                            <div className="flex items-center justify-center p-2 text-center md:p-4">
                                <span className="text-sm font-semibold text-[#A3A3A3] md:text-lg">
                                    {TABLE_HEADERS.wixSquarespace}
                                </span>
                            </div>

                            <div className="flex items-center justify-center p-2 text-center md:p-4">
                                <span className="text-sm font-semibold text-[#A3A3A3] md:text-lg">
                                    {TABLE_HEADERS.wordpress}
                                </span>
                            </div>
                        </div>

                        {/* Feature Rows */}
                        <div className="relative z-10">
                            {COMPARISON_DATA.map((row, index) => (
                                <div key={index} className="grid grid-cols-4 items-stretch gap-2 py-3 md:gap-4 md:py-4">
                                    <div className="flex items-center p-1 text-xs font-medium text-black md:p-2 md:text-base">
                                        {row.feature}
                                    </div>

                                    <div className="flex items-center justify-center p-2 text-center text-xs font-semibold text-white md:p-4 md:text-base">
                                        {row.us}
                                    </div>

                                    <div className="flex items-center justify-center p-2 text-center text-xs font-medium text-[#737373] md:p-4 md:text-base">
                                        {row.wix}
                                    </div>

                                    <div className="flex items-center justify-center p-2 text-center text-xs font-medium text-[#737373] md:p-4 md:text-base">
                                        {row.wp}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom cap so the blue lane reads as one continuous card */}
                        <div
                            className="pointer-events-none absolute bottom-0 rounded-b-2xl md:rounded-b-3xl"
                            style={{ left: "25%", width: "25%", height: "1px" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}