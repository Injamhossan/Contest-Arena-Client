import React, { useState } from 'react';
import { X, Link as LinkIcon, FileText, Send } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const SubmissionModal = ({ isOpen, onClose, submission, onSuccess }) => {
  const [link, setLink] = useState(submission?.submissionLink || '');
  const [description, setDescription] = useState(submission?.submissionText || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link) {
        toast.error('Please provide a submission link');
        return;
    }

    try {
      setLoading(true);
      const response = await api.patch(`/participations/${submission._id}`, {
        submissionLink: link,
        submissionText: description
      });

      if (response.data.success) {
        toast.success('Task submitted successfully!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      toast.error(error.response?.data?.message || 'Failed to submit task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Submit Your Task</h2>
             <p className="text-sm text-gray-500 mt-1">
                {submission?.contestId?.name || 'Contest Submission'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Project Functionality Link / Live Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4a37d8]/20 focus:border-[#4a37d8] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your submission..."
              rows={4}
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4a37d8]/20 focus:border-[#4a37d8] transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#4a37d8] hover:bg-[#3b2db0] text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionModal;
