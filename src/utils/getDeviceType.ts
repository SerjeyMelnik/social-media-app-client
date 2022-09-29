import { TDeviceType } from "../context-providers/DeviceContextProvider";


export function getDeviceType():TDeviceType {
	let deviceType: TDeviceType = 'desktop';
	if (window.innerWidth < 760) {
		deviceType = 'mobile' ;
	}
	else if (window.innerWidth <= 760 && window.innerWidth <= 1300) {
		deviceType = 'tablet' ;
	}
	else if (window.innerWidth > 1300) {
		deviceType = 'desktop' ;
	}
	
	return deviceType;
}