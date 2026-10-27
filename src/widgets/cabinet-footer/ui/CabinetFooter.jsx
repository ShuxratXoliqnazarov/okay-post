const CURRENT_YEAR = new Date().getFullYear()

// Светлая полоса с копирайтом внизу ЛК
export function CabinetFooter() {
  return (
    <footer className="mt-auto bg-surface py-9 text-center text-[13px] font-light text-dark">
      © {CURRENT_YEAR} Okeypost . Все права защищены.
    </footer>
  )
}
