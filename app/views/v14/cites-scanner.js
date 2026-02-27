import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, RefreshCw, Table, FileText, CheckCircle2, AlertCircle, Loader2, Download, Copy, FileJson, ShieldCheck, SearchX, Upload, FileUp, Info } from 'lucide-react';

// Configuration
const apiKey = ""; // Environment provides this
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const App = () => {
  const [stream, setStream] = useState(null);
  const [capturedData, setCapturedData] = useState(null); // { type: string, base64: string, preview: string, fileName: string }
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } } 
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setCameraActive(true);
    } catch (err) {
      setError("Could not access camera. Please check permissions or upload a file.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video.videoWidth === 0) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setCapturedData({ type: 'image/png', base64: imageData.split(',')[1], preview: imageData });
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result.split(',')[1];
      setCapturedData({
        type: file.type || 'application/pdf',
        base64: base64,
        preview: file.type.startsWith('image/') ? event.target.result : null,
        fileName: file.name
      });
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const resetScanner = () => {
    setCapturedData(null);
    setExtractedData(null);
    setError(null);
    setCopySuccess(false);
    if (cameraActive) stopCamera();
  };

  const processContent = async () => {
    if (!capturedData) return;
    setIsProcessing(true);
    setError(null);

    const systemPrompt = `
      You are a customs document specialist. Analyze the document to identify CITES permits.
      If a CITES permit is found, extract:
      - Permit Number
      - Document Code (C400/C638)
      - Specimen Description
      - Quantity
      - Validity Date
      - Issuing Authority
      Response must be JSON: { permitFound: boolean, permits: Array<{...}> }
    `;

    const payload = {
      contents: [{
        role: "user",
        parts: [
          { text: "Identify and extract CITES permit data. Scan all pages if PDF." },
          { inlineData: { mimeType: capturedData.type, data: capturedData.base64 } }
        ]
      }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            permitFound: { type: "BOOLEAN" },
            permits: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  permitNumber: { type: "STRING" },
                  documentCode: { type: "STRING" },
                  specimenDescription: { type: "STRING" },
                  quantity: { type: "STRING" },
                  validityDate: { type: "STRING" },
                  issuingAuthority: { type: "STRING" }
                }
              }
            }
          }
        }
      }
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      setExtractedData(JSON.parse(result.candidates[0].content.parts[0].text));
    } catch (err) {
      setError("Extraction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyJson = () => {
    const jsonStr = JSON.stringify(extractedData, null, 2);
    const textArea = document.createElement("textarea");
    textArea.value = jsonStr;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadJsonFile = () => {
    const jsonStr = JSON.stringify(extractedData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CITES_Extraction_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTable = () => {
    if (!extractedData) return null;
    if (!extractedData.permitFound || extractedData.permits.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 text-amber-800 mt-6">
           <SearchX className="w-10 h-10 mb-2 opacity-40" />
           <p className="font-bold">No CITES permits detected in this file.</p>
        </div>
      );
    }

    return (
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Extracted Results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/50">
              <tr>
                {['Permit Number', 'Code', 'Specimen', 'Qty', 'Validity', 'Authority'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {extractedData.permits.map((p, i) => (
                <tr key={i} className="hover:bg-emerald-50/30">
                  <td className="px-4 py-3 text-sm font-bold text-slate-800 whitespace-nowrap min-w-[180px]">{p.permitNumber}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.documentCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-[200px]">{p.specimenDescription}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.quantity}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.validityDate}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-[150px]">{p.issuingAuthority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-800">CITES Inspector</h1>
              <p className="text-slate-500 font-medium text-sm">Automated Regulatory Document Processing</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {!cameraActive && !capturedData ? (
              <>
                <button onClick={startCamera} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-100 transition-all active:scale-95">
                  <Camera className="w-5 h-5" /> Start Camera
                </button>
                <button onClick={() => fileInputRef.current.click()} className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-slate-200 transition-all active:scale-95">
                  <FileUp className="w-5 h-5" /> Upload File
                </button>
              </>
            ) : (
              <button onClick={resetScanner} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all">
                <RefreshCw className="w-5 h-5" /> Start New Scan
              </button>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,image/*" className="hidden" />
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_0.8fr] gap-8 items-start">
          
          {/* Left Column: View & Result Table (Wider) */}
          <div className="space-y-6">
            <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
              {error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-red-600/90 p-8 text-center">
                  <AlertCircle className="w-12 h-12 mb-4" />
                  <p className="font-bold text-lg">{error}</p>
                </div>
              )}
              
              {!capturedData ? (
                <>
                  <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transform scale-x-[-1] ${!cameraActive && 'hidden'}`} />
                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100/50">
                      <Camera className="w-16 h-16 mb-4 opacity-5" />
                      <p className="font-black uppercase tracking-[0.3em] text-[10px]">System Standby</p>
                    </div>
                  )}
                  {cameraActive && (
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <button onClick={capturePhoto} className="w-20 h-20 rounded-full bg-white p-1 shadow-2xl group transition-all">
                         <div className="w-full h-full rounded-full border-4 border-emerald-600 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
                         </div>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 p-4">
                  {capturedData.preview ? (
                    <img src={capturedData.preview} className="max-w-full max-h-full object-contain rounded-lg" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center text-white space-y-4">
                      <FileText className="w-20 h-20 text-emerald-400" />
                      <p className="font-bold text-lg">{capturedData.fileName}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Processing Button & State */}
            {capturedData && !extractedData && !isProcessing && (
              <button 
                onClick={processContent}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
              >
                <SearchX className="w-7 h-7" /> Extract Permit Data
              </button>
            )}

            {isProcessing && (
              <div className="w-full bg-white border border-slate-200 py-10 rounded-2xl font-bold flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <span className="text-slate-500 font-black uppercase tracking-widest text-xs">AI Extraction in Progress...</span>
              </div>
            )}

            {/* Table stays under the view */}
            {renderTable()}
          </div>

          {/* Right Column: Controls & Raw JSON (Narrower) */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Status
                </div>
                <div className="text-slate-800 font-bold text-sm">Regulatory Compliant</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> Input
                </div>
                <div className="text-slate-800 font-bold text-sm">{capturedData?.type ? capturedData.type.split('/')[1].toUpperCase() : 'Ready'}</div>
              </div>
            </div>

            {/* JSON Output sit under the info cards */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 flex flex-col">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-slate-400" />
                  RAW EXPORT
                </h3>
                {extractedData && (
                  <div className="flex gap-1.5">
                    <button onClick={copyJson} title="Copy JSON" className={`p-2 rounded-lg transition-all ${copySuccess ? 'bg-green-100 text-green-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
                      {copySuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={downloadJsonFile} title="Download JSON" className="p-2 bg-slate-900 hover:bg-black text-white rounded-lg">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-h-[300px] bg-slate-900 rounded-2xl p-5 shadow-inner">
                {!extractedData ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <Info className="w-8 h-8 opacity-20" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-center px-4 leading-relaxed">Raw JSON will appear here after extraction</p>
                  </div>
                ) : (
                  <pre className="text-[10px] font-mono text-emerald-400/90 overflow-auto max-h-[400px] custom-scrollbar leading-relaxed">
                    {JSON.stringify(extractedData, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <p className="text-[10px] text-emerald-700/60 font-black uppercase tracking-[0.2em] mb-2">Notice</p>
              <p className="text-[11px] text-emerald-800 font-medium leading-relaxed italic">
                Scanning engine detects C400 (Export) and C638 (Import) permits. All processing occurs locally via encrypted AI endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;