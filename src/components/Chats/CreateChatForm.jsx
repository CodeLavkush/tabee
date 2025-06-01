import React, { useEffect, useState } from 'react';
import { Input, Button } from '../index';
import { useForm } from 'react-hook-form';
import { createOrGetChatOneOnOne } from '../../api/chatApi';
import { addChat } from '../../store/ChatSlice';
import { useDispatch } from 'react-redux';

function CreateChatForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
        id: '',
    },
  });

  const submit = async (formData) => {
    try {
      const data = await createOrGetChatOneOnOne(formData.id).then((res) => res.data);
      if (data) {
        dispatch(addChat(data));
        
      }
    } catch (error) {
      console.error(error);
    } finally{
      reset()
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full bg-accent rounded-xl p-4 flex justify-center items-center flex-col gap-2">
        <h2>Create new chat</h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full h-full flex justify-center items-center gap-2 flex-col"
        >
          <Input
            placeholder="Enter user id.."
            {...register('id', { required: true })}
            aria-invalid={errors.id ? 'true' : 'false'}
          />
          {errors.id?.type === 'required' && (
            <p className="text-warning-foreground bg-warning" role="alert">
              id is required
            </p>
          )}
          <Button bgColor="bg-primary" type="submit" className="w-full h-10">
            Create Chat
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateChatForm;
