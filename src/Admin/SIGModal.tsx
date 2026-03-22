import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

interface SIGModalProps {
  sig?: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function SIGModal({ sig, isOpen, onClose, onSave }: SIGModalProps) {
  const [title, setTitle] = useState(sig?.title || '');
  const [details, setDetails] = useState(sig?.details || '');
  const [imageUrl, setImageUrl] = useState(sig?.imageUrl || '');
  const [order, setOrder] = useState(sig?.order || 0);

  const handleSubmit = async () => {
    const sigData = {
      title,
      details,
      imageUrl,
      order: parseInt(order.toString())
    };

    try {
      if (sig?.id) {
        // Update existing
        await updateDoc(doc(db, 'sigs', sig.id), sigData);
      } else {
        // Create new
        await addDoc(collection(db, 'sigs'), sigData);
      }
      onSave(sigData);
      onClose();
    } catch (error) {
      console.error('Error saving SIG:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {sig ? 'Edit SIG' : 'Add SIG'}
        </h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <textarea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />

          <input
            type="url"
            placeholder="Image URL (16:9 ratio recommended)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <input
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
}