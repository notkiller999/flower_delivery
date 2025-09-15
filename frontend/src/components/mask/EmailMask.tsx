import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const typingMask = /^[A-Za-z0-9@._%+\-]*$/; // дозволяє вводити потрібні символи (включно з @ та .)

const EmailMask = React.forwardRef<HTMLInputElement, CustomProps>(

    function TextMaskCusto(props, ref) {
        const {onChange, ...other} = props;
        return(
            <IMaskInput
                {...other}
                mask={typingMask}
                unmask={true} 
                inputRef={ref}
                onAccept={
                    (value: any) => {
                        onChange({ target: { name: props.name, value } })
                    }        
                }
                overwrite
                placeholder="your-email@example.com"
                type="text"
            />
        )
    }
)

export default EmailMask;
