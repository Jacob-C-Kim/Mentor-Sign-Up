import imgScreenshot20250815At22629Pm1 from "figma:asset/1c1c660bf60ec3210121cb4ab04167fa1efa1006.png";

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-start leading-[0] left-[18px] text-black top-[94px] w-[237px]">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[18px] w-full">
        <p className="leading-[normal]">ACS GBM</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
        <p className="leading-[normal]">5:00 PM - 7:00 PM @ Bamboo Room RIT</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white h-[265px] left-[350px] overflow-clip rounded-[15px] top-[107px] w-[351px]">
      <Frame8 />
      <div className="absolute bg-[#d9d9d9] left-[298px] rounded-[15px] size-9 top-[94px]" />
      <div className="absolute font-['Lexend:Regular',_sans-serif] font-normal leading-[0] left-[18px] text-[12px] text-black top-[156px] w-[316px]">
        <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
      </div>
    </div>
  );
}

export default function Idea1() {
  return (
    <div className="bg-[#f5d1d1] relative size-full" data-name="Idea 1">
      <div className="absolute font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] leading-[0] left-[100px] not-italic text-[24px] text-black text-nowrap top-[61px]">
        <p className="leading-[normal] whitespace-pre">Come to our events!</p>
      </div>
      <Frame7 />
      <div className="absolute bg-[33.14%_35.71%] bg-no-repeat bg-size-[106.56%_105.28%] h-[265px] left-[100px] rounded-[15px] top-[107px] w-[226px]" data-name="Screenshot 2025-08-15 at 2.26.29 PM 1" style={{ backgroundImage: `url('${imgScreenshot20250815At22629Pm1}')` }} />
    </div>
  );
}