import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Create() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/add', { task: data.task })
            .then(result => {
              location.reload();
                reset();
            })
            .catch(error => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="create-task">
            <div>
                <input
                    type="text"
                    placeholder="Enter Task"
                    {...register('task', {
                        required: 'This field is required',
                        minLength: { value: 3, message: 'Must be at least 3 characters long' }
                    })}
                    className="create-task__input"
                />

                {/* Error message for input validation */}
                {errors.task && <p className="error-message">{errors.task.message}</p>}
            </div>
            <button type="submit" className="create-task__button">
                Add
            </button>
        </form>
    );
}

export default Create;
