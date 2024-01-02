import { CLSMetric, FCPMetric, FIDMetric, LCPMetric, TTFBMetric } from "web-vitals";

const reportWebVitals = (reportCallback?: (...any: any) => void) => {
	if (reportCallback) {
		import("web-vitals").then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
			onCLS((metric: CLSMetric) => reportCallback("CLS", metric));
			onFID((metric: FIDMetric) => reportCallback("FID", metric));
			onFCP((metric: FCPMetric) => reportCallback("FCP", metric));
			onLCP((metric: LCPMetric) => reportCallback("LCP", metric));
			onTTFB((metric: TTFBMetric) => reportCallback("TTFB", metric));
		});
	}
};

export default reportWebVitals;
