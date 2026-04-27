const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Driving Laws", href: "https://ramanagarapolice.karnataka.gov.in/125/traffic-rules-and-regulations/en" },
  { label: "Safety Protocol", href: "https://transportinfo.in/simba/gos/Licence/driving_school_guidelines.pdf" },
]

function Footer() {
  return (
    <footer className="w-full border-t border-white/20 dark:border-slate-800/30 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-5 gap-4">
        <div className="text-base font-moho text-blue-900 dark:text-white">
          Lucid Navigator
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="font-sans text-[11px] tracking-widest uppercase text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300 hover:underline transition-all"
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="font-sans text-[11px] tracking-widest uppercase text-slate-500 dark:text-slate-400">
          © 2024 Lucid Navigator Driving Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
