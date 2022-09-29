import { useContext } from "react";
import { DeviceContext, TDeviceContext } from "../context-providers/DeviceContextProvider";


export const useDeviceContext = ():TDeviceContext =>{
	const devCntx = useContext(DeviceContext);
	return devCntx;
}