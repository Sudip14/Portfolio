(function() {
  'use strict';

  var visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    localStorage.setItem('visitor_id', visitorId);
  }

  // Fetch IP and location data
  fetch('https://ipapi.co/json/')
    .then(function(res) {
      if (!res.ok) throw new Error('API error: ' + res.status);
      return res.json();
    })
    .then(function(data) {
      var log = {
        id: visitorId,
        ip: data.ip || 'unknown',
        city: data.city || 'unknown',
        country: data.country_name || 'unknown',
        countryCode: data.country_code || 'unknown',
        region: data.region || 'unknown',
        timezone: data.timezone || 'unknown',
        isp: data.org || 'unknown',
        page: window.location.pathname || '/',
        pageTitle: document.title || 'unknown',
        time: new Date().toLocaleString(),
        timestamp: Date.now(),
        browser: navigator.userAgent || 'unknown',
        language: navigator.language || 'unknown',
        platform: navigator.platform || 'unknown',
        screen: (window.screen.width || 0) + 'x' + (window.screen.height || 0),
        viewport: (window.innerWidth || 0) + 'x' + (window.innerHeight || 0),
        colorDepth: window.screen.colorDepth || 'unknown',
        referrer: document.referrer || 'Direct',
        protocol: window.location.protocol || 'unknown',
        hostname: window.location.hostname || 'unknown'
      };

      var visits = [];
      try {
        var stored = localStorage.getItem('visits');
        if (stored) {
          visits = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Tracker: Could not parse stored visits, resetting');
        visits = [];
      }

      visits.push(log);


      if (visits.length > 500) {
        visits = visits.slice(-500);
      }

      // Save back to localStorage
      localStorage.setItem('visits', JSON.stringify(visits));

      console.log('%c[TRACKER] Visitor logged:', 'color: #00f0ff', log);
    })
    .catch(function(err) {
      console.warn('Tracker error:', err.message);

      var fallbackLog = {
        id: visitorId,
        ip: 'blocked',
        city: 'unknown',
        country: 'unknown',
        page: window.location.pathname || '/',
        time: new Date().toLocaleString(),
        browser: navigator.userAgent || 'unknown',
        screen: (window.screen.width || 0) + 'x' + (window.screen.height || 0),
        referrer: document.referrer || 'Direct',
        error: err.message
      };

      var visits = [];
      try {
        var stored = localStorage.getItem('visits');
        if (stored) visits = JSON.parse(stored);
      } catch (e) {}

      visits.push(fallbackLog);
      if (visits.length > 500) visits = visits.slice(-500);
      localStorage.setItem('visits', JSON.stringify(visits));
    });
})();