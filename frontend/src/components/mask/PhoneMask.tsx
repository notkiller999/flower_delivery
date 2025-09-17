import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const PhoneMask = forwardRef<HTMLInputElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="+(#00) 00-000-00-00"
				definitions={{
					"#": /[1-9]/,
				}}
				inputRef={ref}
				onAccept={(value: any) =>
					onChange({ target: { name: props.name, value } })
				}
				overwrite
                placeholder="+(123) 45-678-90-00"
			/>
		);
	}
);

export default PhoneMask;