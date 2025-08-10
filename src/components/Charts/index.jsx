import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

const Charts = ({ category, active, i }) => {
    const origin = i === 0 ? 'origin-top-left' : i === 1 ? 'origin-top-right' : i === 2 ? 'origin-bottom-left' : i === 3 ? 'origin-bottom-right' : ''
    
    return (
        <div 
            className={`w-full h-full duration-300 transition-[opacity,transform] ${active ? '' : 'scale-50 opacity-0 pointer-events-none h-0'} ${origin}`}
        >
            <div className="mb-2">
                <div className="overflow-hidden text-white font-bold lowercase flex items-center gap-2">
                    <Link to="/charts" className="hover:text-white relative z-1 text-gray-300 flex items-center justify-center">
                        <MdArrowBack size={20} />
                    </Link>
                    <h2 className={`transition-transform duration-500 ${active ? 'translate-y-0 delay-200 ' : 'translate-y-[100%]'} text-xl`}>{category.name}s</h2>
                </div>
            </div>
            {
                active && 
                <div className="p-4 flex-1 flex flex-col items-center justify-center gap-4 min-h-[60vh]">
                    <h3 className="text-gray-400 font-bold text-xl">Charts for {category.name}s are not available with the current API.</h3>
                </div>
            }
        </div>
    )
}

export default Charts;