import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'Basic Navigator',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-5 clay-card p-10 relative z-10">
            <h2 className="text-2xl font-moho text-blue-900 dark:text-blue-100 mb-1 uppercase italic">
              Get in Touch
            </h2>
            <p className="text-[13px] text-on-surface-variant dark:text-slate-400 mb-8">
              Ready to start? Send us a signal.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-primary dark:text-blue-400">
                  Full Name
                </label>
                <input
                  className="w-full bg-surface-container-low dark:bg-slate-900 p-3.5 placeholder:text-outline-variant dark:text-slate-200 text-sm neu-input"
                  placeholder="Aravind Kumar"
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-primary dark:text-blue-400">
                  WhatsApp Number
                </label>
                <input
                  className="w-full bg-surface-container-low dark:bg-slate-900 p-3.5 placeholder:text-outline-variant dark:text-slate-200 text-sm neu-input"
                  placeholder="+91 98765 43210"
                  type="tel"
                  name="phone"
                  id="contact-phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-primary dark:text-blue-400">
                  Select Course
                </label>
                <select
                  className="w-full bg-surface-container-low dark:bg-slate-900 p-3.5 text-on-surface-variant dark:text-slate-400 text-sm neu-input"
                  name="course"
                  id="contact-course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option>Basic Navigator</option>
                  <option>Urban Mastery</option>
                  <option>License Fast-Track</option>
                </select>
              </div>
              <button
                className="w-full text-white py-3.5 rounded-full font-bold text-[11px] tracking-widest uppercase clay-btn skeu-btn-primary mt-2"
                type="submit"
                id="contact-submit"
              >
                Send Signal
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-10 pt-7 border-t border-primary/5 dark:border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-on-surface-variant dark:text-slate-400 text-[13px]">
                <span className="material-symbols-outlined !text-[18px] text-primary dark:text-blue-400">
                  call
                </span>
                <span className="font-medium">+91 80 4123 5678</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant dark:text-slate-400 text-[13px]">
                <span className="material-symbols-outlined !text-[18px] text-primary dark:text-blue-400">
                  mail
                </span>
                <span className="font-medium">hello@lucidnavigator.in</span>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-7 h-[500px] lg:h-auto rounded-[2rem] overflow-hidden shadow-2xl relative border-4 border-white/50 dark:border-slate-800/50">
            <iframe
              src="https://maps.google.com/maps?q=Indiranagar,Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale opacity-90 dark:invert dark:opacity-80 transition-all duration-500 hover:grayscale-0 dark:hover:invert-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lucid Navigator Indiranagar Hub"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
