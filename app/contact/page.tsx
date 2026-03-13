import ContactPageForm from "@/components/ContactPageForm";

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* ── Fond image + overlay ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        backgroundImage: `url('/images/home/baie-somme-drone-mer.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }} />

      {/* Overlay dégradé sombre */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: "linear-gradient(160deg, rgba(7,30,32,0.88) 0%, rgba(11,31,37,0.82) 50%, rgba(20,50,40,0.90) 100%)",
      }} />

      {/* Contenu */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "120px 24px 80px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ContactPageForm />
        </div>
      </div>
    </main>
  );
}