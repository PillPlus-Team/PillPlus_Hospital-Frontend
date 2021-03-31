import { useState, useEffect } from 'react';

const InputText = ({
    name,
    type,
    initValue = '',
    placeholder,
    autoComplete,
    required,
    minLength = 0,
    maxLength = 100,
    pattern,
    msgPatternError,
    dupList,
    msgDupError,
    onValidChange,
    onValueChange,
}) => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessege] = useState('');

    useEffect(() => {
        if (required && value.length === 0) {
            setErrorMessege('โปรดกรอก');
            setIsValid(false);
        } else {
            if (minLength <= value.length && value.length <= maxLength) {
                let regExpression = new RegExp(pattern);

                if (!regExpression.test(value) && value.length !== 0) {
                    setErrorMessege(msgPatternError);
                    setIsValid(false);
                } else {
                    if (dupList != null) {
                        if (dupList.includes(value)) {
                            setErrorMessege(msgDupError);
                            setIsValid(false);
                        } else {
                            setErrorMessege('');
                            setIsValid(true);
                        }
                    } else {
                        setErrorMessege('');
                        setIsValid(true);
                    }
                }
            } else {
                setErrorMessege('ต้องการ ' + minLength + '-' + maxLength + ' ตัวอักษร');
                setIsValid(false);
            }
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <p className="mb-1 text-red-400 italic ">{errorMessage}</p>
            <input
                className={`w-full p-2 pl-4 rounded-lg border-2 focus:outline-none ${
                    isValid ? 'border-gray-200  focus:border-blue-500 ' : 'border-red-300 focus:border-red-500'
                }`}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                onChange={(event) => {
                    setValue(event.target.value);
                    onValueChange(event.target.value);

                    if (required && event.target.value.length === 0) {
                        setErrorMessege('โปรดกรอก');
                        setIsValid(false);
                        onValidChange(false);
                    } else {
                        if (minLength <= event.target.value.length && event.target.value.length <= maxLength) {
                            let regExpression = new RegExp(pattern);

                            if (!regExpression.test(event.target.value) && event.target.value.length !== 0) {
                                setErrorMessege(msgPatternError);
                                setIsValid(false);
                                onValidChange(false);
                            } else {
                                if (dupList != null) {
                                    if (dupList.includes(event.target.value)) {
                                        setErrorMessege(msgDupError);
                                        setIsValid(false);
                                        onValidChange(false);
                                    } else {
                                        setErrorMessege('');
                                        setIsValid(true);
                                        onValidChange(true);
                                    }
                                } else {
                                    setErrorMessege('');
                                    setIsValid(true);
                                    onValidChange(true);
                                }
                            }
                        } else {
                            setErrorMessege('ต้องการ ' + minLength + '-' + maxLength + ' ตัวอักษร');
                            setIsValid(false);
                            onValidChange(false);
                        }
                    }
                }}
            />
        </div>
    );
};

export default InputText;
