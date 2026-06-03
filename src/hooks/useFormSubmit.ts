import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (data: Record<string, string> | FormData) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const isFormData = data instanceof FormData;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body:    isFormData ? data : JSON.stringify(data),
      });
      let json: Record<string, string> = {};
      try { json = await res.json(); } catch { /* risposta non-JSON */ }
      if (!res.ok) throw new Error(json.error || 'Errore durante l\'invio. Riprova più tardi.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Errore durante l\'invio. Riprova più tardi.');
      setStatus('error');
    }
  };

  return { status, errorMsg, submit };
}
