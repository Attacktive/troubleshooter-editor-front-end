const reportWebVitals = (reportCallback?: (any: any) => void) => {
	if (reportCallback) {
		import("web-vitals").then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
			onCLS(reportCallback);
			onFID(reportCallback);
			onFCP(reportCallback);
			onLCP(reportCallback);
			onTTFB(reportCallback);
		});
	}
};

export default reportWebVitals;
