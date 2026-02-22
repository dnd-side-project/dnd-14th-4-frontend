export const MAIN_GREETINGS = [
    { suffix: "님,", line2: "나만의 꿀템을 알려주세요!" },
    { suffix: "님,", line2: "나에게 필요한 팩을 찾아보세요." },
    { suffix: "님의", line2: "가방에는 어떤 아이템이 있나요?" },
    { suffix: "님의", line2: "애착템을 소개해주세요!" },
  ] as const;
  
  export type Greeting = (typeof MAIN_GREETINGS)[number];
  
  export function pickRandomGreeting(): Greeting {
    return MAIN_GREETINGS[Math.floor(Math.random() * MAIN_GREETINGS.length)];
  }