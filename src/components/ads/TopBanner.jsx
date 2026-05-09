import React, { useEffect, useRef } from 'react';

const TopBanner = () => {
  const adRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!scriptLoaded.current && adRef.current) {
      const ins = document.createElement('ins');
      ins.className = 'p5e0143515c';
      ins.style.width = '728px';
      ins.style.height = '90px';
      ins.style.display = 'block';
      ins.setAttribute('data-width', '728');
      ins.setAttribute('data-height', '90');
      ins.setAttribute('data-domain', '//data527.click');
      ins.setAttribute('data-affquery', '/bf8d1785e8103a9813c3/5e0143515c/?placementName=default');

      const script = document.createElement('script');
      script.src = '//data527.click/js/responsive.js';
      script.async = true;

      adRef.current.appendChild(ins);
      adRef.current.appendChild(script);
      scriptLoaded.current = true;
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-4 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div ref={adRef} className="max-w-full overflow-auto">
        {/* Ad will be injected here */}
      </div>
    </div>
  );
};

export default TopBanner;
