import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

const NumericFormatCustom = React.forwardRef(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue === undefined || floatValue >= 0;
                }}
                thousandSeparator="."
                decimalSeparator=","
                valueIsNumericString
            />
        );
    },
);

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default function NewSource() {
    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '1320',
    });

    const handleChange = (event) => {
        event.target.value = event.target.value.replace("-", "")
        setValues({
            ...values,
            [event.target.name]: event.target.value.replace("-", ""),
        });
    };

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                fullWidth
                label="Học phí"
                variant="outlined"
                name="numberformat"
                value={values.numberformat}
                onChange={handleChange}
                InputProps={{
                    inputComponent: NumericFormatCustom,
                }}
            />
        </Stack>
    );
}
