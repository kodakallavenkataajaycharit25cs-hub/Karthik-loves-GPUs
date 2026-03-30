import React, { useEffect, useRef } from 'react';
import { 
  Car, 
  Shield, 
  TrendingUp, 
  Wrench, 
  Brain, 
  ArrowRight,
  Star,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onLoginClick: () => void;
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardAccess = () => {
    if (user?.role === 'owner') {
      navigate('/owner');
    } else if (user?.role === 'driver') {
      navigate('/driver');
    } else {
      onLoginClick();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-['Space_Grotesk']">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute top-[60%] right-[5%] w-[40%] h-[40%] bg-purple-600/5 blur-[150px] rounded-full" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      </div>

      {/* Modern Navigation */}
      <nav className="glass-navbar border-b border-white/5 py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 cursor-pointer group">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black text-xl group-hover:rotate-12 transition-transform duration-500">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none">SUKRUTHA</span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500 mt-1">Intelligence</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-12">
              {['Booking', 'Features', 'Network', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors tracking-[0.2em]">
                  {item}
                </a>
              ))}
              <button
                onClick={user ? handleDashboardAccess : onLoginClick}
                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
              >
                {user ? 'View Dashboard' : 'Member Login'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Structural Hero: Asymmetric 2-Column */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-12">
             <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               <span className="text-[10px] uppercase font-black tracking-[0.3em] text-blue-400">Live Telematics V4.0 Now Online</span>
             </div>
          </div>
          
          <div className="lg:col-span-7">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 italic">
              ENGINEERING<br />
              <span className="text-blue-500 underline decoration-white/20">TOTAL</span> CONTROL.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light mb-12">
              The Indian fleet landscape is brutal. We give you the <span className="text-white font-bold italic">OBD-powered neural edge</span> to master it. Diagnostics, AI safety, and extreme efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/booking" className="group bg-white text-black px-10 py-6 rounded-2xl text-lg font-black flex items-center justify-between min-w-[280px] hover:bg-blue-500 hover:text-white transition-all duration-500 overflow-hidden relative">
                <span className="relative z-10">START BOOKING</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>
              <button onClick={handleDashboardAccess} className="px-10 py-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-lg font-black transition-all flex items-center justify-between min-w-[280px]">
                <span>OPERATOR DEMO</span>
                <ArrowUpRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square relative flex items-center justify-center">
              {/* Abstract Visual Asset */}
              <div className="absolute inset-0 bg-blue-600/10 rounded-[4rem] rotate-6 scale-95 border border-blue-500/20" />
              <div className="absolute inset-0 bg-purple-600/10 rounded-[4rem] -rotate-3 scale-95 border border-purple-500/20" />
              <div className="relative z-10 w-full h-full glass-card rounded-[3rem] overflow-hidden group">
                 <img 
                   src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg" 
                   alt="Fleet" 
                   className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                 />
                 <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Real-time OBD Data</span>
                     <Activity className="w-4 h-4 text-blue-400" />
                   </div>
                   <div className="text-3xl font-black tracking-tighter">84,203 km</div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Fleet Avg Mileage / Year</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Ticker */}
      <section className="py-20 border-y border-white/5 overflow-hidden">
        <div className="flex space-x-24 animate-marquee whitespace-nowrap">
           {[
             { n: '50+', l: 'Strategic Partners' },
             { n: '₹2.5Cr', l: 'Fuel Cost Savings' },
             { n: '99.9%', l: 'System Uptime' },
             { n: '24/7', l: 'Elite Support' },
             { n: '15ms', l: 'Data Latency' },
             { n: '1.2M', l: 'Trips Tracked' }
           ].map((s, i) => (
             <div key={i} className="flex items-center space-x-6">
                <span className="text-6xl font-black text-white italic tracking-tighter">{s.n}</span>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 max-w-[100px] leading-tight">{s.l}</span>
                <div className="w-px h-12 bg-white/10 ml-12" />
             </div>
           ))}
        </div>
      </section>

      {/* Structural Layout: Grid Shift Features */}
      <section id="features" className="py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* Main Showcase 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
            <div className="order-2 lg:order-1">
              <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                LIVE ENGINE<br />TELEMATICS.
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
                We tap directly into the OBD-II port to stream millisecond engine diagnostics, fuel flow, and sensor health. No guesswork, just raw truth.
              </p>
              <ul className="space-y-4">
                {['Fuel Efficiency Monitoring', 'Engine Fault Alerts', 'Driver Behavior Analysis'].map(f => (
                  <li key={f} className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-white/60">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="glass-card aspect-video rounded-[3rem] overflow-hidden p-1 bg-gradient-to-br from-blue-500/20 to-transparent">
                <div className="w-full h-full bg-black rounded-[2.8rem] flex items-center justify-center overflow-hidden">
                   <div className="grid grid-cols-8 grid-rows-8 w-full h-full opacity-20 gap-px">
                     {[...Array(64)].map((_,i) => <div key={i} className="bg-white/10" />)}
                   </div>
                   <Activity className="absolute w-32 h-32 text-blue-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid: Asymmetric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 glass-card rounded-[3rem] p-12 hover:border-blue-500/40 transition-all group">
              <Brain className="w-12 h-12 text-purple-500 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-black mb-6 tracking-tighter">AI NEURAL ANALYTICS</h3>
              <p className="text-lg text-gray-400 font-light max-w-xl">
                Our machine learning layer processes billions of data points to optimize routes, predict demand, and forecast vehicle maintenance before it's needed.
              </p>
            </div>
            
            <div className="glass-card rounded-[3rem] p-12 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all border-emerald-500/20 group">
              <Shield className="w-12 h-12 text-emerald-500 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase">Safety First SOS</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Autonomous crash detection and instant SOS alerts for drivers. Total protection for your human assets.
              </p>
            </div>

            <div className="glass-card rounded-[3rem] p-12 hover:border-orange-500/40 transition-all group">
              <Wrench className="w-12 h-12 text-orange-500 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase">Predictive Care</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Integrated service scheduling based on actual vehicle wear, not just distance.
              </p>
            </div>

            <div className="md:col-span-2 glass-card rounded-[3rem] p-12 bg-blue-600/5 hover:bg-blue-600/10 transition-all border-blue-500/20 group">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">Algorithmic Profitability</h3>
              <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
                Detailed trip costing simulations that account for fuel price volatility, driver incentives, and dynamic operational costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Testimonials: Large Format */}
      <section className="py-40 bg-zinc-950/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
           <h2 className="text-[10px] uppercase font-black tracking-[0.5em] text-blue-500 mb-20">The Fleet Standard</h2>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-left">
             {[
               { n: 'Arjun Patel', r: 'CEO, Golden Travels', t: 'Sukrutha isn\'t software; it\'s our edge. 35% cost reduction and zero safety incidents since implementation.' },
               { n: 'Priya Sharma', r: 'Operations Strategist', t: 'The OBD granularity identified ₹15 lakh in annual fuel wastage. ROI was achieved in just 3 months.' },
               { n: 'Vikram Singh', r: 'Fleet Director', t: 'Predictive maintenance reduced our downtime by 60%. Customer satisfaction is at an all-time high.' }
             ].map((tm, i) => (
               <div key={i} className="flex flex-col">
                  <div className="flex space-x-1 mb-8 text-blue-500">
                    {[...Array(5)].map((_,k) => <Star key={k} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-2xl font-light italic text-gray-300 leading-relaxed mb-12 flex-grow">"{tm.t}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl italic">{tm.n[0]}</div>
                    <div className="flex flex-col">
                      <span className="font-black text-white uppercase tracking-tighter">{tm.n}</span>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{tm.r}</span>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* High-Impact CTA */}
      <section className="py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative glass-card rounded-[4rem] p-16 md:p-32 overflow-hidden text-center border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 italic leading-[0.85]">
              READY FOR THE<br />LONG HAUL?
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button 
                onClick={handleDashboardAccess}
                className="bg-white text-black px-12 py-8 rounded-3xl text-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-white/5"
              >
                JOIN THE NETWORK
              </button>
              <Link to="/booking" className="px-12 py-8 rounded-3xl bg-white/10 border border-white/10 hover:bg-white/20 text-2xl font-black transition-all">
                 DEMO RIDE
              </Link>
            </div>
            <p className="mt-12 text-gray-500 text-xs font-black uppercase tracking-[0.4em]">Integrated with AIS-140 standard devices</p>
          </div>
        </div>
      </section>

      {/* Architectural Footer */}
      <footer id="contact" className="py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-12">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
               <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black">S</div>
                    <span className="text-2xl font-black tracking-tighter">SUKRUTHA</span>
                  </div>
                  <p className="text-gray-500 max-w-sm font-light text-lg">
                    Engineering intelligence for the Indian logistics ecosystem. Hardware-first, AI-driven.
                  </p>
               </div>
               <div className="flex flex-col items-end">
                  <div className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-700 mb-4">Urgent Inquiries</div>
                  <a href="tel:+916363390074" className="text-4xl md:text-6xl font-black tracking-tighter hover:text-blue-500 transition-colors">+91 63633 90074</a>
               </div>
             </div>
          </div>
          
          <div className="md:col-span-12 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="flex gap-16">
               {['Legal', 'Privacy', 'Network Status', 'API Docs'].map(item => (
                 <a key={item} href="#" className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-white transition-colors">{item}</a>
               ))}
             </div>
             <p className="text-[10px] uppercase font-bold tracking-widest text-gray-700">© 2025 Sukrutha Mobility. Excellence is Mandatory.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}