import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.record.deleteMany();

  await prisma.record.createMany({
    data: [
      {
        type: "BOOK",
        status: "DONE",
        title: "미움받을 용기",
        author: "기시미 이치로 · 고가 후미타케",
        publisher: "인플루엔셜",
        isbn: "9791186560592",
        summary:
          "아들러 심리학을 대화체로 풀어낸 책으로, 타인의 인정이 아니라 스스로 선택한 삶의 기준으로 살아가는 법을 다룬다. 모든 고민은 인간관계에서 비롯된다는 전제 아래 과제의 분리, 공동체 감각 같은 개념을 소개한다.",
        impression: "타인의 시선에서 자유로워지는 것이 이기적인 게 아니라는 걸 깨달았다.",
        insight: "미움받을 용기는 곧 스스로 선택할 용기다.",
        application: "타인의 반응을 통제하려는 시도를 멈추고, 내가 할 수 있는 선택에만 집중하기로 했다.",
        review: "쉬운 문체로 깊은 철학을 전달하는 입문서로 추천.",
        rating: 4.5,
        grade: "CLASSIC",
        progress: 100,
        ageGroup: "20~30대",
        isPremium: true,
        proSummary:
          "인간관계의 고민을 '과제의 분리'로 해결하자는 아들러 심리학의 핵심을 대화체로 전달한다. 인정욕구를 내려놓고 공동체 감각 속에서 자신의 가치를 스스로 정의하는 법을 제시한다.",
        proLessons: JSON.stringify([
          "모든 고민은 인간관계에서 비롯된다.",
          "타인의 과제와 나의 과제를 분리하라.",
          "인정욕구를 버려야 자유로워진다.",
          "경쟁이 아니라 공동체 감각이 중요하다.",
          "과거의 트라우마가 현재를 결정하지 않는다.",
          "지금 여기를 진지하게 살아야 한다.",
          "자기수용이 타인신뢰의 출발점이다.",
        ]),
        proDiscussion: JSON.stringify([
          "나는 어떤 과제를 타인의 것과 혼동하고 있는가?",
          "인정욕구 때문에 포기한 선택이 있었는가?",
          "공동체 감각을 느꼈던 경험은 언제였는가?",
          "과거의 경험을 핑계로 미루고 있는 결정이 있는가?",
          "타인을 경쟁 상대로 보는 습관은 어디서 왔는가?",
          "자기수용과 자기긍정의 차이는 무엇인가?",
          "지금 이 순간에 집중하지 못하게 하는 것은 무엇인가?",
        ]),
      },
      {
        type: "BOOK",
        status: "DONE",
        title: "사피엔스",
        author: "유발 하라리",
        publisher: "김영사",
        isbn: "9788934972464",
        summary:
          "호모 사피엔스가 어떻게 지구를 지배하는 종이 되었는지를 인지혁명, 농업혁명, 과학혁명이라는 세 축으로 설명한다. 허구를 믿는 능력이 대규모 협력을 가능케 했다는 주장이 핵심이다.",
        impression: "국가, 화폐, 기업 모두 '상상의 질서'라는 시각이 신선했다.",
        insight: "허구를 공유하는 능력이 인류 문명의 토대다.",
        application: "조직이나 제도를 볼 때 그 이면의 합의된 이야기를 먼저 살펴본다.",
        review: "방대한 범위를 다루면서도 몰입감 있게 읽힌다.",
        rating: 5,
        grade: "CLASSIC",
        progress: 100,
        ageGroup: "20~40대",
        isPremium: false,
      },
      {
        type: "BOOK",
        status: "DONE",
        title: "데미안",
        author: "헤르만 헤세",
        publisher: "민음사",
        isbn: "9788937460449",
        summary:
          "싱클레어라는 소년이 데미안을 만나며 자아를 찾아가는 성장소설. 선악의 이분법을 넘어선 세계 '아브락사스'를 향한 내적 여정을 그린다.",
        impression: "알을 깨고 나오는 장면의 문장이 오래 남았다.",
        insight: "진정한 자아를 찾는 일은 고통을 동반한다.",
        application: "익숙한 틀을 벗어나는 선택을 두려워하지 않기로 했다.",
        review: "문장이 아름답고 상징이 풍부하다.",
        rating: 4,
        grade: "TOP",
        progress: 100,
        ageGroup: "10~20대",
        isPremium: false,
      },
      {
        type: "BOOK",
        status: "DONE",
        title: "원씽",
        author: "게리 켈러 · 제이 파파산",
        publisher: "비즈니스북스",
        isbn: "9788997132824",
        summary:
          "성공하는 사람들은 한 번에 하나의 중요한 일에 집중한다는 메시지를 다양한 사례로 증명한다. 멀티태스킹의 비효율을 지적하고 우선순위를 좁히는 법을 제시한다.",
        impression: "할 일 목록이 길수록 오히려 아무것도 못 끝낸다는 말에 공감했다.",
        insight: "가장 중요한 한 가지에 먼저 답해야 한다.",
        application: "매일 아침 '오늘의 One Thing'을 정하고 시작한다.",
        review: "반복되는 메시지가 많아 뒷부분은 다소 늘어진다.",
        rating: 3.5,
        grade: "HIGH",
        progress: 100,
        ageGroup: "30~40대",
        isPremium: false,
      },
      {
        type: "BOOK",
        status: "IN_PROGRESS",
        title: "코스모스",
        author: "칼 세이건",
        publisher: "사이언스북스",
        isbn: "9788983711892",
        summary:
          "우주의 기원부터 생명의 탄생, 인류 문명까지를 아우르는 과학 교양서. 과학적 사실을 시적인 문장으로 풀어내는 것으로 유명하다.",
        impression: "",
        insight: "",
        application: "",
        review: "",
        rating: 4.5,
        grade: "CLASSIC",
        progress: 55,
        ageGroup: "전연령",
        isPremium: false,
      },
      {
        type: "VIDEO",
        status: "IN_PROGRESS",
        title: "Do Schools Kill Creativity?",
        author: "Ken Robinson (TED)",
        publisher: "TED",
        isbn: "",
        summary:
          "교육 시스템이 어떻게 아이들의 창의성을 억누르는지 유머러스하게 비판하는 TED 역대 최다 조회 강연 중 하나.",
        impression: "",
        insight: "실수를 두려워하지 않는 것이 창의성의 출발점이다.",
        application: "",
        review: "",
        rating: 4.5,
        grade: "TOP",
        progress: 70,
        ageGroup: "전연령",
        isPremium: false,
      },
      {
        type: "QUOTE",
        status: "WISHLIST",
        title: "스토아 철학 명언 모음",
        author: "마르쿠스 아우렐리우스 외",
        publisher: "",
        isbn: "",
        summary: "명상록을 비롯한 스토아 철학자들의 핵심 문장을 모아 정리할 예정인 기록.",
        impression: "",
        insight: "",
        application: "",
        review: "",
        rating: 0,
        grade: "NORMAL",
        progress: 0,
        ageGroup: "",
        isPremium: false,
      },
      {
        type: "AUDIO",
        status: "WISHLIST",
        title: "지대넓얕 - 철학 편",
        author: "지적 대화를 위한 넓고 얕은 지식",
        publisher: "팟빵",
        isbn: "",
        summary: "철학사의 흐름을 쉽게 풀어주는 교양 팟캐스트 시리즈, 다음에 들어볼 예정.",
        impression: "",
        insight: "",
        application: "",
        review: "",
        rating: 0,
        grade: "NORMAL",
        progress: 0,
        ageGroup: "20~30대",
        isPremium: false,
      },
    ],
  });

  const count = await prisma.record.count();
  console.log(`seed complete: ${count} records`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
