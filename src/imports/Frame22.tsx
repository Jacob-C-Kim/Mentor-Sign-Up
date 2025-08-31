import imgTransparentLogo11 from "figma:asset/cf24fa2e75050490ba08976eeb14a37355b03c67.png";

function Frame2() {
  return (
    <div className="content-stretch flex gap-6 items-center justify-start relative shrink-0">
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">about</p>
      </div>
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">schedule</p>
      </div>
      <div className="bg-center bg-cover bg-no-repeat shrink-0 size-[61px]" data-name="Transparent Logo (1) 1" style={{ backgroundImage: `url('${imgTransparentLogo11}')` }} />
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">our eboard</p>
      </div>
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">join us</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-start leading-[0] relative shrink-0 text-black">
      <div className="font-['Lexend:Regular',_sans-serif] font-normal min-w-full relative shrink-0 text-[18px]" style={{ width: "min-content" }}>
        <p className="leading-[normal]">welcome to</p>
      </div>
      <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] not-italic relative shrink-0 text-[40px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">asian culture society</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#a9e1eb] box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip px-5 py-[7px] relative rounded-[10px] shrink-0">
      <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">events</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-start relative shrink-0">
      <Frame3 />
      <div className="font-['Lexend:Regular',_sans-serif] font-normal h-9 leading-[0] relative shrink-0 text-[12px] text-black text-center w-full">
        <p className="leading-[normal]">RIT’s largest Asian club, bringing students together to celebrate, learn, and share the rich history, culture, and art of Asian countries</p>
      </div>
      <div className="font-['Lexend:Regular',_sans-serif] font-normal h-9 leading-[normal] relative shrink-0 text-[12px] text-black text-center w-full">
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
      <Frame5 />
    </div>
  );
}

export default function Frame22() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[72px] items-center justify-start pb-[100px] pt-[5px] px-0 relative size-full">
      <Frame2 />
      <Frame4 />
    </div>
  );
}