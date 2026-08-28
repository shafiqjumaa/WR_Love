import FloatingShapes from "@/components/FloatingShapes";
import DoorCard from "@/components/DoorCard";

const doors = [
  { href: "/messages", emoji: "💌", title: "رسائلنا", hint: "كلمات كتبناها لبعض" },
  { href: "/story", emoji: "📸", title: "قصتنا", hint: "ذكرياتنا بالترتيب" },
  { href: "/surprises", emoji: "🎁", title: "مفاجآتنا", hint: "أشياء تنتظر وقتها" },
  { href: "/sky", emoji: "⭐", title: "سماؤنا", hint: "لحظات تستحق النجوم" },
  { href: "/games", emoji: "🎮", title: "ألعابنا", hint: "متعة بيننا فقط" },
  { href: "/journal", emoji: "📖", title: "دفترنا", hint: "خواطر صغيرة" },
  { href: "/counter", emoji: "❤️", title: "عداد حبنا", hint: "من أول يوم لهلق" },
  { href: "/jar", emoji: "🫙", title: "جرة الحب", hint: "افتح ورقة بالصدفة" },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-14 sm:px-10">
      <FloatingShapes />

      <section className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm tracking-wide opacity-60">مساحة لشخصين فقط</p>
        <h1 className="font-display text-4xl leading-tight sm:text-6xl" style={{ color: "var(--color-primary)" }}>
          أهلًا بك في عالمنا ❤️
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base opacity-80 sm:text-lg">
          كل باب هون فيه شي يخصّنا... ادخل وشوف
        </p>
      </section>

      <section className="relative z-10 mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
        {doors.map((d, i) => (
          <DoorCard key={d.href} {...d} delay={`${i * 0.08}s`} />
        ))}
      </section>
    </main>
  );
}
