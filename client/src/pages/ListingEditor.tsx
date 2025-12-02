import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

interface ListingEditorProps {
  onBack: () => void;
  onSave: () => void;
}

export const ListingEditor: React.FC<ListingEditorProps> = ({ onBack, onSave }) => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-6">
         <button onClick={onBack}><ChevronLeft/></button>
         <h1 className="text-2xl font-bold">Listing Editor</h1>
      </div>
      
      <div className="space-y-6 border p-8 rounded-xl shadow-sm bg-white">
         <div>
           <label className="block font-medium mb-2">Property Title</label>
           <Input placeholder="e.g. Cozy Cottage near Campus" />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Price per night (TRY)</label>
              <Input type="number" placeholder="2000" />
            </div>
             <div>
              <label className="block font-medium mb-2">Location</label>
              <Input placeholder="District, City" />
            </div>
         </div>
         <div>
           <label className="block font-medium mb-2">Description</label>
           <textarea className="w-full border border-gray-300 rounded-lg p-3 h-32 outline-none focus:border-amber-500" placeholder="Describe your place..."></textarea>
         </div>
         <div className="border-t pt-6 flex justify-end gap-4">
           <Button variant="ghost" onClick={onBack}>Cancel</Button>
           <Button onClick={onSave}>Save Listing</Button>
         </div>
      </div>
    </div>
  );
};