import {useFormContext} from 'react-hook-form';
import React from 'react';
import classNames from 'classnames';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const FormInput = ({ ...props }: InputProps) => {
  const { register, formState: { errors } } = useFormContext();
  const inputClassName = classNames('border border-gray-900 rounded-md px-3 py-1 h-12', {
      'border-red-500': errors[props.name]?.message,
      'border-gray-600': !errors[props.name]?.message
  })
  return (
      <div>
        <input
            className={inputClassName}
            {...register(props.name)}
            {...props}
        />
        <div className={'text-red-500 text-sm mt-1'}>
          {errors[props.name]?.message?.toString()}
        </div>
      </div>
  );
};

export default FormInput;
