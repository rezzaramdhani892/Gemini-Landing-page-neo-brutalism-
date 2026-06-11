import React, { useState } from 'react';
import { Send, Terminal, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ContactTerminal() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const appendLog = (log: string) => {
    setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validations
    if (!senderName.trim()) {
      setStatus('error');
      setErrorMessage('OPERATOR IDENTITY IS MISSING.');
      return;
    }
    if (!senderEmail.includes('@')) {
      setStatus('error');
      setErrorMessage('INVALID CORRESPONDENCE ADDRESS.');
      return;
    }
    if (!messageText.trim()) {
      setStatus('error');
      setErrorMessage('TRANSMISSION PAYLOAD IS EMPTY.');
      return;
    }

    setStatus('submitting');
    setTerminalLogs([]);
    
    appendLog("INITIALIZING SECURITY PROTOCOLS...");
    
    setTimeout(() => {
      appendLog("RESOLVING ROUTINGS FOR NEO-CONTACT PORTAL...");
    }, 400);

    setTimeout(() => {
      appendLog(`PACKING TRANSACTIONS FOR RECIPIENT: MAX DEVEREUX...`);
    }, 800);

    setTimeout(() => {
      appendLog("SERIALIZING FOR LOCAL LOCALSTORAGE RECORD...");
    }, 1200);

    setTimeout(() => {
      // Save local sent item
      const mailKey = 'neo-mail-v1';
      const existing = localStorage.getItem(mailKey);
      const mails = existing ? JSON.parse(existing) : [];
      mails.push({
        name: senderName,
        email: senderEmail,
        message: messageText,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(mailKey, JSON.stringify(mails));

      appendLog("TRANSMISSION COMPLETED! ENVELOPE SEALED.");
      setStatus('success');
    }, 1600);
  };

  const handleReset = () => {
    setSenderName('');
    setSenderEmail('');
    setMessageText('');
    setStatus('idle');
    setTerminalLogs([]);
  };

  return (
    <div className="w-full h-full bg-[#FAF6F0] brutalist-border p-6 brutalist-shadow bg-grid flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-5">
          <div>
            <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              TRANSMISSION PORT
            </h3>
            <p className="font-sans text-xs text-stone-600 uppercase mt-1">
              Establish peer-to-peer visual feedback channel with me.
            </p>
          </div>
        </div>

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-black uppercase mb-1">
                  CORRESPONDENT IDENTIFIER
                </label>
                <input
                  type="text"
                  placeholder="NAME OR ENTITY"
                  disabled={status === 'submitting'}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full brutalist-border bg-white px-3 py-2 font-mono text-xs focus:bg-neo-yellow outline-none uppercase disabled:opacity-55"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-black uppercase mb-1">
                  ELECTRONIC ADDR
                </label>
                <input
                  type="email"
                  placeholder="NAME@DOMAIN.COM"
                  disabled={status === 'submitting'}
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full brutalist-border bg-white px-3 py-2 font-mono text-xs focus:bg-neo-green outline-none disabled:opacity-55"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-black uppercase mb-1">
                MESSAGE COMPONENT PAYLOAD
              </label>
              <textarea
                placeholder="TYPE SECURE CONVERSE TRANSACTION DATA..."
                maxLength={400}
                rows={3}
                disabled={status === 'submitting'}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full brutalist-border bg-white p-3 font-mono text-xs focus:bg-neo-pink outline-none disabled:opacity-55 resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="bg-neo-pink text-white brutalist-border-sm p-2 flex items-center gap-2 font-mono text-xs font-black">
                <ShieldAlert className="w-4 h-4" />
                <span>ERROR: {errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-black text-white hover:bg-neo-orange hover:text-black py-2.5 font-display text-xs font-black tracking-widest uppercase brutalist-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  PROPELLING PAYLOAD...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  INITIATE PUSH PROTOCOL
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-neo-green text-black brutalist-border p-4 brutalist-shadow-sm flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-black text-xs uppercase">TRANSMISSION CONFIRMED!</h4>
                <p className="font-mono text-xs mt-1 text-stone-800 leading-normal">
                  Your envelope was packed and verified locally. I'll read it shortly in current LocalStorage stack.
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-black text-white px-4 py-2 font-mono text-xs brutalist-border-sm hover:bg-neo-orange hover:text-black cursor-pointer font-bold uppercase transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              COMPILE ANOTHER TRANSMISSION
            </button>
          </div>
        )}
      </div>

      {/* Terminal log panel for immersive feedback */}
      {(terminalLogs.length > 0 || status === 'submitting') && (
        <div className="mt-5 brutalist-border bg-stone-950 text-[#00FF66] p-3 font-mono text-[10px] space-y-1 overflow-y-auto max-h-[110px]">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="leading-tight">
              {log}
            </div>
          ))}
          {status === 'submitting' && (
            <div className="animate-pulse">⬤ RUNNING CORE MODULE...</div>
          )}
        </div>
      )}
    </div>
  );
}
