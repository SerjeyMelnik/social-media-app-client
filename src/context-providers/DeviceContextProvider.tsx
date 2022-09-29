import { createContext, FC ,ReactNode} from "react";
import { getDeviceType } from "../utils/getDeviceType";

export type TDeviceType = 'mobile' | 'tablet' | 'desktop';

export type TDeviceContext = {
	deviceType : TDeviceType,

}

const defaultDeviceType:TDeviceContext = {
	deviceType: getDeviceType()
}

export const DeviceContext = createContext(defaultDeviceType); 

type TDeviceTypeContextProviderProps = {
	children: ReactNode
}
export const DeviceContextProvider:FC<TDeviceTypeContextProviderProps> = ({children}) => {
	return(
		<DeviceContext.Provider value={defaultDeviceType}>
			{children}
		</DeviceContext.Provider>
	)
}