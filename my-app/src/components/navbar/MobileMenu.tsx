"use client";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <ul className="flex flex-col items-center gap-8 font-display text-4xl uppercase">
        <li onClick={onClose}>About</li>
        <li onClick={onClose}>Project</li>
        <li onClick={onClose}>Contact</li>
      </ul>
    </div>
  );
}