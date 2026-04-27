import React from 'react'

const trainers = [
  {
    name: 'MR. PRAVEEN G',
    location: 'Bengaluru',
    role: 'Instructor',
    experience: '8 Years',
    description: 'With 8 Years of Experience, Mr. Praveen G is a patient trainer who is passionate about excellence and self-reliance. He strives to provide detailed and thorough 4-wheeler driving training programs for all of his clients. Mr. Praveen is skilled and knowledgeable in this field, and his clients have ranged in age. He takes pride in his high levels of customer satisfaction.'
  },
  {
    name: 'MR. SURESH K',
    location: 'Bengaluru',
    role: 'Instructor',
    experience: '12 Years',
    description: 'Mr. Suresh is a veteran instructor specializing in defensive driving and highway safety. His calm demeanor and expert guidance have helped hundreds of students gain confidence behind the wheel. He focuses on building strong fundamentals and advanced vehicle control skills.'
  },
  {
    name: 'MR. AJAY S',
    location: 'Bengaluru',
    role: 'Instructor',
    experience: '10 Years',
    description: 'Mr. Ajay is highly recommended for his teaching techniques and road confidence building. Students appreciate his patient approach and the practical tips he shares during sessions. He ensures that every student feels safe and competent on the road.'
  }
]

const testimonials = [
  {
    text: 'I had an amazing experience with Lucid Navigator Driving School. The course consists of theory, simulator and practical classes. Both theory and simulator classes helped me in understanding the basics of driving. My trainer was Mr. Praveen. He is very friendly and encouraging.',
    author: 'Gayathri M',
    location: 'Bengaluru'
  },
  {
    text: 'Highly recommend this driving school. Mr. Ajay is really great instructor and teaches you good techniques which helps to learn soon and from 3rd class I became very confident on roads. Mr. Praveen instructor was also good. Took 1 class with him.',
    author: 'Jai Anand Q',
    location: 'Bengaluru',
    featured: true
  },
  {
    text: 'I reached out for the driving class in Maruti Suzuki driving school and the response was timely and amazing!! Ajay sir was my trainer and he was patient and made learning easy, the tips and tricks he taught were really useful.',
    author: 'Kavya Sathish Kumar',
    location: 'Bengaluru'
  }
]

function Trainers() {
  return (
    <div className="py-24 container mx-auto px-8 min-h-screen">
      {/* Coaches Section */}
      <section className="mb-32">
        <h2 className="text-4xl md:text-5xl font-moho text-blue-900 dark:text-blue-100 mb-16 uppercase tracking-tighter italic">
          Meet Our Expert Coaches
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trainers.map((trainer) => (
            <div key={trainer.name} className="clay-card p-12 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-4">
              <div className="w-40 h-40 rounded-full bg-slate-100 dark:bg-slate-800 mb-8 flex items-center justify-center shadow-inner overflow-hidden border-[6px] border-white dark:border-slate-700">
                <span className="material-symbols-outlined !text-[80px] text-slate-300 dark:text-slate-600">person</span>
              </div>
              
              <h3 className="text-2xl font-bold text-blue-950 dark:text-white mb-1 uppercase tracking-tighter">
                {trainer.name}
              </h3>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 mb-6 font-medium">
                {trainer.location}
              </p>
              
              <div className="mb-8">
                <span className="text-[#5c6bc0] dark:text-blue-400 font-bold text-[15px] block mb-2">
                  {trainer.role}
                </span>
                <span className="text-[11px] bg-[#5c6bc0]/10 dark:bg-blue-500/20 text-[#5c6bc0] dark:text-blue-300 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest">
                  {trainer.experience} Experience
                </span>
              </div>
              
              <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                {trainer.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-4xl md:text-5xl font-moho text-blue-900 dark:text-blue-100 mb-16 uppercase tracking-tighter italic">
          Customer Feedback
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className={`clay-card p-10 flex flex-col transition-all duration-500 hover:scale-[1.02] ${
                item.featured ? 'border-2 border-[#5c6bc0]/30 dark:border-blue-500/30 scale-105 z-10 bg-white/40 dark:bg-slate-800/40 shadow-2xl' : ''
              }`}
            >
              <div className="mb-8 relative">
                <span className="material-symbols-outlined absolute -top-6 -left-6 !text-[48px] text-[#5c6bc0]/10 dark:text-blue-500/10 select-none">
                  format_quote
                </span>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 font-medium relative z-10">
                  {item.text}
                </p>
              </div>
              
              <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-700/50">
                <h4 className="text-base font-bold text-[#5c6bc0] dark:text-blue-400">
                  {item.author}
                </h4>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest mt-1">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Trainers
