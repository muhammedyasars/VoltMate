// A lightweight, privacy-respecting analytics module

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private initialized: boolean = false;
  private apiKey: string = '';
  private apiEndpoint: string = '';
  
  // Initialize analytics with configuration
  public init(apiKey: string, endpoint: string) {
    if (this.initialized) return;
    
    this.apiKey = apiKey;
    this.apiEndpoint = endpoint;
    this.initialized = true;
    
    // Track page view on initialization
    this.pageView();
    
    // Setup navigation tracking for SPAs
    if (typeof window !== 'undefined') {
      // Listen for route changes in Next.js
      const handleRouteChange = (url: string) => {
        this.pageView(url);
      };
      
      // This would need to be adapted based on how you handle routing
      document.addEventListener('nextRouteChangeComplete', (e: any) => {
        handleRouteChange(e.detail.url);
      });
    }
  }
  
  // Track page views
  public pageView(url?: string) {
    if (!this.initialized) return;
    
    const pageUrl = url || (typeof window !== 'undefined' ? window.location.pathname : '');
    
    this.trackEvent({
      name: 'page_view',
      properties: {
        page_url: pageUrl,
        page_title: document.title,
        referrer: document.referrer || ''
      }
    });
  }
  
  // Track custom events
  public trackEvent(event: AnalyticsEvent) {
    if (!this.initialized) return;
    
    // Don't send analytics in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Analytics]', event);
      return;
    }
    
    // Prepare the payload
    const payload = {
      api_key: this.apiKey,
      event_name: event.name,
      event_properties: event.properties || {},
      user_properties: this.getUserProperties(),
      timestamp: new Date().toISOString(),
      device: this.getDeviceInfo()
    };
    
    // Send the data
    try {
      fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        // Send as non-critical background request
        keepalive: true
      });
    } catch (error) {
      // Fail silently in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Analytics Error]', error);
      }
    }
  }
  
  // Get basic user properties
  private getUserProperties() {
    if (typeof window === 'undefined') return {};
    
    // We could add user ID here if authenticated
    return {
      language: navigator.language,
      is_returning: !!localStorage.getItem('_ev_returning')
    };
  }
  
  // Get basic device information
  private getDeviceInfo() {
    if (typeof window === 'undefined') return {};
    
    return {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      user_agent: navigator.userAgent,
      is_mobile: /Mobi|Android/i.test(navigator.userAgent)
    };
  }
  
  // Mark user as returning visitor
  private markReturningVisitor() {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('_ev_returning', 'true');
  }
}


export const analytics = new Analytics();