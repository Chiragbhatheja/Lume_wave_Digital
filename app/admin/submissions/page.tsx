'use client';

import { useEffect, useState } from 'react';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  requirement: string;
  submitted_at: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ba9e8]"></div>
          <p className="mt-4 text-[#003366] font-inter">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-poppins text-4xl font-bold text-[#001f3f] mb-2">
          Contact Submissions
        </h1>
        <p className="font-inter text-[#003366]">
          Manage all form submissions
        </p>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-[#e6f7ff] to-[#eef0ff] rounded-xl border border-[#1ba9e8]/20 p-4 mb-8">
        <p className="font-inter text-[#003366]">
          Total submissions: <span className="font-bold text-[#1ba9e8] text-lg">{submissions.length}</span>
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-[#e8f1f7]">
          <svg
            className="mx-auto h-16 w-16 text-[#d0d8e0] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-[#003366] font-inter text-lg">No submissions yet</p>
          <p className="text-[#00407a]/60 font-inter text-sm mt-2">Form submissions will appear here</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-5 border-l-4 border border-[#e8f1f7] ${
                    selectedSubmission?.id === submission.id
                      ? 'border-l-[#1ba9e8] bg-blue-50 border-[#1ba9e8]/20'
                      : 'border-l-transparent hover:border-l-[#1ba9e8]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins text-lg font-semibold text-[#001f3f] truncate">
                        {submission.name}
                      </h3>
                      <p className="text-sm text-[#00407a] font-inter mt-1">
                        {submission.service}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-[#003366] flex-wrap">
                        <a
                          href={`mailto:${submission.email}`}
                          className="font-inter hover:text-[#1ba9e8] transition-colors truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {submission.email}
                        </a>
                        <a
                          href={`tel:${submission.phone}`}
                          className="font-inter hover:text-[#1ba9e8] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {submission.phone}
                        </a>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-xs text-[#999999] font-inter whitespace-nowrap">
                        {formatDate(submission.submitted_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Submission Details */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8 border border-[#e8f1f7]">
                <h2 className="text-xl font-poppins font-bold text-[#001f3f] mb-4">
                  Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#00407a] font-semibold mb-1 font-inter">
                      Name
                    </p>
                    <p className="text-[#003366] font-inter">{selectedSubmission.name}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#00407a] font-semibold mb-1 font-inter">
                      Email
                    </p>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-[#1ba9e8] hover:text-[#0a66a9] font-inter break-all text-sm"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#00407a] font-semibold mb-1 font-inter">
                      Phone
                    </p>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-[#1ba9e8] hover:text-[#0a66a9] font-inter text-sm"
                    >
                      {selectedSubmission.phone}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#00407a] font-semibold mb-1 font-inter">
                      Service
                    </p>
                    <p className="text-[#003366] font-inter text-sm">{selectedSubmission.service}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#00407a] font-semibold mb-1 font-inter">
                      Submitted
                    </p>
                    <p className="text-[#003366] font-inter text-sm">
                      {formatDate(selectedSubmission.submitted_at)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e8f1f7]">
                    <p className="text-xs uppercase tracking-[0.1em] text-[#00407a] font-semibold mb-3 font-inter">
                      Requirement
                    </p>
                    <p className="text-[#003366] font-inter text-sm leading-relaxed whitespace-pre-wrap bg-[#f7f9fc] p-3 rounded-lg">
                      {selectedSubmission.requirement}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e8f1f7] flex gap-2">
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="flex-1 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white font-semibold py-2 rounded-lg text-center transition-colors text-sm font-inter"
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="flex-1 bg-[#00407a] hover:bg-[#001f3f] text-white font-semibold py-2 rounded-lg text-center transition-colors text-sm font-inter"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8 text-center border border-[#e8f1f7]">
                <svg
                  className="mx-auto h-12 w-12 text-[#d0d8e0] mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-[#003366] font-inter text-sm">
                  Select a submission to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
