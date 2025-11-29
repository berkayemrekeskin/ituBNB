import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

interface AuthModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose}><X size={20} /></button>
          <span className="font-bold text-lg">{isLogin ? 'Log in' : 'Sign up'}</span>
          <div className="w-5"></div> 
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Welcome to ituBeeNBee</h3>
          <div className="space-y-4">
             <Input label="Email" placeholder="Enter your email" />
             <Input label="Password" type="password" placeholder="Enter your password" />
             {!isLogin && <Input label="Confirm Password" type="password" placeholder="Confirm password" />}
             
             {isLogin && (
               <div className="text-right">
                 <a href="#" className="text-xs font-semibold text-gray-600 underline">Forgot your password?</a>
               </div>
             )}

             <Button variant="primary" className="w-full py-3 text-lg" onClick={onLogin}>
               {isLogin ? 'Login' : 'Sign Up'}
             </Button>

             <div className="text-center mt-4 text-sm">
               {isLogin ? "Don't have an account? " : "Already have an account? "}
               <span 
                 className="text-amber-600 font-semibold cursor-pointer hover:underline"
                 onClick={() => setIsLogin(!isLogin)}
               >
                 {isLogin ? 'Sign up' : 'Log in'}
               </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};