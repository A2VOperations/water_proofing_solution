import React from "react";

const Section5 = () => {
  return (
    <>
      <style>
        {`
          .font-syne { font-family: 'Syne', sans-serif; }
          .font-dm { font-family: 'DM Sans', sans-serif; }
          .badge-dot {
            animation: pulse-dot 2s ease-in-out infinite;
          }
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.7); }
          }
          .writing-vertical {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
          }
        `}
      </style>
      <div
        className="relative mx-auto px-6 my-6 lg:max-w-[1700px] lg:w-full max-w-4xl min-h-[340px] rounded-2xl overflow-hidden bg-[#0d1117] flex items-stretch"
        style={{
          backgroundImage: "url('/home/6711000bab0a0289b4b137fd_home2-about2-img.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,12,20,0.96) 38%, rgba(10,12,20,0.55) 65%, transparent 85%)",
          }}
        ></div>

        <div className="relative z-20 flex flex-col justify-center gap-6 px-12 py-11 max-w-xl">
          <div className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase text-[#3fa9f5] bg-[rgba(63,169,245,0.12)] border border-[rgba(63,169,245,0.35)]">
            <span className="badge-dot w-1.5 h-1.5 rounded-full bg-[#3fa9f5]"></span>
            Limited Period Offer
          </div>

          <h1 className="font-syne font-extrabold text-white leading-tight text-4xl lg:text-[44px]">
            Find an Expert
            <br />
            Handyman on
            <br />
            <span className="text-[#3fa9f5]">Emergency Fixing</span>
          </h1>

          <p className="text-sm text-white/50 leading-relaxed max-w-sm">
            Trusted professionals available 24/7 — plumbing, electrical,
            carpentry & more. Same-day service guaranteed.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-2.5 bg-white text-[#0d1117] text-[13px] font-medium tracking-wide uppercase rounded-full px-7 py-3.5 hover:bg-blue-50 transition-all hover:-translate-y-0.5 no-underline"
            >
              <span className="w-[30px] h-[30px] rounded-full bg-[#3fa9f5] flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Get Estimate
            </a>

            <a
              href="#"
              className="flex items-center gap-2 text-white/70 text-[13px] hover:text-white transition-colors no-underline"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 7l2 2 2-2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              See how it works
            </a>
          </div>

          <div className="flex items-center gap-7">
            <div className="flex flex-col gap-0.5">
              <span className="font-syne font-bold text-white text-xl">
                4.9★
              </span>
              <span className="text-[11px] text-white/40 tracking-wide">
                Avg rating
              </span>
            </div>
            <div className="w-px h-9 bg-white/15"></div>
            <div className="flex flex-col gap-0.5">
              <span className="font-syne font-bold text-white text-xl">
                2,400+
              </span>
              <span className="text-[11px] text-white/40 tracking-wide">
                Jobs done
              </span>
            </div>
            <div className="w-px h-9 bg-white/15"></div>
            <div className="flex flex-col gap-0.5">
              <span className="font-syne font-bold text-white text-xl">
                60 min
              </span>
              <span className="text-[11px] text-white/40 tracking-wide">
                Avg response
              </span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/95 rounded-l-2xl px-3.5 py-5 flex flex-col items-center gap-2.5 shadow-[-4px_0_20px_rgba(0,0,0,0.2)]">
          <div className="w-7 h-7 rounded-full bg-[#3fa9f5] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2.5C2 2.5 3 4.5 4.5 6S7.5 8.5 9 9.5l2-2 1.5 1.5s-.5 2-2.5 2.5C7 12 3 10 2 8.5 1 7 1 3.5 2 2.5z"
                fill="#fff"
              />
            </svg>
          </div>
          <span className="writing-vertical text-[12px] font-medium text-[#1a1a2e] tracking-wide">
            +125-8845-5421
          </span>
        </div>
      </div>
    </>
  );
};

export default Section5;
