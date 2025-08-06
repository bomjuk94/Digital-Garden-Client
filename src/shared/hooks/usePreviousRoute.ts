import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export const usePreviousRoute = () => {
    const location = useLocation()
    const previousLocationRef = useRef(location)

    useEffect(() => {
        previousLocationRef.current = location
    }, [location])

    return previousLocationRef.current
}