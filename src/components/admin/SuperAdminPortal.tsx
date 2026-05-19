import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Users,
  Car,
  AlertTriangle,
  LogOut,
  MapPin,
  TrendingUp,
  Settings,
  Terminal,
  Cpu,
  BarChart2,
  FileText,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  Wifi,
  Battery,
  RefreshCw,
  Zap,
  Volume2,
  VolumeX,
  Play,
  PlayCircle,
  Clock,
  Unlock,
  Lock,
  DownloadCloud
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import BorderGlow from '../BorderGlow';

// Audio Synthesizer for Cyberpunk Ambiance and Emergency Warnings
class SciFiSynth {
  ctx: AudioContext | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playBootSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Low hum sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 1.2);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.6);

    // Beep highlight
    setTimeout(() => {
      const osc2 = this.ctx!.createOscillator();
      const gain2 = this.ctx!.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, this.ctx!.currentTime);
      gain2.gain.setValueAtTime(0.1, this.ctx!.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.3);
      osc2.connect(gain2);
      gain2.connect(this.ctx!.destination);
      osc2.start();
      osc2.stop(this.ctx!.currentTime + 0.4);
    }, 800);
  }

  playAlertSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Siren Sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(850, now + 0.3);
    osc.frequency.linearRampToValueAtTime(600, now + 0.6);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  playClickSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }
}

const synth = new SciFiSynth();

export default function SuperAdminPortal() {
  const { user, logout, loginAs } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [bootText, setBootText] = useState('CONNECTING SYSTEM UPLINK...');

  // Mock Database states for administration
  const [owners, setOwners] = useState([
    { id: 'O1', name: 'Alpha Logistics', fleetSize: 45, activeVehicles: 42, revenue: 1450000, score: 9.6, status: 'active', email: 'alpha@logistics.com' },
    { id: 'O2', name: 'Giga Mobility Corp', fleetSize: 32, activeVehicles: 28, revenue: 1080000, score: 8.9, status: 'active', email: 'giga@mobility.com' },
    { id: 'O3', name: 'Matrix Transit Systems', fleetSize: 24, activeVehicles: 20, revenue: 840000, score: 9.2, status: 'active', email: 'matrix@transit.com' },
    { id: 'O4', name: 'Cyber Delivery Node', fleetSize: 18, activeVehicles: 15, revenue: 520000, score: 7.8, status: 'suspended', email: 'cyber@delivery.com' },
    { id: 'O5', name: 'Hyperion Fleet Alliance', fleetSize: 52, activeVehicles: 49, revenue: 1980000, score: 9.8, status: 'active', email: 'hyperion@fleet.com' }
  ]);

  const [pilots, setPilots] = useState([
    { id: 'P1', name: 'Suresh Singh', trips: 145, hours: 240, safetyScore: 8.9, status: 'active', availability: 'on-duty', rating: 4.8 },
    { id: 'P2', name: 'Ramesh Sharma', trips: 120, hours: 198, safetyScore: 9.2, status: 'active', availability: 'off-duty', rating: 4.9 },
    { id: 'P3', name: 'Karan Malhotra', trips: 95, hours: 164, safetyScore: 7.4, status: 'active', availability: 'on-duty', rating: 4.2 },
    { id: 'P4', name: 'Vikram Aditya', trips: 210, hours: 380, safetyScore: 9.5, status: 'active', availability: 'on-duty', rating: 4.7 },
    { id: 'P5', name: 'Rahul Varma', trips: 40, hours: 75, safetyScore: 5.8, status: 'suspended', availability: 'off-duty', rating: 3.5 }
  ]);

  const [devices, setDevices] = useState([
    { id: 'DEV-8890', owner: 'Hyperion Fleet', battery: 92, network: 'Excellent', gps: 'Connected', syncTime: '2s ago', status: 'active', health: 98, firmware: 'v4.2.1-stable' },
    { id: 'DEV-4421', owner: 'Alpha Logistics', battery: 84, network: 'Good', gps: 'Connected', syncTime: '5s ago', status: 'active', health: 95, firmware: 'v4.2.1-stable' },
    { id: 'DEV-1092', owner: 'Giga Mobility', battery: 12, network: 'Poor', gps: 'Intermittent', syncTime: '12m ago', status: 'warning', health: 65, firmware: 'v4.1.9-outdated' },
    { id: 'DEV-7763', owner: 'Cyber Delivery', battery: 0, network: 'Offline', gps: 'Disconnected', syncTime: '1d ago', status: 'offline', health: 0, firmware: 'v3.8.2-legacy' }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 'ALT-1', type: 'SOS Alert', vehicle: 'MH-12-PQ-8890', description: 'Driver triggered SOS switch manually.', severity: 'CRITICAL', time: '1m ago' },
    { id: 'ALT-2', type: 'Battery Failure', vehicle: 'KA-03-MN-4421', description: 'GPS unit battery critically low (< 15%).', severity: 'WARNING', time: '5m ago' },
    { id: 'ALT-3', type: 'Unauthorized Access', vehicle: 'DL-01-AB-1092', description: 'OBD port disconnect event caught.', severity: 'CRITICAL', time: '15m ago' }
  ]);

  const [logs, setLogs] = useState([
    'SYSTEM INITIALIZING...',
    'CONNECTING INTEGRITY PROTOCOLS...',
    'SYNCING DEVICE GRID: 4,289 ACTIVE NODES FOUND.',
    'ESTABLISHING UPLINK TO DEEP CLOUD CORE.',
    'SECURITY LEVEL 4 ACCESS GRANTED.'
  ]);

  // Boot simulation
  useEffect(() => {
    const textSequence = [
      'DECRYPTING SECURITY PROTOCOLS...',
      'SCANNING OBD TELEMETRY GRID...',
      'VERIFYING CRYPTO AUTHENTICATION...',
      'SYSTEM NOMINAL - BOOT SUCCESS'
    ];
    let step = 0;
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBooted(true), 600);
          return 100;
        }
        if (prev > 0 && prev % 25 === 0 && step < textSequence.length) {
          setBootText(textSequence[step]);
          step++;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Live real-time simulator
  useEffect(() => {
    if (!isBooted) return;
    const interval = setInterval(() => {
      const randomHosts = ['DEV-8890', 'DEV-4421', 'DEV-1092', 'P1', 'P3', 'O2'];
      const actions = ['PING SUCCESSful (45ms)', 'GPS coordinate sync', 'OBD stream packet verified', 'telemetry heartbeat received'];
      const randomHost = randomHosts[Math.floor(Math.random() * randomHosts.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      setLogs((prev) => [
        `[${timestamp}] ${randomHost} -> ${randomAction}`,
        ...prev.slice(0, 4)
      ]);

      if (Math.random() > 0.85 && soundEnabled) {
        synth.playAlertSound();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isBooted, soundEnabled]);

  // Audio Toggle
  const toggleSound = () => {
    if (!soundEnabled) {
      synth.init();
      synth.playBootSound();
    }
    setSoundEnabled(!soundEnabled);
  };

  const playClick = () => {
    if (soundEnabled) synth.playClickSound();
  };

  const handleOwnerStatus = (id: string) => {
    playClick();
    setOwners(prev => prev.map(owner => 
      owner.id === id 
        ? { ...owner, status: owner.status === 'active' ? 'suspended' : 'active' }
        : owner
    ));
  };

  const handlePilotStatus = (id: string) => {
    playClick();
    setPilots(prev => prev.map(pilot => 
      pilot.id === id 
        ? { ...pilot, status: pilot.status === 'active' ? 'suspended' : 'active' }
        : pilot
    ));
  };

  const handleDeviceFirmware = (id: string) => {
    playClick();
    setDevices(prev => prev.map(dev => 
      dev.id === id 
        ? { ...dev, firmware: 'v4.2.1-stable', health: 100 }
        : dev
    ));
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [
      `[${timestamp}] FIRMWARE PATCH DEPLOYED TO ${id} SUCCESS`,
      ...prev
    ]);
  };

  const handleDismissAlert = (id: string) => {
    playClick();
    setAlerts(prev => prev.filter(alt => alt.id !== id));
  };

  const handleImpersonateUser = (targetUser: { id: string; name: string; email: string; role: 'owner' | 'driver' }) => {
    playClick();
    sessionStorage.setItem('admin_impersonating', 'true');
    loginAs(targetUser);
    if (targetUser.role === 'owner') {
      navigate('/owner');
    } else {
      navigate('/driver');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/super-admin-dashboard', icon: Activity },
    { name: 'Fleet Owners', href: '/super-admin-dashboard/owners', icon: Users },
    { name: 'Pilot Accounts', href: '/super-admin-dashboard/pilots', icon: Car },
    { name: 'Device Management', href: '/super-admin-dashboard/devices', icon: Cpu },
    { name: 'Live Tracking', href: '/super-admin-dashboard/tracking', icon: MapPin },
    { name: 'Analytics', href: '/super-admin-dashboard/analytics', icon: BarChart2 },
    { name: 'Emergency Alerts', href: '/super-admin-dashboard/alerts', icon: AlertTriangle },
    { name: 'System Logs', href: '/super-admin-dashboard/logs', icon: Terminal },
  ];

  if (!isBooted) {
    return (
      <div className="fixed inset-0 bg-[#120F17] flex flex-col items-center justify-center font-['Space_Grotesk',sans-serif] z-[9999] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)`,
               backgroundSize: '30px 30px' 
             }} />
        
        <div className="text-center relative max-w-lg w-full px-8">
          <div className="w-24 h-24 rounded-3xl bg-blue-600/10 border-2 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShieldAlert className="w-12 h-12 text-blue-400" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-white tracking-widest uppercase mb-2 font-['Syne']">SUKRUTHA MOBILITY</h2>
          <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-12">CONTROL CORE UPLINK</p>

          <div className="relative w-full h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-blue-500 shadow-[0_0_15px_#2563EB] transition-all duration-100 ease-out" 
              style={{ width: `${bootProgress}%` }}
            />
          </div>

          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.25em] h-8">
            {bootText}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Overview View
  const DashboardView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 10 Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Devices', value: '4,520', desc: 'Installed units', icon: Cpu, color: 'blue' },
          { label: 'Active Devices', value: '4,289', desc: 'Online now', icon: ShieldCheck, color: 'green' },
          { label: 'Offline Devices', value: '184', desc: 'Loss of sync', icon: XCircle, color: 'red' },
          { label: 'Maintenance', value: '47', desc: 'Repairs/Updates', icon: RefreshCw, color: 'orange' },
          { label: 'Fleet Owners', value: owners.length, desc: 'Registered corps', icon: Users, color: 'blue' },
          { label: 'Total Pilots', value: pilots.length, desc: 'Unit roster', icon: Car, color: 'purple' },
          { label: 'Active Trips', value: '342', desc: 'Realtime vectors', icon: MapPin, color: 'green' },
          { label: 'Emergency Alerts', value: alerts.length, desc: 'Unresolved SOS', icon: AlertTriangle, color: 'red' },
          { label: 'Daily Revenue', value: '₹5,82,400', desc: 'Cleared today', icon: TrendingUp, color: 'green' },
          { label: 'System Health', value: '98.4%', desc: 'Nominal condition', icon: Activity, color: 'blue' }
        ].map((stat, i) => (
          <BorderGlow
            key={i}
            borderRadius={28}
            glowColor={stat.color === 'red' ? '239 68 68' : stat.color === 'green' ? '34 197 94' : stat.color === 'orange' ? '245 158 11' : '59 130 246'}
            glowRadius={30}
            glowIntensity={0.8}
            backgroundColor="#120F17"
            className="p-6 border-white/5 hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group shadow-xl"
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</span>
              <div className={`p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-colors`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
              </div>
            </div>

            <div className="text-2xl font-black text-white tracking-tighter mb-1 font-['Syne']">{stat.value}</div>
            <p className="text-[9px] text-gray-500 uppercase tracking-wide font-bold">{stat.desc}</p>
          </BorderGlow>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top 5 Performing Clients Board */}
        <div className="lg:col-span-2 bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl relative shadow-xl">
          <div className="absolute top-0 left-0 w-32 h-[2px] bg-blue-500" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center font-['Syne']">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-2" /> Top Performing Clients
          </h3>

          <div className="space-y-4">
            {owners.slice(0, 5).sort((a,b) => b.revenue - a.revenue).map((client, index) => {
              const rankColor = index === 0 ? 'text-yellow-400 font-black' : index === 1 ? 'text-gray-300 font-bold' : index === 2 ? 'text-amber-600 font-bold' : 'text-gray-500';
              return (
                <div key={client.id} className="p-4 bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg ${rankColor} w-6 text-center font-['Syne']`}>0{index+1}</span>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">{client.name}</h4>
                      <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">Fleet: {client.fleetSize} Units</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8">
                    <div className="text-right">
                      <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest block">Yield</span>
                      <span className="text-xs font-bold text-green-400 font-['Space_Grotesk']">₹{client.revenue.toLocaleString()}</span>
                    </div>

                    <div>
                      <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest block text-center mb-1">Health</span>
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: `${client.score * 10}%` }} />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest block">Node Index</span>
                      <span className="text-xs font-black text-blue-400 font-['Space_Grotesk']">{client.score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Warning / SOS Monitor panel */}
        <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex flex-col shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center font-['Syne']">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" /> Live SOS Console
          </h3>

          <div className="flex-1 space-y-4">
            {alerts.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <CheckCircle className="w-12 h-12 text-green-500/30 mx-auto mb-4" />
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">No Alerts Detected</p>
                </div>
              </div>
            ) : (
              alerts.map(alt => (
                <div key={alt.id} className="p-4 bg-red-950/10 border border-red-500/20 hover:bg-red-950/20 transition-all rounded-2xl relative group">
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[7px] font-black uppercase tracking-widest rounded-full">{alt.severity}</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center flex-shrink-0 animate-pulse mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">{alt.type}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">{alt.vehicle}</p>
                      <p className="text-[9px] text-gray-500 font-bold mt-1 leading-relaxed">{alt.description}</p>
                      
                      <button 
                        onClick={() => handleDismissAlert(alt.id)}
                        className="mt-3 px-3 py-1 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all text-[8px] font-black uppercase tracking-widest text-red-400 rounded-lg"
                      >
                        Acknowledge & Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Fleet Owner Management
  const OwnersView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 font-['Syne']">Fleet Owners Database</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {owners.map(owner => (
            <BorderGlow
              key={owner.id}
              borderRadius={28}
              glowColor={owner.status === 'suspended' ? '239 68 68' : '59 130 246'}
              glowRadius={30}
              glowIntensity={0.6}
              backgroundColor="#120F17"
              className="p-6 border-white/5 shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">{owner.name}</h4>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">{owner.email}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  owner.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {owner.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-center">
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Fleet Roster</span>
                  <div className="text-lg font-black text-white mt-1">{owner.fleetSize} Nodes</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-center">
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Monthly Yield</span>
                  <div className="text-lg font-black text-green-400 mt-1 font-['Space_Grotesk']">₹{owner.revenue.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Index:</span>
                  <span className="text-xs font-black text-blue-400">{owner.score}/10</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleImpersonateUser({
                      id: owner.id,
                      name: owner.name,
                      email: owner.email || `${owner.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@demo.com`,
                      role: 'owner'
                    })}
                    className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 animate-pulse"
                  >
                    Login As
                  </button>
                  <button
                    onClick={() => handleOwnerStatus(owner.id)}
                    className={`px-4 py-2 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      owner.status === 'active' 
                        ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20' 
                        : 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {owner.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  );

  // Pilot Account Management
  const PilotsView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 font-['Syne']">Unit Pilots Directory</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilots.map(pilot => (
            <BorderGlow
              key={pilot.id}
              borderRadius={28}
              glowColor={pilot.status === 'suspended' ? '239 68 68' : '59 130 246'}
              glowRadius={30}
              glowIntensity={0.6}
              backgroundColor="#120F17"
              className="p-6 border-white/5 shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">{pilot.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{pilot.id}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">{pilot.availability}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  pilot.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {pilot.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-2 bg-white/5 border border-white/5 rounded-2xl text-center">
                  <span className="text-[7px] text-gray-500 uppercase tracking-widest font-black block">Trips</span>
                  <div className="text-xs font-black text-white mt-1">{pilot.trips}</div>
                </div>
                <div className="p-2 bg-white/5 border border-white/5 rounded-2xl text-center">
                  <span className="text-[7px] text-gray-500 uppercase tracking-widest font-black block">Hours</span>
                  <div className="text-xs font-black text-white mt-1">{pilot.hours}h</div>
                </div>
                <div className="p-2 bg-white/5 border border-white/5 rounded-2xl text-center">
                  <span className="text-[7px] text-gray-500 uppercase tracking-widest font-black block">Rating</span>
                  <div className="text-xs font-black text-yellow-400 mt-1">★ {pilot.rating}</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Safety Vector:</span>
                  <span className={`text-xs font-black ${pilot.safetyScore >= 8.5 ? 'text-green-400' : pilot.safetyScore >= 7.0 ? 'text-yellow-500' : 'text-red-500'}`}>{pilot.safetyScore}/10</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      let email = 'driver1@demo.com';
                      if (pilot.name === 'Ramesh Sharma') email = 'driver2@demo.com';
                      else if (pilot.name !== 'Suresh Singh') {
                        email = `${pilot.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@demo.com`;
                      }
                      handleImpersonateUser({
                        id: pilot.id,
                        name: pilot.name,
                        email: email,
                        role: 'driver'
                      });
                    }}
                    className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 animate-pulse"
                  >
                    Login As
                  </button>
                  <button
                    onClick={() => handlePilotStatus(pilot.id)}
                    className={`px-4 py-2 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      pilot.status === 'active' 
                        ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20' 
                        : 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {pilot.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  );

  // Device Management View
  const DevicesView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDevice, setSelectedDevice] = useState<any | null>(null);

    const filteredDevices = devices.filter(dev => 
      dev.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dev.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest font-['Syne']">Telemetry Node Network</h3>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-full md:w-80">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search Device / Owner..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-xs font-bold text-white placeholder-gray-500 w-full ml-2 uppercase tracking-widest"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[9px] text-gray-500 uppercase tracking-widest font-black pb-4">
                  <th className="py-4">Node ID</th>
                  <th className="py-4">Assigned Host</th>
                  <th className="py-4">Battery</th>
                  <th className="py-4">Signal</th>
                  <th className="py-4">GPS Sync</th>
                  <th className="py-4">Firmware</th>
                  <th className="py-4">Integrity Index</th>
                  <th className="py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredDevices.map(dev => (
                  <tr key={dev.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 font-black text-white uppercase tracking-wider font-['Space_Grotesk']">{dev.id}</td>
                    <td className="py-4 text-gray-400 font-bold uppercase">{dev.owner}</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Battery className={`w-4 h-4 ${dev.battery > 50 ? 'text-green-500' : dev.battery > 20 ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="font-bold">{dev.battery}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Wifi className="w-4 h-4 text-blue-500" />
                        <span className="font-bold uppercase tracking-widest text-[9px]">{dev.network}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        dev.gps === 'Connected' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {dev.gps}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-gray-500 text-[10px]">{dev.firmware}</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${dev.health > 80 ? 'bg-green-500' : dev.health > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${dev.health}%` }} />
                        </div>
                        <span className="font-black text-blue-400 font-['Space_Grotesk']">{dev.health}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { playClick(); setSelectedDevice(dev); }}
                          className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/30 text-blue-400 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all"
                        >
                          Ping Logs
                        </button>
                        {dev.firmware.includes('outdated') && (
                          <button
                            onClick={() => handleDeviceFirmware(dev.id)}
                            className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 text-orange-400 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center"
                          >
                            <DownloadCloud className="w-2.5 h-2.5 mr-1" /> Patch OTA
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Sync Log / Ping Detail Modal */}
        {selectedDevice && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg bg-[#120F17]/90 border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)] rounded-3xl overflow-hidden p-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest font-['Syne']">SYNC HISTORY: {selectedDevice.id}</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Host Entity: {selectedDevice.owner}</p>
                </div>
                <button
                  onClick={() => { playClick(); setSelectedDevice(null); }}
                  className="p-1 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-mono text-[10px] bg-black/40 border border-white/5 rounded-2xl p-4 max-h-60 overflow-y-auto custom-scrollbar text-blue-400">
                <div>[08:45:01] UPLINK ESTABLISHED... OK</div>
                <div>[08:45:02] INTEGRITY METRIC CHECK: {selectedDevice.health}%</div>
                <div>[08:45:03] GPS SEQUENCE SYNC... LAT: 18.9750, LNG: 72.8258</div>
                <div>[08:45:04] BATTERY VECTOR VERIFIED: {selectedDevice.battery}%</div>
                <div>[08:45:05] ACTIVE ROUTING STREAM ONLINE</div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => { playClick(); setSelectedDevice(null); }}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[9px] font-black uppercase tracking-widest rounded-2xl"
                >
                  Close Terminal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Real-time Live Monitoring Map simulation
  const TrackingView = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [vehicles, setVehicles] = useState([
      { id: 'TRIP-429', lat: 150, lng: 120, targetLat: 280, targetLng: 320, speed: 75, color: '#3B82F6', label: 'MH-12-PQ-8890' },
      { id: 'TRIP-108', lat: 300, lng: 80, targetLat: 100, targetLng: 400, speed: 62, color: '#22C55E', label: 'KA-03-MN-4421' },
      { id: 'TRIP-749', lat: 50, lng: 300, targetLat: 350, targetLng: 220, speed: 80, color: '#EF4444', label: 'DL-01-AB-1092' }
    ]);

    useEffect(() => {
      let animationFrameId: number;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const drawMap = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 180, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2);
        ctx.stroke();

        vehicles.forEach(veh => {
          const dx = veh.targetLat - veh.lat;
          const dy = veh.targetLng - veh.lng;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 2) {
            veh.lat += (dx / dist) * 0.4;
            veh.lng += (dy / dist) * 0.4;
          } else {
            const tempX = veh.targetLat;
            const tempY = veh.targetLng;
            veh.targetLat = Math.random() * (canvas.width - 100) + 50;
            veh.targetLng = Math.random() * (canvas.height - 100) + 50;
          }

          ctx.fillStyle = veh.color + '20';
          ctx.beginPath();
          ctx.arc(veh.lat, veh.lng, 12 + Math.sin(Date.now() / 150) * 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = veh.color;
          ctx.beginPath();
          ctx.arc(veh.lat, veh.lng, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8px Space Grotesk';
          ctx.fillText(veh.label, veh.lat + 10, veh.lng + 3);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = '7px Space Grotesk';
          ctx.fillText(`${veh.speed} km/h`, veh.lat + 10, veh.lng + 12);
        });

        animationFrameId = requestAnimationFrame(drawMap);
      };

      drawMap();
      return () => cancelAnimationFrame(animationFrameId);
    }, [vehicles]);

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Active Live Vector Map Screen */}
          <div className="lg:col-span-3 bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-6 flex items-center space-x-2 z-20">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">LIVE RADAR FEED</span>
            </div>

            <canvas 
              ref={canvasRef} 
              width={800} 
              height={500} 
              className="w-full bg-zinc-950 rounded-2xl border border-white/5 shadow-inner relative max-w-full"
            />
          </div>

          {/* Telemetry Status sidebar */}
          <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 font-['Syne']">UPLINK TELEMETRY</h3>
              
              <div className="space-y-6">
                {vehicles.map(veh => (
                  <div key={veh.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-black text-white uppercase tracking-wider">{veh.label}</span>
                      <span className="text-[8px] font-bold px-2 py-0.5 bg-white/5 text-blue-400 border border-blue-500/20 rounded-lg">{veh.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black block">Velocity</span>
                        <span className="text-xs font-bold text-white">{veh.speed} km/h</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black block">Vector</span>
                        <span className="text-xs font-bold text-white">NNE 24°</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">SYSTEM SCAN STATS</h4>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">
                  3 active missions tracked over grid sector 4-B. High throughput verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Premium Custom Neon SVG Analytics Section
  const AnalyticsView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Fleet Activity Area Graph */}
        <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 font-['Syne']">Missions Stream (Daily)</h3>
          
          <div className="h-64 flex items-end justify-between relative pt-6 px-4">
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-white/5" />
            <div className="absolute inset-x-0 top-2/4 h-[1px] bg-white/5" />
            <div className="absolute inset-x-0 top-3/4 h-[1px] bg-white/5" />

            <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 90 Q 20 50 40 70 T 80 30 T 100 10 L 100 100 L 0 100 Z" fill="url(#areaGrad)" />
              <path d="M 0 90 Q 20 50 40 70 T 80 30 T 100 10" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
            </svg>

            <div className="absolute bottom-1 inset-x-0 flex justify-between px-6 text-[8px] text-gray-500 font-bold font-['Space_Grotesk']">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* System Load Analytics Bar Chart */}
        <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 font-['Syne']">Active Node Revenue Cycles</h3>
          
          <div className="h-64 flex items-end justify-around relative pt-6 px-4">
            {[72, 85, 90, 64, 98, 80, 88].map((val, i) => (
              <div key={i} className="flex flex-col items-center w-full max-w-[28px] group">
                <div className="relative w-full h-44 bg-white/5 rounded-t-lg overflow-hidden flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:from-blue-500 group-hover:to-cyan-300 transition-all duration-500 rounded-t-lg" 
                    style={{ height: `${val}%` }}
                  />
                </div>
                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-3">Mon-{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Emergency SOS Console
  const AlertsView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest font-['Syne']">CRITICAL SOS MANAGEMENT</h3>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Real-time Emergency Events & Intercept Status</p>
          </div>
          
          <button 
            onClick={toggleSound}
            className={`px-4 py-2 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${
              soundEnabled 
                ? 'bg-blue-600/10 border-blue-500/20 text-blue-400' 
                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 mr-1.5" /> : <VolumeX className="w-4 h-4 mr-1.5" />}
            <span>{soundEnabled ? 'Synthesizer Active' : 'Muted'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map(alt => (
            <div 
              key={alt.id} 
              className="p-6 bg-red-950/15 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.05)] rounded-3xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_#EF4444]" />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[8px] text-red-500 font-black uppercase tracking-[0.2em]">{alt.severity}</span>
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-['Space_Grotesk']">{alt.time}</span>
                </div>

                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">{alt.type}</h4>
                <p className="text-xs font-bold text-red-400/80 mb-3">{alt.vehicle}</p>
                <p className="text-xs text-gray-400 leading-relaxed font-semibold">{alt.description}</p>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => handleDismissAlert(alt.id)}
                  className="px-5 py-2.5 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  Acknowledge Intercept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // System Logs & AI Monitoring Panel
  const LogsView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Terminal logs */}
        <div className="lg:col-span-2 bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center font-['Syne']">
              <Terminal className="w-4 h-4 text-blue-500 mr-2" /> Live System Logs
            </h3>
            <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black">STREAM ACTIVE</span>
          </div>

          <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-xs text-blue-400 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 select-none">&gt;</span>
                <span className="tracking-wide">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Gauge & AI assistant info */}
        <div className="bg-[#120F17]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 font-['Syne']">INTEGRITY ANALYSIS</h3>
            
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="60" 
                  stroke="#2563EB" 
                  strokeWidth="8" 
                  strokeDasharray="376" 
                  strokeDashoffset="37" 
                  strokeLinecap="round" 
                  fill="none" 
                  className="shadow-[0_0_15px_#2563EB]"
                />
              </svg>
              <div className="text-center z-10">
                <span className="text-3xl font-black text-white font-['Syne']">90%</span>
                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block mt-1">Grid Shield</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[8px]">Encryption</span>
                <span className="text-green-400 font-bold">AES-256</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[8px]">Auth Roster</span>
                <span className="text-blue-400 font-bold">Secure Access 4</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">
                Zero security leaks detected inside system parameters today. Grid is highly nominal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#120F17] text-gray-200 flex font-['Space_Grotesk',sans-serif] overflow-hidden selection:bg-blue-500/30 relative">
      
      {/* Laser HUD Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
      
      {/* Soft Background Depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Cybernetic Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-500 p-4 flex flex-col z-20 relative`}>
        <div className="h-full flex flex-col bg-[#120F17]/80 backdrop-blur-xl border border-white/5 shadow-2xl overflow-hidden rounded-2xl relative">
          
          <div className={`mb-8 flex ${sidebarOpen ? 'p-6' : 'p-4 justify-center'} items-center`}>
            {sidebarOpen ? (
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em]">Core Active</span>
                </div>
                <h1 className="text-xl font-black tracking-tighter leading-none text-white uppercase font-['Syne']">SUKRUTHA</h1>
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-1">Mobility Control Core</span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-blue-400" />
              </div>
            )}
          </div>

          <nav className={`flex-1 ${sidebarOpen ? 'px-4' : 'px-2'} space-y-2 overflow-y-auto custom-scrollbar`}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (location.pathname === '/super-admin-dashboard' && item.href === '/super-admin-dashboard');
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={playClick}
                  className={`group flex items-center ${sidebarOpen ? 'px-4 justify-start' : 'justify-center'} py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'bg-blue-600 border border-transparent text-white shadow-lg shadow-blue-900/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-white/10' : 'bg-transparent group-hover:bg-white/5 group-hover:scale-110'}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {sidebarOpen && (
                    <span className="ml-4 text-xs font-bold uppercase tracking-widest leading-none relative z-10 font-['Space_Grotesk']">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Dynamic Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10">
        
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#120F17]/50 backdrop-blur-md">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 leading-none mb-1.5 font-['Space_Grotesk']">Operations Control Center</h2>
              <span className="text-xl font-black text-white tracking-tighter uppercase font-['Syne']">Admin Core Interface</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col text-right">
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">SUPER ADMIN</span>
                <span className="text-xs font-black text-white uppercase tracking-tight">{user?.name}</span>
              </div>
              <button
                onClick={() => { playClick(); logout(); }}
                className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center transition-all group"
              >
                <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Router view Rendering */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          
          <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-1 font-['Syne']" style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}>
                {location.pathname === '/super-admin-dashboard' ? 'Command Center Dashboard' : 
                 location.pathname.includes('owners') ? 'Fleet Owner Accounts' : 
                 location.pathname.includes('pilots') ? 'Pilot Network Node Access' : 
                 location.pathname.includes('devices') ? 'Device Monitoring Panel' : 
                 location.pathname.includes('tracking') ? 'Real-time Live Monitoring radar' : 
                 location.pathname.includes('analytics') ? 'Real-time Analytics grid' : 
                 location.pathname.includes('alerts') ? 'Emergency Alert Console' : 'Core Command Terminal'}
              </h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest font-['Space_Grotesk']">SUKRUTHA MOBILITY CONTROL CORE</p>
            </div>
            <div className="text-right font-['Space_Grotesk']">
              <div className="text-xl font-black text-blue-400 flex items-center justify-end space-x-2">
                <Clock className="w-4 h-4 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
              </div>
              <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="max-w-[1600px] mx-auto font-['Space_Grotesk']">
            <Routes>
              <Route index element={<DashboardView />} />
              <Route path="/owners" element={<OwnersView />} />
              <Route path="/pilots" element={<PilotsView />} />
              <Route path="/devices" element={<DevicesView />} />
              <Route path="/tracking" element={<TrackingView />} />
              <Route path="/analytics" element={<AnalyticsView />} />
              <Route path="/alerts" element={<AlertsView />} />
              <Route path="/logs" element={<LogsView />} />
              <Route path="*" element={<Navigate to="/super-admin-dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
