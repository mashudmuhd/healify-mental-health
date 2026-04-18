import React, { useState, useEffect, useRef } from 'react';
import { MonitorPlay, Camera, MessageCircle, Video, BookOpen, User, ExternalLink, Menu, X, Bell, ChevronRight, Sparkles, ShieldCheck, Zap, Play, ArrowUpRight } from 'lucide-react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ReactPlayer from 'react-player/youtube';
import heroImage from './assets/images/fathimasshiril.jpeg';
import logoImage from './assets/logo.jpeg';

const App = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Navbar scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Official Healify Logo
    const HealifyLogo = ({ className = "w-10 h-10", circle = true }) => (
        <div className={`relative flex items-center justify-center ${className} ${circle ? 'rounded-full overflow-hidden border-2 border-teal-400/30' : 'rounded-lg overflow-hidden'}`}>
            <img src={logoImage} alt="Healify Logo" className="w-full h-full object-cover" />
        </div>
    );

    const youtubeVideos = [
        {
            id: 'PtoBX7zhhl4',
            title: 'Healthy Parenting ?',
            category: 'Psychology Tips',
            thumbnail: 'https://img.youtube.com/vi/PtoBX7zhhl4/maxresdefault.jpg',
        },
        {
            id: 'kjDZhcx3tcI',
            title: 'War Hits Minds Too',
            category: 'Psychology Insights',
            thumbnail: 'https://img.youtube.com/vi/kjDZhcx3tcI/maxresdefault.jpg',
        },
        {
            id: 'Q_YTiE0So3o',
            title: 'Overthinking',
            category: 'Therapy Session',
            thumbnail: 'https://img.youtube.com/vi/Q_YTiE0So3o/maxresdefault.jpg',
        },

    ];

    const VideoCard = ({ video, idx }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [showButton, setShowButton] = useState(false);
        const timerRef = useRef(null);
        const autoStopRef = useRef(null);

        // Stop video on meaningful scroll (ignore micro-jitters on mobile)
        useEffect(() => {
            let startY = window.scrollY;
            const handleScroll = () => {
                if (isHovered && Math.abs(window.scrollY - startY) > 50) {
                    setIsHovered(false);
                }
            };
            if (isHovered) {
                startY = window.scrollY;
                window.addEventListener('scroll', handleScroll, { passive: true });
            }
            return () => window.removeEventListener('scroll', handleScroll);
        }, [isHovered]);

        useEffect(() => {
            if (isHovered) {
                timerRef.current = setTimeout(() => setShowButton(true), 6000);
            } else {
                setShowButton(false);
                if (timerRef.current) clearTimeout(timerRef.current);
            }
            return () => {
                if (timerRef.current) clearTimeout(timerRef.current);
            };
        }, [isHovered]);

        const handleWatchMore = (e) => {
            e.stopPropagation();
            window.open(`https://www.youtube.com/shorts/${video.id}`, '_blank');
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(true)}
            >
                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} transitionSpeed={2000} scale={1.05} glareEnable={true} glareMaxOpacity={0.4} glarePosition="bottom" className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden mb-5 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-100 border-2 border-transparent group-hover:border-teal-400">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : ''} group-hover:scale-105`}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-teal-600 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                <Play size={28} fill="currentColor" />
                            </motion.div>
                        </div>
                    </div>

                    <div className="w-full h-full relative z-10">
                        {isHovered && !showButton && (
                            <div className="absolute inset-0 bg-black scale-105 pointer-events-none">
                                <ReactPlayer
                                    url={`https://www.youtube.com/shorts/${video.id}`}
                                    playing={true}
                                    muted={false}
                                    width="100%"
                                    height="100%"
                                    style={{ pointerEvents: 'none' }}
                                    config={{ youtube: { playerVars: { controls: 0, modestbranding: 1, rel: 0 } } }}
                                />
                            </div>
                        )}
                        <AnimatePresence>
                            {showButton && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
                                >
                                    <button
                                        onClick={handleWatchMore}
                                        className="bg-white text-gray-900 px-6 py-4 rounded-2xl font-black text-sm flex items-center space-x-2 shadow-2xl hover:bg-teal-500 hover:text-white transition-all transform hover:scale-105"
                                    >
                                        <span>WATCH ON YOUTUBE</span>
                                        <ArrowUpRight size={18} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="absolute top-6 left-6 z-20 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                        {video.category}
                    </div>
                </Tilt>
                <div className="px-2 mt-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors leading-tight">{video.title}</h3>
                    <p className="text-gray-400 text-sm font-medium mt-1">Shorts • Fathima Shiril</p>
                </div>
            </motion.div>
        );
    };

    const LaunchPopup = () => {
        return (
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                    >
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl border border-teal-50"
                        >
                            <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-gray-400 hover:text-teal-600 bg-teal-50 p-2 rounded-full transition-colors"><X size={20} /></button>
                            <div className="text-center space-y-6">
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                                    <HealifyLogo className="w-24 h-24 mx-auto" />
                                </motion.div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Coming Soon!</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">Our online consultation platform will be launching very soon. In the meantime, please feel free to explore our digital library.</p>
                                <button onClick={() => setShowPopup(false)} className="w-full bg-gray-900 text-white py-5 rounded-3xl font-black hover:bg-teal-600 transition-all shadow-xl active:scale-95">Got it, Thanks!</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    const Navigation = () => (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl py-3 shadow-sm' : 'bg-transparent py-6'}`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
                    <HealifyLogo className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-300" />
                    <div className="block">
                        <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-none tracking-tight">Healify</h1>
                        <p className="text-[8px] md:text-[10px] text-teal-600 font-bold uppercase tracking-[0.2em]">Mental Health</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-10 font-bold uppercase text-[11px] tracking-widest">
                    {['home', 'about', 'videos'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`transition-all relative py-2 ${activeTab === tab ? 'text-teal-600' : 'text-gray-400 hover:text-gray-900'}`}>
                            {tab === 'home' ? 'Home' : tab === 'about' ? 'About' : 'YouTube Library'}
                            {activeTab === tab && (
                                <motion.span
                                    layoutId="navIndicator"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPopup(true)}
                        className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors shadow-lg"
                    >
                        Book Now
                    </motion.button>
                </div>
                <button className="md:hidden w-11 h-11 flex items-center justify-center bg-teal-50 text-teal-600 rounded-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={24} /></button>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-teal-50 p-8 flex flex-col space-y-6 shadow-2xl overflow-hidden"
                    >
                        {['home', 'about', 'videos'].map((tab) => (
                            <button key={tab} onClick={() => { setActiveTab(tab); setIsMenuOpen(false); }} className="text-left text-2xl font-black text-gray-900 uppercase">
                                {tab === 'home' ? 'Home' : tab === 'about' ? 'About' : 'YouTube'}
                            </button>
                        ))}
                        <button onClick={() => { setShowPopup(true); setIsMenuOpen(false); }} className="bg-teal-600 text-white p-5 rounded-3xl font-black text-xl shadow-xl">Book Session</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-teal-100">
            <Navigation />
            <LaunchPopup />

            <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <header className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden bg-white">
                            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-50/50 blur-[100px] md:blur-[150px] rounded-full -mr-32 md:-mr-64 -mt-16 md:-mt-32 -z-10"></div>
                            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-10"
                                >
                                    <motion.div variants={fadeUpVariant} className="inline-flex items-center space-x-3 bg-teal-50 border border-teal-100 px-6 py-2 rounded-full">
                                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                                        <span className="text-xs font-black text-teal-700 uppercase tracking-widest">Consultant Psychologist</span>
                                    </motion.div>
                                    <motion.h2 variants={fadeUpVariant} className="text-5xl sm:text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">Transform <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Your Mind.</span></motion.h2>
                                    <motion.p variants={fadeUpVariant} className="text-xl text-gray-500 leading-relaxed max-w-xl font-medium">Led by <span className="text-gray-900 font-bold border-b-2 border-teal-200">Fathima Shiril</span>, Healify bridges the gap between clinical science and emotional peace.</motion.p>
                                    <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-5 pt-4">
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('videos')} className="bg-gray-900 text-white px-10 py-5 rounded-3xl font-black flex items-center justify-center space-x-3 hover:bg-teal-600 transition-colors shadow-2xl">
                                            <FaYoutube size={24} />
                                            <span>WATCH SHORTS</span>
                                        </motion.button>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowPopup(true)} className="px-10 py-5 rounded-3xl font-black border-2 border-gray-100 hover:border-teal-400 text-gray-700 hover:text-teal-600 transition-colors">BOOK CONSULTATION</motion.button>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                                    className="relative"
                                >
                                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all" className="relative z-10 bg-white p-3 md:p-4 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-gray-50 overflow-hidden transform-gpu">
                                        <img src={heroImage} alt="Fathima Shiril" className="w-full h-[400px] md:h-[650px] object-cover rounded-[2.5rem] md:rounded-[3.5rem]" />
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                            className="absolute -left-2 md:-left-8 top-1/4 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-white/50"
                                        >
                                            <div className="flex items-center space-x-3 md:space-x-4">
                                                <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                                    <ShieldCheck size={20} className="md:w-7 md:h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Trusted Expert</p>
                                                    <p className="font-black text-gray-900 text-sm md:text-lg">Fathima Shiril Ec</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Tilt>
                                </motion.div>
                            </div>
                        </header>

                        <section className="py-32 px-6 bg-slate-50">
                            <div className="max-w-7xl mx-auto space-y-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center space-y-6 max-w-3xl mx-auto"
                                >
                                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">Expert Insights</h2>
                                    <p className="text-lg text-gray-500 font-medium leading-relaxed">Hover over a short to play a preview. Fathima explains complex mental health concepts in simple, bite-sized videos.</p>
                                </motion.div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                                    {youtubeVideos.map((video, idx) => <VideoCard key={video.id} video={video} idx={idx} />)}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => setActiveTab('videos')}
                                        className="inline-flex items-center space-x-3 text-teal-600 font-black hover:text-teal-700 transition-colors group py-4 px-8 bg-white rounded-2xl shadow-sm hover:shadow-xl"
                                    >
                                        <span>EXPLORE ALL RESOURCES</span>
                                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </section>
                    </motion.div>
                )}

                {activeTab === 'videos' && (
                    <motion.section
                        key="videos"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="py-48 px-6 bg-slate-50 min-h-screen"
                    >
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-6xl font-black text-gray-900 mb-20 text-center tracking-tight">Digital Library</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                                {youtubeVideos.map((video, idx) => <VideoCard key={video.id} video={video} idx={idx} />)}
                            </div>
                        </div>
                    </motion.section>
                )}

                {activeTab === 'about' && (
                    <motion.section
                        key="about"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="py-48 px-6 bg-white min-h-screen"
                    >
                        <div className="max-w-4xl mx-auto text-center space-y-16">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            >
                                <HealifyLogo className="w-32 h-32 mx-auto" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-8"
                            >
                                <h2 className="text-6xl font-black text-gray-900 tracking-tight">Our Mission</h2>
                                <p className="text-2xl text-gray-500 leading-relaxed font-medium italic">"My mission is to make mental wellness accessible to everyone. Through Healify, I am making that a reality. True peace of mind ultimately lies within our own hands."</p>
                                <p className="text-xl font-black text-teal-600 uppercase tracking-widest">— Fathima Shiril</p>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-24 bg-gray-950 text-white px-6"
            >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
                    <div className="space-y-6 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-3">
                            <HealifyLogo className="w-12 h-12" circle={false} />
                            <span className="text-3xl font-black tracking-tighter">Healify</span>
                        </div>
                        <p className="text-gray-500 font-medium max-w-sm">Professional psychological consulting and mental wellness education.</p>
                    </div>
                    <div className="flex space-x-10 text-gray-400">
                        <motion.a whileHover={{ scale: 1.2, color: "#2DD4BF" }} href="https://www.youtube.com/channel/UCIHnhCDS5jAJaVkRByVHoTg" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={32} className="transition-colors cursor-pointer" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, color: "#2DD4BF" }} href="https://www.instagram.com/healify_mentalhealth?igsh=MXg1cHhkbHg2MjR2Mw==" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={32} className="transition-colors cursor-pointer" />
                        </motion.a>
                    </div>
                    <div className="text-center lg:text-right space-y-2">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">© {new Date().getFullYear()} Healify Mental Health</p>
                        <p className="text-gray-600 font-medium text-xs">All Rights Reserved. Fathima Shiril.</p>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
};

export default App;