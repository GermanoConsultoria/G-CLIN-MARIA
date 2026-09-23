const WHATSAPP_PHONE = "5519997012163";
const WHATSAPP_MESSAGE =
  "Olá boa tarde, gostaria de um suporte no sistema G-Clin-Maria, pode me ajudar?";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Suporte via WhatsApp"
      aria-label="Falar com o suporte no WhatsApp"
      className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.59 4.377 1.62 6.216L3.2 28.8l6.77-1.596a12.73 12.73 0 0 0 6.034 1.536h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.74-12.805-12.74zm0 23.36a10.5 10.5 0 0 1-5.36-1.47l-.385-.228-4.017.947.955-3.917-.25-.402a10.53 10.53 0 0 1-1.62-5.65c0-5.84 4.75-10.59 10.6-10.59 5.84 0 10.59 4.75 10.59 10.6 0 5.85-4.75 10.6-10.6 10.6zm5.81-7.94c-.317-.16-1.878-.926-2.168-1.032-.29-.106-.502-.16-.714.16-.212.318-.82 1.032-1.006 1.244-.185.212-.37.238-.687.08-.317-.16-1.34-.494-2.552-1.574-.943-.84-1.58-1.878-1.765-2.196-.185-.318-.02-.49.14-.65.144-.143.318-.37.477-.556.16-.185.212-.318.318-.53.106-.212.053-.397-.026-.556-.08-.16-.714-1.72-.978-2.356-.258-.62-.52-.536-.714-.546l-.608-.01c-.212 0-.556.08-.847.397-.29.318-1.11 1.086-1.11 2.648s1.137 3.072 1.296 3.284c.16.212 2.238 3.418 5.424 4.794.758.327 1.35.523 1.812.67.762.242 1.454.208 2.002.126.61-.091 1.878-.768 2.143-1.51.265-.742.265-1.378.185-1.51-.08-.132-.29-.212-.607-.371z" />
      </svg>
    </a>
  );
}
