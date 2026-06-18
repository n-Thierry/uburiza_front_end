import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import { ChevronDown, ChevronUp, PlayCircle, Headphones, Flag, CheckCircle, Maximize, Volume2, Settings, MessageSquare, ChevronRight, X, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseMaterial({ view, setView }) {
  const [activeModule, setActiveModule] = useState(1); // 0-indexed, so 1 is Module 2
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [bookmarks, setBookmarks] = useState([]);
  const [videoTime, setVideoTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock video progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoTime(prev => (prev < 2520 ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#f59e0b']
    });
  };

  const addBookmark = () => {
    const mins = Math.floor(videoTime / 60);
    const secs = videoTime % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    setBookmarks([...bookmarks, { time: timeStr, note: 'New note at this timestamp...' }]);
    setActiveTab('My Notes');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const modules = [
    { title: 'Module 1: Foundations', items: [] },
    { 
      title: 'Module 2: Market Analysis', 
      items: [
        { title: 'Identifying Target Markets', active: true },
        { title: 'Competitor Benchmarking', active: false },
        { title: 'SWOT Analysis for Tech', active: false },
        { title: 'User Persona Creation', active: false }
      ]
    },
    { title: 'Module 3: Strategic Growth', items: [] }
  ];

  const transcript = [
    { time: 0, text: "Welcome to this lesson on identifying target markets." },
    { time: 5, text: "In the African tech ecosystem, markets are often fragmented." },
    { time: 10, text: "We cannot rely solely on traditional demographics." },
    { time: 15, text: "Instead, we must look at connectivity, device usage, and cultural nuances." }
  ];

  const activeTranscriptIdx = transcript.findIndex((t, i) => 
    videoTime >= t.time && (i === transcript.length - 1 || videoTime < transcript[i+1].time)
  );

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col font-sans h-screen overflow-hidden transition-colors duration-300">
      <TopNav view={view} setView={setView} />
      
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full flex-shrink-0 transition-colors duration-300 z-10">
          
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Course Progress</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">35%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[35%] rounded-full"></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {modules.map((mod, idx) => (
              <div key={idx} className="mb-2">
                <button 
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                >
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{mod.title}</span>
                  {activeModule === idx ? <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                </button>
                
                {activeModule === idx && mod.items.length > 0 && (
                  <div className="py-2">
                    {mod.items.map((item, iIdx) => (
                      <button 
                        key={iIdx}
                        className={`w-full flex items-center space-x-3 px-6 py-2.5 text-left text-sm ${item.active ? 'bg-emerald-800 dark:bg-emerald-900/50 text-white dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        {item.active ? (
                          <PlayCircle className="w-4 h-4 text-emerald-300 dark:text-emerald-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"></div>
                        )}
                        <span className={item.active ? 'font-medium' : ''}>{item.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors font-medium">
              <Headphones className="w-5 h-5" />
              <span>Enable Audio Mode</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto flex flex-col transition-colors duration-300">
          <div className="p-8 max-w-5xl mx-auto w-full">
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer" onClick={() => setView('CourseCatalog')}>Course Catalog</span>
              <ChevronRight className="w-4 h-4" />
              <span className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer" onClick={() => setView('CourseOverview')}>Digital Leadership</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white font-medium">Identifying Target Markets</span>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl mb-4 group">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Video frame" className="w-full h-full object-cover opacity-80" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-emerald-800/90 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-2xl"
                >
                  {isPlaying ? <span className="w-6 h-6 bg-white mr-1"></span> : <PlayCircle className="w-10 h-10 ml-1" />}
                </button>
              </div>

              {/* Video Controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full bg-white/30 h-1 rounded-full mb-4 cursor-pointer">
                  <div className={`bg-emerald-500 h-full rounded-full relative`} style={{ width: `${(videoTime / 2520) * 100}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <span className="w-4 h-4 bg-white block"></span> : <PlayCircle className="w-6 h-6" />}</button>
                    <button><Volume2 className="w-5 h-5" /></button>
                    <span className="text-sm font-medium">{formatTime(videoTime)} / 42:00</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={addBookmark} title="Take Note at this Timestamp"><Bookmark className="w-5 h-5 hover:text-emerald-400" /></button>
                    <button><Settings className="w-5 h-5" /></button>
                    <button><Maximize className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mb-6">
               <button onClick={addBookmark} className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 hover:text-emerald-700 dark:hover:text-emerald-300">
                  <Bookmark className="w-4 h-4" />
                  <span>Take Note at {formatTime(videoTime)}</span>
               </button>
            </div>

            {/* Lesson Info */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <div className="inline-block border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
                  Module 2: Market Analysis
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Identifying Target Markets in African Tech</h1>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                  <span>By <span className="font-bold text-emerald-800 dark:text-emerald-500 cursor-pointer">Dr. Kwame Osei</span></span>
                  <span>•</span>
                  <span>42 mins</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowDrawer(true)}
                  className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Discussion</span>
                </button>
                <button 
                  onClick={handleComplete}
                  className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8">
                {['Overview', 'Resources (4)', 'Transcript', 'My Notes'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium relative ${activeTab === tab ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-t-full"></motion.div>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content Area */}
            <div className="py-8">
              {activeTab === 'Overview' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About this lesson</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                    In this lesson, we dive deep into the unique characteristics of African tech markets. We'll explore how to segment audiences based on connectivity, device usage, and cultural nuances rather than just traditional demographics. 
                    <br/><br/>
                    You'll learn practical frameworks for identifying beachhead markets in fragmented ecosystems and understanding the true addressable market for your digital products.
                  </p>
                </motion.div>
              )}

              {activeTab === 'Transcript' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-3xl space-y-4 h-64 overflow-y-auto pr-4">
                  {transcript.map((line, idx) => (
                    <div key={idx} className={`flex space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${activeTranscriptIdx === idx ? 'bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => setVideoTime(line.time)}>
                      <span className={`text-sm font-mono flex-shrink-0 pt-0.5 ${activeTranscriptIdx === idx ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                        {formatTime(line.time)}
                      </span>
                      <p className={`text-sm leading-relaxed ${activeTranscriptIdx === idx ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                        {line.text}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'My Notes' && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-3xl">
                  {bookmarks.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                      <Bookmark className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">No notes yet. Click the bookmark icon on the video to take a note at a specific timestamp.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookmarks.map((bm, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 mb-2 cursor-pointer text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:underline">
                            <PlayCircle className="w-4 h-4" />
                            <span>{bm.time}</span>
                          </div>
                          <textarea 
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 text-sm text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                            defaultValue={bm.note}
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

          </div>
        </div>

        {/* Slide-out Discussion Drawer */}
        <AnimatePresence>
          {showDrawer && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-20 flex flex-col"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span>Class Discussion</span>
                </h3>
                <button onClick={() => setShowDrawer(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {[
                  { name: "Sarah M.", role: "Student", msg: "This framework makes so much sense for the Nairobi market!" },
                  { name: "Dr. Kwame Osei", role: "Instructor", msg: "Glad you found it helpful Sarah. Remember that Nairobi's mobile penetration rate creates unique opportunities." },
                  { name: "John D.", role: "Student", msg: "Could you clarify the difference between total addressable and serviceable available market in this context?" }
                ].map((msg, idx) => (
                  <div key={idx} className="flex space-x-3">
                    <img src={`https://i.pravatar.cc/150?img=${idx+10}`} alt="User" className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">{msg.name}</span>
                        {msg.role === 'Instructor' && <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Instructor</span>}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg rounded-tl-none">{msg.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <input 
                  type="text" 
                  placeholder="Ask a question or share a thought..." 
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
