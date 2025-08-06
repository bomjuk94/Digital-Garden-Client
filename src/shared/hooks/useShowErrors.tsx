import { useEffect } from "react";
import { showToast } from "../utils.ts/showToast";

export const useShowErrors = (errors: string[]) => {
    useEffect(() => {
        if (errors.length > 0) {
            showToast(
                'error',
                <div>
                    {
                        errors.map((error, index) => (
                            <div key={index} >
                                {index + 1}. {error}
                            </div>
                        ))
                    }
                </div>
            );
        }
    }, [errors])
}